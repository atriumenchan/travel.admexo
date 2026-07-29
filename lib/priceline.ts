const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const HOST = "priceline-com-provider.p.rapidapi.com";
const BASE_URL = `https://${HOST}/v1/flights`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PricelineSearchParams {
  origin: string; // city or airport code, e.g. LON / NYC / DEL
  destination: string;
  departDate: string; // YYYY-MM-DD
  returnDate?: string;
  passengers?: number;
  tripType?: "round" | "one-way";
}

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

export interface PricelineFlight {
  id: string;
  price: number;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  originAirport: string;
  destinationAirport: string;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  stops: number;
}

// ---------------------------------------------------------------------------
// In-memory cache (15 min TTL) to conserve RapidAPI quota
// ---------------------------------------------------------------------------

const cache = new Map<string, { at: number; data: PricelineFlight[] }>();
const CACHE_TTL = 15 * 60 * 1000;

// ---------------------------------------------------------------------------
// Fetch with retry — the upstream scraper intermittently returns
// {"detail":"Priceline TimeoutError, try again"} so we retry with backoff
// ---------------------------------------------------------------------------

async function fetchWithRetry(url: string, attempts = 2): Promise<PricelineSearchResponse> {
  let lastError: unknown = null;

  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
        signal: controller.signal,
        cache: "no-store",
      });

      const json = (await res.json()) as PricelineSearchResponse;

      if (json.detail && /timeout/i.test(json.detail)) {
        lastError = new Error(json.detail);
        await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
        continue;
      }
      if (json.detail) throw new Error(json.detail);
      return json;
    } catch (e) {
      lastError = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Priceline request failed");
}

// ---------------------------------------------------------------------------
// Flight search
// ---------------------------------------------------------------------------

export async function searchPricelineFlights(params: PricelineSearchParams): Promise<PricelineFlight[]> {
  if (!RAPIDAPI_KEY) throw new Error("CONFIG: RAPIDAPI_KEY is not set");

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

  const flights: PricelineFlight[] = listings.slice(0, 30).map((l) => {
    const slice = l.slices[0];
    const firstSeg = slice.segments[0];
    const lastSeg = slice.segments[slice.segments.length - 1];
    const airlineCode = l.marketingAirlines[0]?.code ?? firstSeg.operatingAirline;

    return {
      id: l.id,
      price: l.totalPriceWithDecimal.price,
      airlineCode,
      airlineName: airlineNames.get(airlineCode) ?? airlineCode,
      flightNumber: firstSeg.flightNumber ?? "",
      originAirport: firstSeg.departInfo.airport.code,
      destinationAirport: lastSeg.arrivalInfo.airport.code,
      departureAt: firstSeg.departInfo.time.dateTime,
      arrivalAt: lastSeg.arrivalInfo.time.dateTime,
      durationMinutes: parseInt(slice.durationInMinutes, 10) || 0,
      stops: Math.max(0, slice.segments.length - 1),
    };
  });

  cache.set(cacheKey, { at: Date.now(), data: flights });
  return flights;
}

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
  if (!RAPIDAPI_KEY) return [];

  const url = new URL(`${BASE_URL}/locations`);
  url.searchParams.set("name", query);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as PricelineLocation[];
    return Array.isArray(json) ? json.slice(0, 8) : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
