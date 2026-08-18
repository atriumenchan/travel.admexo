export type VisitorOrigin = {
  /** IATA used in search links and popular-route queries. */
  code: string;
  /** City name shown on deals, routes, and the From field. */
  city: string;
};

export const FALLBACK_ORIGIN: VisitorOrigin = {
  code: "JFK",
  city: "New York",
};

type Hub = VisitorOrigin & { lat: number; lon: number; aliases?: string[] };

/** Major airports used to map an IP city/lat-lon to a nearby origin. */
const HUBS: Hub[] = [
  { code: "JFK", city: "New York", lat: 40.6413, lon: -73.7781, aliases: ["new york city", "nyc", "brooklyn", "manhattan", "queens"] },
  { code: "EWR", city: "Newark", lat: 40.6895, lon: -74.1745 },
  { code: "LGA", city: "New York", lat: 40.7769, lon: -73.874 },
  { code: "LAX", city: "Los Angeles", lat: 33.9416, lon: -118.4085, aliases: ["la", "santa monica", "hollywood", "long beach"] },
  { code: "SFO", city: "San Francisco", lat: 37.6213, lon: -122.379, aliases: ["sf", "bay area"] },
  { code: "SJC", city: "San Jose", lat: 37.3639, lon: -121.9289, aliases: ["silicon valley"] },
  { code: "OAK", city: "Oakland", lat: 37.7126, lon: -122.2197 },
  { code: "SAN", city: "San Diego", lat: 32.7338, lon: -117.1933 },
  { code: "SEA", city: "Seattle", lat: 47.4502, lon: -122.3088 },
  { code: "PDX", city: "Portland", lat: 45.5898, lon: -122.5951 },
  { code: "DEN", city: "Denver", lat: 39.8561, lon: -104.6737 },
  { code: "PHX", city: "Phoenix", lat: 33.4373, lon: -112.0078 },
  { code: "LAS", city: "Las Vegas", lat: 36.084, lon: -115.1537 },
  { code: "SLC", city: "Salt Lake City", lat: 40.7899, lon: -111.9791 },
  { code: "DFW", city: "Dallas", lat: 32.8998, lon: -97.0403, aliases: ["fort worth", "arlington"] },
  { code: "IAH", city: "Houston", lat: 29.9902, lon: -95.3368 },
  { code: "AUS", city: "Austin", lat: 30.1975, lon: -97.6664 },
  { code: "SAT", city: "San Antonio", lat: 29.4252, lon: -98.4381 },
  { code: "ORD", city: "Chicago", lat: 41.9742, lon: -87.9073 },
  { code: "MDW", city: "Chicago", lat: 41.7868, lon: -87.7522 },
  { code: "MSP", city: "Minneapolis", lat: 44.8848, lon: -93.2223, aliases: ["st paul"] },
  { code: "DTW", city: "Detroit", lat: 42.2162, lon: -83.3554 },
  { code: "ATL", city: "Atlanta", lat: 33.6407, lon: -84.4277 },
  { code: "MIA", city: "Miami", lat: 25.7959, lon: -80.287 },
  { code: "FLL", city: "Fort Lauderdale", lat: 26.0726, lon: -80.1527 },
  { code: "MCO", city: "Orlando", lat: 28.4312, lon: -81.3081 },
  { code: "TPA", city: "Tampa", lat: 27.9755, lon: -82.5332 },
  { code: "RSW", city: "Fort Myers", lat: 26.5362, lon: -81.7552 },
  { code: "CLT", city: "Charlotte", lat: 35.214, lon: -80.9431 },
  { code: "RDU", city: "Raleigh", lat: 35.8801, lon: -78.788, aliases: ["durham"] },
  { code: "BNA", city: "Nashville", lat: 36.1263, lon: -86.6774 },
  { code: "MEM", city: "Memphis", lat: 35.0424, lon: -89.9767 },
  { code: "MSY", city: "New Orleans", lat: 29.9934, lon: -90.258 },
  { code: "STL", city: "St. Louis", lat: 38.7487, lon: -90.37 },
  { code: "MCI", city: "Kansas City", lat: 39.2976, lon: -94.7139 },
  { code: "CVG", city: "Cincinnati", lat: 39.0488, lon: -84.6678 },
  { code: "CLE", city: "Cleveland", lat: 41.4117, lon: -81.8498 },
  { code: "CMH", city: "Columbus", lat: 39.998, lon: -82.8919 },
  { code: "IND", city: "Indianapolis", lat: 39.7173, lon: -86.2944 },
  { code: "PIT", city: "Pittsburgh", lat: 40.4915, lon: -80.2329 },
  { code: "PHL", city: "Philadelphia", lat: 39.8721, lon: -75.2411 },
  { code: "BWI", city: "Baltimore", lat: 39.1774, lon: -76.6684 },
  { code: "IAD", city: "Washington", lat: 38.9531, lon: -77.4565, aliases: ["washington dc", "dc", "arlington"] },
  { code: "DCA", city: "Washington", lat: 38.8512, lon: -77.0402 },
  { code: "BOS", city: "Boston", lat: 42.3656, lon: -71.0096 },
  { code: "BDL", city: "Hartford", lat: 41.9389, lon: -72.6832 },
  { code: "PVD", city: "Providence", lat: 41.7326, lon: -71.4204 },
  { code: "MKE", city: "Milwaukee", lat: 42.9472, lon: -87.8966 },
  { code: "HNL", city: "Honolulu", lat: 21.3187, lon: -157.9225 },
  { code: "ANC", city: "Anchorage", lat: 61.1744, lon: -149.9962 },
  { code: "ABQ", city: "Albuquerque", lat: 35.0402, lon: -106.6092 },
  { code: "OKC", city: "Oklahoma City", lat: 35.3931, lon: -97.6007 },
  { code: "TUL", city: "Tulsa", lat: 36.1984, lon: -95.8881 },
  { code: "OMA", city: "Omaha", lat: 41.3032, lon: -95.8941 },
  { code: "RIC", city: "Richmond", lat: 37.5052, lon: -77.3197 },
  { code: "JAX", city: "Jacksonville", lat: 30.4941, lon: -81.6879 },
  { code: "SAV", city: "Savannah", lat: 32.1276, lon: -81.2021 },
  { code: "CHS", city: "Charleston", lat: 32.8986, lon: -80.0405 },
  { code: "YYZ", city: "Toronto", lat: 43.6777, lon: -79.6248 },
  { code: "YVR", city: "Vancouver", lat: 49.1947, lon: -123.1792 },
  { code: "YUL", city: "Montreal", lat: 45.4706, lon: -73.7408 },
  { code: "YYC", city: "Calgary", lat: 51.1215, lon: -114.0076 },
  { code: "MEX", city: "Mexico City", lat: 19.4363, lon: -99.0721 },
  { code: "CUN", city: "Cancún", lat: 21.0365, lon: -86.8771 },
  { code: "LHR", city: "London", lat: 51.47, lon: -0.4543 },
  { code: "CDG", city: "Paris", lat: 49.0097, lon: 2.5479 },
  { code: "AMS", city: "Amsterdam", lat: 52.3105, lon: 4.7683 },
  { code: "FRA", city: "Frankfurt", lat: 50.0379, lon: 8.5622 },
  { code: "MUC", city: "Munich", lat: 48.3537, lon: 11.775 },
  { code: "MAD", city: "Madrid", lat: 40.4983, lon: -3.5676 },
  { code: "BCN", city: "Barcelona", lat: 41.2974, lon: 2.0833 },
  { code: "FCO", city: "Rome", lat: 41.8003, lon: 12.2389 },
  { code: "MXP", city: "Milan", lat: 45.63, lon: 8.7231 },
  { code: "DUB", city: "Dublin", lat: 53.4264, lon: -6.2499 },
  { code: "ZRH", city: "Zurich", lat: 47.4582, lon: 8.5555 },
  { code: "VIE", city: "Vienna", lat: 48.1103, lon: 16.5697 },
  { code: "CPH", city: "Copenhagen", lat: 55.618, lon: 12.6508 },
  { code: "ARN", city: "Stockholm", lat: 59.6498, lon: 17.9238 },
  { code: "OSL", city: "Oslo", lat: 60.1939, lon: 11.1004 },
  { code: "HEL", city: "Helsinki", lat: 60.3172, lon: 24.9633 },
  { code: "LIS", city: "Lisbon", lat: 38.7742, lon: -9.1342 },
  { code: "ATH", city: "Athens", lat: 37.9364, lon: 23.9445 },
  { code: "IST", city: "Istanbul", lat: 41.2753, lon: 28.7519 },
  { code: "DXB", city: "Dubai", lat: 25.2532, lon: 55.3657 },
  { code: "AUH", city: "Abu Dhabi", lat: 24.433, lon: 54.6511 },
  { code: "DOH", city: "Doha", lat: 25.2609, lon: 51.6138 },
  { code: "DEL", city: "Delhi", lat: 28.5562, lon: 77.1, aliases: ["new delhi"] },
  { code: "BOM", city: "Mumbai", lat: 19.0896, lon: 72.8656 },
  { code: "BKK", city: "Bangkok", lat: 13.69, lon: 100.7501 },
  { code: "SIN", city: "Singapore", lat: 1.3644, lon: 103.9915 },
  { code: "HKG", city: "Hong Kong", lat: 22.308, lon: 113.9185 },
  { code: "NRT", city: "Tokyo", lat: 35.772, lon: 140.3929 },
  { code: "HND", city: "Tokyo", lat: 35.5494, lon: 139.7798 },
  { code: "ICN", city: "Seoul", lat: 37.4602, lon: 126.4407 },
  { code: "SYD", city: "Sydney", lat: -33.9399, lon: 151.1753 },
  { code: "MEL", city: "Melbourne", lat: -37.669, lon: 144.841 },
  { code: "AKL", city: "Auckland", lat: -37.0082, lon: 174.785 },
  { code: "GRU", city: "São Paulo", lat: -23.4356, lon: -46.4731, aliases: ["sao paulo"] },
  { code: "GIG", city: "Rio de Janeiro", lat: -22.809, lon: -43.2506, aliases: ["rio"] },
  { code: "EZE", city: "Buenos Aires", lat: -34.8222, lon: -58.5358 },
  { code: "BOG", city: "Bogotá", lat: 4.7016, lon: -74.1469, aliases: ["bogota"] },
  { code: "LIM", city: "Lima", lat: -12.0219, lon: -77.1143 },
  { code: "SCL", city: "Santiago", lat: -33.393, lon: -70.7858 },
  { code: "JNB", city: "Johannesburg", lat: -26.1367, lon: 28.2411 },
  { code: "CAI", city: "Cairo", lat: 30.1219, lon: 31.4056 },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHeader(value: string | null): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, " ")).trim();
  } catch {
    return value.trim();
  }
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function originFromGeo(input: { city?: string; lat?: number; lon?: number }): VisitorOrigin {
  const city = input.city ? normalize(input.city) : "";

  if (city) {
    const byName = HUBS.find((hub) => {
      if (normalize(hub.city) === city) return true;
      return hub.aliases?.some((alias) => normalize(alias) === city) ?? false;
    });
    if (byName) {
      return { code: byName.code, city: byName.city };
    }
  }

  if (typeof input.lat === "number" && typeof input.lon === "number" && Number.isFinite(input.lat) && Number.isFinite(input.lon)) {
    let best = HUBS[0];
    let bestKm = Infinity;
    for (const hub of HUBS) {
      const km = haversineKm(input.lat, input.lon, hub.lat, hub.lon);
      if (km < bestKm) {
        best = hub;
        bestKm = km;
      }
    }
    if (bestKm < 800) {
      return { code: best.code, city: best.city };
    }
  }

  return FALLBACK_ORIGIN;
}

function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for") ?? headers.get("x-real-ip") ?? "";
  const ip = forwarded.split(",")[0]?.trim() ?? "";
  return ip.replace(/^::ffff:/, "");
}

function isPrivateIp(ip: string) {
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip === "localhost") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("127.")) return true;
  const m = ip.match(/^172\.(\d+)\./);
  if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
  return false;
}

async function lookupIp(ip: string): Promise<{ city?: string; lat?: number; lon?: number } | null> {
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,city,latitude,longitude`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success?: boolean;
      city?: string;
      latitude?: number;
      longitude?: number;
    };
    if (!data?.success) return null;
    return { city: data.city, lat: data.latitude, lon: data.longitude };
  } catch {
    return null;
  }
}

/**
 * Resolve a nearby airport from request IP headers.
 * Prefers Vercel geo headers, then an IP lookup. Falls back to JFK / New York.
 */
export async function detectVisitorOrigin(headers: Headers): Promise<VisitorOrigin> {
  const vercelCity = decodeHeader(headers.get("x-vercel-ip-city"));
  const vercelLat = Number.parseFloat(headers.get("x-vercel-ip-latitude") ?? "");
  const vercelLon = Number.parseFloat(headers.get("x-vercel-ip-longitude") ?? "");

  if (vercelCity || Number.isFinite(vercelLat)) {
    return originFromGeo({
      city: vercelCity,
      lat: Number.isFinite(vercelLat) ? vercelLat : undefined,
      lon: Number.isFinite(vercelLon) ? vercelLon : undefined,
    });
  }

  const ip = clientIp(headers);
  if (ip && !isPrivateIp(ip)) {
    const geo = await lookupIp(ip);
    if (geo) return originFromGeo(geo);
  }

  return FALLBACK_ORIGIN;
}
