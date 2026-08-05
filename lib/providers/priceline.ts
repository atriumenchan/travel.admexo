import { KeyPool, RateLimitError } from "@/lib/keyPool";
import type { FlightProvider, NormalizedFlight, ProviderSearchParams } from "./types";

const HOST = "priceline-com-provider.p.rapidapi.com";
const BASE_URL = `https://${HOST}/v1/flights`;

// Accepts one or many comma-separated keys, e.g. RAPIDAPI_KEY_PRICELINE=key1,key2,key3
// Falls back to the legacy RAPIDAPI_KEY for backwards compatibility.
const keyPool = new KeyPool(process.env.RAPIDAPI_KEY_PRICELINE ?? process.env.RAPIDAPI_KEY);

// ---------------------------------------------------------------------------
// Types (Priceline's raw response shape)
// ---------------------------------------------------------------------------

interface PricelineSegment {
  departInfo: { airport: { code: string }; time: { dateTime: string } };
  arrivalInfo: { airport: { code: string }; time: { dateTime: string } };
  operatingAirline: string;
  marketingAirline?: string;
  duration: number;
  flightNumber: string;
}

interface PricelineSlice {
  durationInMinutes: string;
  segments: PricelineSegment[];
}

interface PricelineListing {
  id: string;
  totalPriceWithDecimal: { price: number };
  marketingAirlines: { code: string }[];
  slices: PricelineSlice[];
}

interface PricelineSearchResponse {
  data?: {
    airline?: { code: string; name: string }[];
    listings?: PricelineListing[];
  };
  detail?: string;
}

// ---------------------------------------------------------------------------
// In-memory cache (15 min TTL) to conserve quota
// ---------------------------------------------------------------------------

const cache = new Map<string, { at: number; data: NormalizedFlight[] }>();
const CACHE_TTL = 15 * 60 * 1000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

class UpstreamRetryableError extends Error {}

// ---------------------------------------------------------------------------
// Fetch with key rotation + retry — the upstream scraper intermittently
// returns {"detail":"Priceline TimeoutError, try again"} so we retry with
// backoff, and rotate to another key whenever the current one is rate
// limited (HTTP 429).
// ---------------------------------------------------------------------------

async function requestOnce(url: string, key: string): Promise<PricelineSearchResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": key,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (res.status === 429) {
      throw new RateLimitError(`Priceline: rate limited on key ending ...${key.slice(-4)}`);
    }

    const json = (await res.json()) as PricelineSearchResponse;
    if (json.detail && /timeout|general client error/i.test(json.detail)) {
      throw new UpstreamRetryableError(json.detail);
    }
    if (json.detail) throw new Error(json.detail);
    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url: string, attempts = 3): Promise<PricelineSearchResponse> {
  let lastError: unknown = null;

  for (let i = 0; i < attempts; i++) {
    try {
      return await keyPool.withRotation((key) => requestOnce(url, key));
    } catch (e) {
      lastError = e;
      if (i < attempts - 1) {
        const backoff = e instanceof UpstreamRetryableError ? 1200 * (i + 1) : 800 * (i + 1);
        await sleep(backoff);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Priceline request failed");
}

// ---------------------------------------------------------------------------
// Flight search
// ---------------------------------------------------------------------------

async function search(params: ProviderSearchParams): Promise<NormalizedFlight[]> {
  if (!keyPool.hasKeys()) throw new Error("CONFIG: no Priceline/RapidAPI key configured");

  const cacheKey = JSON.stringify(params);
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;

  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("location_departure", params.origin);
  url.searchParams.set("location_arrival", params.destination);
  url.searchParams.set("date_departure", params.departDate);
  const isRound = params.tripType === "round" && !!params.returnDate;
  url.searchParams.set("itinerary_type", isRound ? "ROUND_TRIP" : "ONE_WAY");
  if (isRound) url.searchParams.set("date_departure_return", params.returnDate!);
  url.searchParams.set("class_type", "ECO");
  url.searchParams.set("number_of_passengers", String(params.passengers ?? 1));
  url.searchParams.set("sort_order", "PRICE");

  const json = await fetchWithRetry(url.toString());
  const listings = json.data?.listings ?? [];
  const airlineNames = new Map((json.data?.airline ?? []).map((a) => [a.code, a.name]));

  const flights: NormalizedFlight[] = listings.slice(0, 30).map((l) => {
    const slice = l.slices[0];
    const firstSeg = slice.segments[0];
    const lastSeg = slice.segments[slice.segments.length - 1];
    const airlineCode = l.marketingAirlines[0]?.code ?? firstSeg.operatingAirline;

    return {
      id: `priceline-${l.id}`,
      source: "priceline",
      origin: params.origin,
      destination: params.destination,
      origin_airport: firstSeg.departInfo.airport.code,
      destination_airport: lastSeg.arrivalInfo.airport.code,
      price: l.totalPriceWithDecimal.price,
      airline: airlineCode,
      airline_name: airlineNames.get(airlineCode) ?? airlineCode,
      flight_number: firstSeg.flightNumber ?? "",
      departure_at: firstSeg.departInfo.time.dateTime,
      return_at: lastSeg.arrivalInfo.time.dateTime,
      transfers: Math.max(0, slice.segments.length - 1),
      return_transfers: 0,
      duration: parseInt(slice.durationInMinutes, 10) || 0,
      duration_to: parseInt(slice.durationInMinutes, 10) || 0,
      duration_back: 0,
    };
  });

  cache.set(cacheKey, { at: Date.now(), data: flights });
  return flights;
}

export const pricelineProvider: FlightProvider = {
  id: "priceline",
  label: "Priceline",
  isConfigured: () => keyPool.hasKeys(),
  search,
};

// ---------------------------------------------------------------------------
// Location autocomplete (Priceline) — used as backup to Travelpayouts
// ---------------------------------------------------------------------------

export interface PricelineLocation {
  id: string;
  itemName: string;
  cityName: string;
  country: string;
  type: string;
}

export async function searchPricelineLocations(query: string): Promise<PricelineLocation[]> {
  if (!keyPool.hasKeys()) return [];

  const url = new URL(`${BASE_URL}/locations`);
  url.searchParams.set("name", query);

  try {
    return await keyPool.withRotation(async (key) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": key,
          },
          signal: controller.signal,
          cache: "no-store",
        });
        if (res.status === 429) throw new RateLimitError("Priceline locations: rate limited");
        if (!res.ok) return [];
        const json = (await res.json()) as PricelineLocation[];
        return Array.isArray(json) ? json.slice(0, 8) : [];
      } finally {
        clearTimeout(timer);
      }
    });
  } catch {
    return [];
  }
}
