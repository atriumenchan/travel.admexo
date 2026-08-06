import { KeyPool, RateLimitError } from "@/lib/keyPool";
import type { FlightProvider, NormalizedFlight, ProviderSearchParams } from "./types";

const BASE_URL = "https://serpapi.com/search.json";

// Accepts one or many comma-separated keys, e.g. SERPAPI_KEY=key1,key2,key3
const keyPool = new KeyPool(process.env.SERPAPI_KEY);

// ---------------------------------------------------------------------------
// Types (SerpApi's Google Flights engine raw response shape)
// ---------------------------------------------------------------------------

interface SerpFlightLeg {
  departure_airport: { name: string; id: string; time: string };
  arrival_airport: { name: string; id: string; time: string };
  duration: number;
  airline: string;
  flight_number: string;
}

interface SerpItinerary {
  flights: SerpFlightLeg[];
  total_duration?: number;
  price?: number;
  type: string;
  booking_token?: string;
  departure_token?: string;
}

interface SerpResponse {
  error?: string;
  best_flights?: SerpItinerary[];
  other_flights?: SerpItinerary[];
}

// ---------------------------------------------------------------------------
// In-memory cache (15 min TTL) to conserve quota
// ---------------------------------------------------------------------------

const cache = new Map<string, { at: number; data: NormalizedFlight[] }>();
const CACHE_TTL = 15 * 60 * 1000;

function normalize(itin: SerpItinerary, params: ProviderSearchParams, idx: number): NormalizedFlight | null {
  if (!itin.flights?.length || itin.price == null) return null;

  const first = itin.flights[0];
  const last = itin.flights[itin.flights.length - 1];
  const [code, number] = (first.flight_number ?? "").split(" ");

  return {
    id: itin.booking_token ?? `serpapi-${idx}-${first.flight_number ?? idx}`,
    source: "google-flights",
    origin: params.origin,
    destination: params.destination,
    origin_airport: first.departure_airport.id,
    destination_airport: last.arrival_airport.id,
    price: itin.price,
    airline: code ?? "",
    airline_name: first.airline,
    flight_number: number ?? first.flight_number ?? "",
    departure_at: first.departure_airport.time.replace(" ", "T"),
    return_at: last.arrival_airport.time.replace(" ", "T"),
    transfers: Math.max(0, itin.flights.length - 1),
    return_transfers: 0,
    duration: itin.total_duration ?? first.duration ?? 0,
    duration_to: itin.total_duration ?? first.duration ?? 0,
    duration_back: 0,
  };
}

// ---------------------------------------------------------------------------
// Flight search
//
// NOTE: Google Flights' round-trip pricing requires a two-step flow
// (search outbound -> get a `departure_token` per itinerary -> re-search
// with that token to pick a return flight and get the combined price).
// Doing that for every itinerary would multiply request volume, so for now
// this provider only participates in one-way searches; round-trip searches
// fall back to the other configured providers.
// ---------------------------------------------------------------------------

async function search(params: ProviderSearchParams): Promise<NormalizedFlight[]> {
  if (!keyPool.hasKeys()) throw new Error("CONFIG: no SerpApi key configured");

  const isRound = params.tripType === "round" && !!params.returnDate;
  if (isRound) return [];

  const cacheKey = JSON.stringify(params);
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;

  const json = await keyPool.withRotation(async (key) => {
    const url = new URL(BASE_URL);
    url.searchParams.set("engine", "google_flights");
    url.searchParams.set("departure_id", params.origin);
    url.searchParams.set("arrival_id", params.destination);
    url.searchParams.set("outbound_date", params.departDate);
    url.searchParams.set("type", "2"); // one way
    url.searchParams.set("adults", String(params.passengers ?? 1));
    url.searchParams.set("currency", "USD");
    url.searchParams.set("hl", "en");
    url.searchParams.set("api_key", key);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(url.toString(), { method: "GET", cache: "no-store", signal: controller.signal });
      if (res.status === 429) throw new RateLimitError(`SerpApi: rate limited on key ending ...${key.slice(-4)}`);
      const data = (await res.json()) as SerpResponse;
      if (data.error) {
        if (/rate limit|run out of searches|exceeded/i.test(data.error)) {
          throw new RateLimitError(`SerpApi: ${data.error}`);
        }
        throw new Error(`SerpApi: ${data.error}`);
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  });

  const itineraries = [...(json.best_flights ?? []), ...(json.other_flights ?? [])];
  const flights = itineraries
    .map((itin, idx) => normalize(itin, params, idx))
    .filter((f): f is NormalizedFlight => f !== null)
    .slice(0, 30);

  cache.set(cacheKey, { at: Date.now(), data: flights });
  return flights;
}

export const serpApiProvider: FlightProvider = {
  id: "google-flights",
  label: "Google Flights (SerpApi)",
  isConfigured: () => keyPool.hasKeys(),
  search,
};
