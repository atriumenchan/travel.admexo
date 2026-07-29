const BASE_DATA_URL = "https://api.travelpayouts.com/aviasales";
const BASE_SEARCH_URL = "https://api.travelpayouts.com/v1";
const AFFILIATE_MARKER = process.env.TRAVELPAYOUTS_MARKER ?? "";
const API_TOKEN = process.env.TRAVELPAYOUTS_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Airport {
  code: string;
  name: string;
  city_code: string;
  country_code: string;
  city?: string;   // enriched from cities.json
  country?: string; // enriched from cities.json
}

export interface FlightResult {
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  airline_name?: string;
  flight_number: string;
  departure_at: string;
  return_at: string | null;
  transfers: number;
  return_transfers: number;
  duration: number;
  duration_to: number;
  duration_back: number;
  link: string;
}

export interface CheapestTicket {
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at: string;
  expires_at: string;
  number_of_changes: number;
  found_at: string;
  duration: number;
  duration_to: number;
  duration_back: number;
  link: string;
}

export interface MonthlyPrice {
  origin: string;
  destination: string;
  price: number;
  month: string; // "YYYY-MM"
  departure_at: string;
  return_at: string;
  airline: string;
  link: string;
}

export interface PopularRoute {
  origin: string;
  destination: string;
  price: number;
  transfers: number;
  airline: string;
  departure_at: string;
  link: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildAffiliateLink(path: string): string {
  const base = "https://www.aviasales.com";
  const sep = path.includes("?") ? "&" : "?";
  return `${base}${path}${sep}marker=${AFFILIATE_MARKER}&utm_source=affiliate&utm_medium=metasearch`;
}

async function apiFetch<T>(url: string, cache: RequestCache = "no-store", revalidate?: number): Promise<T> {
  const headers = { "X-Access-Token": API_TOKEN };
  const res = revalidate
    ? await fetch(url, { next: { revalidate }, headers } as RequestInit)
    : await fetch(url, { cache, headers });

  if (res.status === 429) {
    throw new Error("RATE_LIMIT: Too many requests to Travelpayouts API");
  }
  if (!res.ok) {
    throw new Error(`API_ERROR: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Airport autocomplete (static cached file from Travelpayouts)
// ---------------------------------------------------------------------------

let airportCache: Airport[] | null = null;
let cityNameMap: Map<string, string> | null = null;
let countryNameMap: Map<string, string> | null = null;

async function loadCityMap(): Promise<Map<string, string>> {
  if (cityNameMap) return cityNameMap;
  try {
    const cities = await apiFetch<{ code: string; name: string; country_code: string }[]>(
      "https://api.travelpayouts.com/data/en/cities.json",
      "force-cache"
    );
    cityNameMap = new Map(cities.map((c) => [c.code, c.name]));
  } catch {
    cityNameMap = new Map();
  }
  return cityNameMap;
}

async function loadCountryMap(): Promise<Map<string, string>> {
  if (countryNameMap) return countryNameMap;
  try {
    const countries = await apiFetch<{ code: string; name: string }[]>(
      "https://api.travelpayouts.com/data/en/countries.json",
      "force-cache"
    );
    countryNameMap = new Map(countries.map((c) => [c.code, c.name]));
  } catch {
    countryNameMap = new Map();
  }
  return countryNameMap;
}

export async function searchAirports(query: string): Promise<Airport[]> {
  const [cities, countries] = await Promise.all([loadCityMap(), loadCountryMap()]);

  if (!airportCache) {
    try {
      const data = await apiFetch<Airport[]>(
        "https://api.travelpayouts.com/data/en/airports.json",
        "force-cache"
      );
      airportCache = data.map((a) => ({
        ...a,
        city: cities.get(a.city_code) ?? a.city_code,
        country: countries.get(a.country_code) ?? a.country_code,
      }));
    } catch {
      return [];
    }
  }

  const q = query.toLowerCase().trim();
  if (!q) return [];

  const score = (a: Airport): number => {
    const code = a.code.toLowerCase();
    const city = (a.city ?? "").toLowerCase();
    const cityCode = a.city_code.toLowerCase();
    const name = a.name.toLowerCase();
    if (code === q) return 5;
    if (code.startsWith(q)) return 4;
    if (city.startsWith(q)) return 3;
    if (cityCode.startsWith(q)) return 2;
    if (name.startsWith(q)) return 1;
    return 0;
  };

  return airportCache
    .filter(
      (a) =>
        a.code?.toLowerCase().includes(q) ||
        a.city_code?.toLowerCase().includes(q) ||
        (a.city ?? "").toLowerCase().includes(q) ||
        a.name?.toLowerCase().includes(q)
    )
    .sort((a, b) => score(b) - score(a))
    .slice(0, 8);
}

// ---------------------------------------------------------------------------
// Cheapest prices for a route (v1 prices API)
// ---------------------------------------------------------------------------

export interface SearchParams {
  origin: string;
  destination: string;
  departDate: string; // YYYY-MM-DD
  returnDate?: string;
  adults?: number;
  currency?: string;
  sorting?: "price" | "duration" | "rating";
  limit?: number;
  page?: number;
}

export async function searchFlights(params: SearchParams): Promise<FlightResult[]> {
  const url = new URL(`${BASE_DATA_URL}/v3/prices/best`);
  url.searchParams.set("origin", params.origin);
  url.searchParams.set("destination", params.destination);
  url.searchParams.set("depart_date", params.departDate);
  if (params.returnDate) url.searchParams.set("return_date", params.returnDate);
  url.searchParams.set("currency", params.currency ?? "usd");
  url.searchParams.set("market", "us");
  url.searchParams.set("locale", "en");
  url.searchParams.set("limit", String(params.limit ?? 30));
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("token", API_TOKEN);

  try {
    const data = await apiFetch<{ success: boolean; data: FlightResult[] }>(
      url.toString(),
      "no-store"
    );
    if (!data.success || !data.data) return [];
    return data.data.map((f) => ({
      ...f,
      link: buildAffiliateLink(f.link),
    }));
  } catch {
    // Fall through to alternative endpoint
  }

  // Fallback: v1 cheap prices endpoint (caches 5 min server-side)
  const altUrl = new URL(`${BASE_SEARCH_URL}/prices/cheap`);
  altUrl.searchParams.set("origin", params.origin);
  altUrl.searchParams.set("destination", params.destination);
  altUrl.searchParams.set("depart_date", params.departDate);
  if (params.returnDate) altUrl.searchParams.set("return_date", params.returnDate);
  altUrl.searchParams.set("currency", params.currency ?? "usd");
  altUrl.searchParams.set("token", API_TOKEN);

  const alt = await apiFetch<{ success: boolean; data: Record<string, CheapestTicket> }>(
    altUrl.toString(),
    "no-store",
    300
  );

  if (!alt.success || !alt.data) return [];

  return Object.values(alt.data).map((t) => ({
    origin: params.origin,
    destination: params.destination,
    origin_airport: params.origin,
    destination_airport: params.destination,
    price: t.price,
    airline: t.airline,
    flight_number: t.flight_number,
    departure_at: t.departure_at,
    return_at: t.return_at ?? null,
    transfers: t.number_of_changes ?? 0,
    return_transfers: 0,
    duration: t.duration ?? 0,
    duration_to: t.duration_to ?? 0,
    duration_back: t.duration_back ?? 0,
    link: buildAffiliateLink(t.link),
  }));
}

// ---------------------------------------------------------------------------
// Monthly cheapest prices (calendar view)
// ---------------------------------------------------------------------------

export async function getMonthlyPrices(
  origin: string,
  destination: string,
  currency = "usd"
): Promise<MonthlyPrice[]> {
  const url = new URL(`${BASE_SEARCH_URL}/prices/monthly`);
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("currency", currency);
  url.searchParams.set("token", API_TOKEN);

  try {
    const data = await apiFetch<{ success: boolean; data: Record<string, CheapestTicket> }>(
      url.toString(),
      "no-store",
      3600
    );
    if (!data.success || !data.data) return [];

    return Object.entries(data.data).map(([month, t]) => ({
      origin,
      destination,
      price: t.price,
      month,
      departure_at: t.departure_at,
      return_at: t.return_at,
      airline: t.airline,
      link: buildAffiliateLink(t.link),
    }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Popular / inspiration routes
// ---------------------------------------------------------------------------

export async function getPopularRoutes(origin: string): Promise<PopularRoute[]> {
  const url = new URL(`${BASE_SEARCH_URL}/city-directions`);
  url.searchParams.set("origin", origin);
  url.searchParams.set("currency", "usd");
  url.searchParams.set("token", API_TOKEN);

  try {
    const data = await apiFetch<{
      success: boolean;
      data: Record<string, { price: number; transfers: number; airline: string; departure_at: string; link: string }>;
    }>(url.toString(), "no-store", 86400);

    if (!data.success || !data.data) return [];

    return Object.entries(data.data)
      .slice(0, 9)
      .map(([dest, v]) => ({
        origin,
        destination: dest,
        price: v.price,
        transfers: v.transfers ?? 0,
        airline: v.airline,
        departure_at: v.departure_at,
        link: buildAffiliateLink(v.link),
      }));
  } catch {
    return FALLBACK_POPULAR_ROUTES;
  }
}

// ---------------------------------------------------------------------------
// Fallback static data (shown when API unavailable / no token)
// ---------------------------------------------------------------------------

export const FALLBACK_POPULAR_ROUTES: PopularRoute[] = [
  { origin: "JFK", destination: "LHR", price: 420, transfers: 0, airline: "BA", departure_at: "", link: "https://www.aviasales.com/search/JFK0LHR1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "CDG", price: 390, transfers: 0, airline: "AF", departure_at: "", link: "https://www.aviasales.com/search/JFK0CDG1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "DXB", price: 650, transfers: 1, airline: "EK", departure_at: "", link: "https://www.aviasales.com/search/JFK0DXB1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "NRT", price: 750, transfers: 0, airline: "NH", departure_at: "", link: "https://www.aviasales.com/search/JFK0NRT1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "SIN", price: 820, transfers: 1, airline: "SQ", departure_at: "", link: "https://www.aviasales.com/search/JFK0SIN1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "BCN", price: 410, transfers: 1, airline: "IB", departure_at: "", link: "https://www.aviasales.com/search/JFK0BCN1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "BKK", price: 780, transfers: 1, airline: "TG", departure_at: "", link: "https://www.aviasales.com/search/JFK0BKK1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "SYD", price: 1100, transfers: 1, airline: "QF", departure_at: "", link: "https://www.aviasales.com/search/JFK0SYD1?marker=" + AFFILIATE_MARKER },
  { origin: "JFK", destination: "GRU", price: 560, transfers: 0, airline: "LA", departure_at: "", link: "https://www.aviasales.com/search/JFK0GRU1?marker=" + AFFILIATE_MARKER },
];

export const POPULAR_DESTINATIONS = [
  { code: "LHR", city: "London", country: "United Kingdom", emoji: "🇬🇧", image: "london" },
  { code: "CDG", city: "Paris", country: "France", emoji: "🇫🇷", image: "paris" },
  { code: "DXB", city: "Dubai", country: "UAE", emoji: "🇦🇪", image: "dubai" },
  { code: "NRT", city: "Tokyo", country: "Japan", emoji: "🇯🇵", image: "tokyo" },
  { code: "SIN", city: "Singapore", country: "Singapore", emoji: "🇸🇬", image: "singapore" },
  { code: "BCN", city: "Barcelona", country: "Spain", emoji: "🇪🇸", image: "barcelona" },
  { code: "BKK", city: "Bangkok", country: "Thailand", emoji: "🇹🇭", image: "bangkok" },
  { code: "SYD", city: "Sydney", country: "Australia", emoji: "🇦🇺", image: "sydney" },
  { code: "GRU", city: "São Paulo", country: "Brazil", emoji: "🇧🇷", image: "sao-paulo" },
];

// ---------------------------------------------------------------------------
// Airline name map
// ---------------------------------------------------------------------------

export const AIRLINE_NAMES: Record<string, string> = {
  AA: "American Airlines", BA: "British Airways", UA: "United Airlines",
  DL: "Delta Air Lines", LH: "Lufthansa", AF: "Air France",
  KL: "KLM", EK: "Emirates", QR: "Qatar Airways", EY: "Etihad Airways",
  SQ: "Singapore Airlines", CX: "Cathay Pacific", NH: "ANA",
  JL: "Japan Airlines", TG: "Thai Airways", QF: "Qantas",
  IB: "Iberia", LA: "LATAM Airlines", AV: "Avianca",
  TK: "Turkish Airlines", SU: "Aeroflot", FR: "Ryanair",
  U2: "easyJet", W6: "Wizz Air", VY: "Vueling",
  VS: "Virgin Atlantic", B6: "JetBlue", WN: "Southwest Airlines",
  NK: "Spirit Airlines", F9: "Frontier Airlines", AS: "Alaska Airlines",
  AC: "Air Canada", AM: "Aeromexico", NZ: "Air New Zealand",
  VA: "Virgin Australia", AZ: "ITA Airways", SN: "Brussels Airlines",
  OS: "Austrian Airlines", EI: "Aer Lingus", AY: "Finnair",
  TP: "TAP Air Portugal", LX: "Swiss", ET: "Ethiopian Airlines",
  SV: "Saudia", GF: "Gulf Air", WY: "Oman Air", UL: "SriLankan Airlines",
  MH: "Malaysia Airlines", VN: "Vietnam Airlines", PR: "Philippine Airlines",
  KE: "Korean Air", OZ: "Asiana Airlines", CA: "Air China",
  MU: "China Eastern", CZ: "China Southern", MS: "Egyptair",
  AI: "Air India", "6E": "IndiGo", UK: "Vistara", QP: "Akasa Air",
  IX: "Air India Express", SG: "SpiceJet", I5: "AirAsia India",
  G8: "Go First", S5: "Star Air", "9I": "Alliance Air",
};

export function getAirlineName(iata: string): string {
  return AIRLINE_NAMES[iata] ?? iata;
}

// Aviasales deep link: /search/{ORIGIN}{DDMM}{DEST}[{DDMM}]{passengers}?marker=
export function buildAviasalesSearchLink(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  passengers = 1
): string {
  const ddmm = (d: string) => `${d.slice(8, 10)}${d.slice(5, 7)}`;
  let code = `${origin.toUpperCase()}${ddmm(departDate)}${destination.toUpperCase()}`;
  if (returnDate) code += ddmm(returnDate);
  code += String(passengers);
  return `https://www.aviasales.com/search/${code}?marker=${AFFILIATE_MARKER}`;
}

export function formatDuration(minutes: number): string {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}
