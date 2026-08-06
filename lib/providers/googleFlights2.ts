import { KeyPool, RateLimitError } from "@/lib/keyPool";
import type { FlightProvider, NormalizedFlight, ProviderSearchParams } from "./types";

const HOST = "google-flights2.p.rapidapi.com";
const BASE_URL = `https://${HOST}/api/v1/searchFlights`;

// This is a RapidAPI-hosted wrapper around Google Flights that takes IATA
// codes directly (no separate airport-lookup call needed) and responds in
// 2-7s — noticeably faster and more reliable than the scraper-backed
// Priceline provider. Shares the same RapidAPI account key as Priceline by
// default since RapidAPI keys are account-wide across subscribed APIs.
const keyPool = new KeyPool(
  process.env.RAPIDAPI_KEY_GOOGLE_FLIGHTS2 ?? process.env.RAPIDAPI_KEY_PRICELINE ?? process.env.RAPIDAPI_KEY
);

interface GF2Airport {
  airport_code: string;
  time: string; // "2026-9-20 07:50"
}

interface GF2Leg {
  departure_airport: GF2Airport;
  arrival_airport: GF2Airport;
  airline: string;
  flight_number: string;
}

interface GF2Itinerary {
  duration?: { raw?: number };
  flights: GF2Leg[];
  price?: number;
  stops?: number;
  booking_token?: string;
}

interface GF2Response {
  status?: boolean;
  message?: string;
  data?: {
    itineraries?: {
      topFlights?: GF2Itinerary[];
      otherFlights?: GF2Itinerary[];
    };
  };
}

const cache = new Map<string, { at: number; data: NormalizedFlight[] }>();
const CACHE_TTL = 15 * 60 * 1000;

function toIso(t: string): string {
  const [datePart, timePart] = t.split(" ");
  const [y, m, d] = datePart.split("-");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T${timePart ?? "00:00"}`;
}

function normalize(itin: GF2Itinerary, idx: number): NormalizedFlight | null {
  if (!itin.flights?.length || itin.price == null) return null;
  const first = itin.flights[0];
  const last = itin.flights[itin.flights.length - 1];
  const [code, number] = (first.flight_number ?? "").split(" ");

  return {
    id: itin.booking_token ?? `gf2-${idx}-${first.flight_number ?? idx}`,
    source: "google-flights2",
    origin: first.departure_airport.airport_code,
    destination: last.arrival_airport.airport_code,
    origin_airport: first.departure_airport.airport_code,
    destination_airport: last.arrival_airport.airport_code,
    price: itin.price,
    airline: code ?? "",
    airline_name: first.airline,
    flight_number: number ?? first.flight_number ?? "",
    departure_at: toIso(first.departure_airport.time),
    return_at: toIso(last.arrival_airport.time),
    transfers: itin.stops ?? Math.max(0, itin.flights.length - 1),
    return_transfers: 0,
    duration: itin.duration?.raw ?? 0,
    duration_to: itin.duration?.raw ?? 0,
    duration_back: 0,
  };
}

// Round-trip needs a follow-up call per itinerary (select-return-flight
// token flow) to get real combined pricing — same limitation as the
// SerpApi provider, so this one also sticks to one-way searches for now.
async function search(params: ProviderSearchParams): Promise<NormalizedFlight[]> {
  if (!keyPool.hasKeys()) throw new Error("CONFIG: no Google Flights2/RapidAPI key configured");

  const isRound = params.tripType === "round" && !!params.returnDate;
  if (isRound) return [];

  const cacheKey = JSON.stringify(params);
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;

  const json = await keyPool.withRotation(async (key) => {
    const url = new URL(BASE_URL);
    url.searchParams.set("departure_id", params.origin);
    url.searchParams.set("arrival_id", params.destination);
    url.searchParams.set("outbound_date", params.departDate);
    url.searchParams.set("travel_class", "ECONOMY");
    url.searchParams.set("adults", String(params.passengers ?? 1));
    url.searchParams.set("show_hidden", "1");
    url.searchParams.set("currency", "USD");
    url.searchParams.set("language_code", "en-US");
    url.searchParams.set("country_code", "US");
    url.searchParams.set("search_type", "best");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { "x-rapidapi-host": HOST, "x-rapidapi-key": key },
        signal: controller.signal,
        cache: "no-store",
      });
      if (res.status === 429) throw new RateLimitError(`GoogleFlights2: rate limited on key ending ...${key.slice(-4)}`);
      const data = (await res.json()) as GF2Response;
      if (data.status === false) throw new Error(`GoogleFlights2: ${data.message ?? "request failed"}`);
      return data;
    } finally {
      clearTimeout(timer);
    }
  });

  const itineraries = [...(json.data?.itineraries?.topFlights ?? []), ...(json.data?.itineraries?.otherFlights ?? [])];
  const flights = itineraries
    .map((itin, idx) => normalize(itin, idx))
    .filter((f): f is NormalizedFlight => f !== null)
    .slice(0, 30);

  cache.set(cacheKey, { at: Date.now(), data: flights });
  return flights;
}

export const googleFlights2Provider: FlightProvider = {
  id: "google-flights2",
  label: "Google Flights (RapidAPI)",
  isConfigured: () => keyPool.hasKeys(),
  search,
};
