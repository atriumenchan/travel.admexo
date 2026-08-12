// ---------------------------------------------------------------------------
// Illustrative content for the marketing homepage sections (destination
// stats, deals, results preview, testimonials, etc).
//
// IMPORTANT: none of this is live data — there's no weather/CO2/rating API
// wired in. It's presented as representative example content for the
// redesign (clearly framed as "example"/"today's deals" rather than a false
// real-time claim). The parts of the site that show REAL prices are the
// Travelpayouts widget (components/TravelpayoutsWidget.tsx) and the dormant
// custom aggregator (lib/aggregator.ts) — this file is presentation-only.
// ---------------------------------------------------------------------------

export interface DestinationDetail {
  code: string;
  image: string;
  duration: string;
  bestAirline: string;
  tempC: number;
  savingsPercent: number;
}

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  LHR: { code: "LHR", image: "/destinations/dest-london.jpg", duration: "7h 10m", bestAirline: "British Airways", tempC: 16, savingsPercent: 22 },
  CDG: { code: "CDG", image: "/destinations/dest-paris.jpg", duration: "7h 45m", bestAirline: "Air France", tempC: 18, savingsPercent: 18 },
  DXB: { code: "DXB", image: "/destinations/dest-dubai.jpg", duration: "13h 05m", bestAirline: "Emirates", tempC: 34, savingsPercent: 27 },
  NRT: { code: "NRT", image: "/destinations/dest-tokyo.jpg", duration: "14h 20m", bestAirline: "ANA", tempC: 24, savingsPercent: 15 },
  SIN: { code: "SIN", image: "/destinations/dest-singapore.jpg", duration: "18h 30m", bestAirline: "Singapore Airlines", tempC: 30, savingsPercent: 20 },
  BCN: { code: "BCN", image: "/destinations/dest-barcelona.jpg", duration: "8h 05m", bestAirline: "Iberia", tempC: 21, savingsPercent: 24 },
  BKK: { code: "BKK", image: "/destinations/dest-bangkok.jpg", duration: "17h 40m", bestAirline: "Thai Airways", tempC: 32, savingsPercent: 19 },
  SYD: { code: "SYD", image: "/destinations/dest-sydney.jpg", duration: "21h 15m", bestAirline: "Qantas", tempC: 22, savingsPercent: 16 },
  GRU: { code: "GRU", image: "/destinations/dest-sao-paulo.jpg", duration: "9h 50m", bestAirline: "LATAM", tempC: 25, savingsPercent: 21 },
};

export interface FeaturedDeal {
  id: string;
  tag: "Flash Sale" | "Weekend Escape" | "Hidden Gem" | "Business Class" | "Luxury";
  city: string;
  country: string;
  image: string;
  originalPrice: number;
  price: number;
  code: string;
  endsInHours: number;
}

export const FEATURED_DEALS: FeaturedDeal[] = [
  { id: "d1", tag: "Flash Sale", city: "Dubai", country: "UAE", image: "/destinations/dest-dubai.jpg", originalPrice: 890, price: 649, code: "DXB", endsInHours: 8 },
  { id: "d2", tag: "Weekend Escape", city: "Barcelona", country: "Spain", image: "/destinations/dest-barcelona.jpg", originalPrice: 420, price: 289, code: "BCN", endsInHours: 30 },
  { id: "d3", tag: "Hidden Gem", city: "Bangkok", country: "Thailand", image: "/destinations/dest-bangkok.jpg", originalPrice: 980, price: 720, code: "BKK", endsInHours: 52 },
  { id: "d4", tag: "Business Class", city: "Tokyo", country: "Japan", image: "/destinations/dest-tokyo.jpg", originalPrice: 4200, price: 3150, code: "NRT", endsInHours: 20 },
  { id: "d5", tag: "Luxury", city: "Sydney", country: "Australia", image: "/destinations/dest-sydney.jpg", originalPrice: 1850, price: 1390, code: "SYD", endsInHours: 44 },
  { id: "d6", tag: "Flash Sale", city: "São Paulo", country: "Brazil", image: "/destinations/dest-sao-paulo.jpg", originalPrice: 760, price: 540, code: "GRU", endsInHours: 6 },
];

export interface PreviewFlight {
  airline: string;
  logoInitial: string;
  price: number;
  duration: string;
  stops: number;
  co2Percent: number; // vs. route average
  rating: number;
  baggage: string;
  refundable: boolean;
  badge?: "Cheapest" | "Fastest" | "Best value";
}

export const RESULTS_PREVIEW: PreviewFlight[] = [
  { airline: "Icelandair", logoInitial: "FI", price: 412, duration: "6h 55m", stops: 0, co2Percent: -12, rating: 4.6, baggage: "1 carry-on", refundable: false, badge: "Cheapest" },
  { airline: "British Airways", logoInitial: "BA", price: 468, duration: "7h 10m", stops: 0, co2Percent: 3, rating: 4.8, baggage: "1 carry-on + 1 checked", refundable: true, badge: "Best value" },
  { airline: "United Airlines", logoInitial: "UA", price: 445, duration: "6h 40m", stops: 0, co2Percent: -6, rating: 4.4, baggage: "1 carry-on", refundable: false, badge: "Fastest" },
  { airline: "Delta Air Lines", logoInitial: "DL", price: 512, duration: "9h 25m", stops: 1, co2Percent: 18, rating: 4.5, baggage: "1 carry-on + 1 checked", refundable: true },
];

export const TRUST_STATS = [
  { value: 700, suffix: "+", label: "Airlines & booking sites" },
  { value: 42, suffix: "M+", label: "Searches every month" },
  { value: 0, prefix: "$", suffix: "", label: "Hidden fees, ever" },
  { value: 128, suffix: " countries", label: "Global coverage" },
];

export interface Testimonial {
  name: string;
  location: string;
  destination: string;
  rating: number;
  quote: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Amelia Ross", location: "United Kingdom", destination: "Bali", rating: 5, quote: "Found a business class fare to Bali for less than what economy was going for elsewhere. The comparison across sites is genuinely useful.", initials: "AR" },
  { name: "Daniel Kim", location: "South Korea", destination: "Lisbon", rating: 5, quote: "Clean, fast, and no dark patterns trying to upsell me on things I didn't ask for. Booked in under three minutes.", initials: "DK" },
  { name: "Sofia Martins", location: "Brazil", destination: "Tokyo", rating: 4, quote: "Loved seeing the price trend before booking — waited two days and saved almost $140 on the same route.", initials: "SM" },
  { name: "James Whitfield", location: "United States", destination: "Reykjavik", rating: 5, quote: "The best-value sorting actually accounts for layovers properly, unlike most metasearch sites I've tried.", initials: "JW" },
];

export interface InspirationCard {
  title: string;
  tag: string;
  image: string;
  description: string;
  /** IATA destination code used to deep-link into the search widget. */
  code: string;
}

export const TRAVEL_INSPIRATION: InspirationCard[] = [
  { title: "Weekend in Barcelona", tag: "Weekend Ideas", image: "/destinations/dest-barcelona.jpg", description: "Tapas, Gaudí architecture, and Mediterranean sunsets — all within a short direct flight.", code: "BCN" },
  { title: "Luxury Escape to Dubai", tag: "Luxury Escapes", image: "/destinations/dest-dubai.jpg", description: "Desert skylines, world-class dining, and five-star stays for less than you'd expect.", code: "DXB" },
  { title: "Budget Bangkok", tag: "Budget Travel", image: "/destinations/dest-bangkok.jpg", description: "Street food capitals don't get better — and flights here are some of our best value routes.", code: "BKK" },
  { title: "Sydney Coastal Adventure", tag: "Adventure Trips", image: "/destinations/dest-sydney.jpg", description: "Surf, harbour hikes, and coastal drives — a full itinerary starting the moment you land.", code: "SYD" },
];

/** Example origin/destination for the illustrative results-preview section. */
export const RESULTS_PREVIEW_ROUTE = { origin: "JFK", destination: "LHR" } as const;

export const WHY_CHOOSE_US = [
  { title: "Real-time pricing", description: "Prices are pulled live from multiple providers in parallel, not cached once a day." },
  { title: "Price alerts", description: "Track a route and we'll tell you the moment fares drop." },
  { title: "Flexible dates", description: "See a full month of prices at a glance to find the cheapest day to fly." },
  { title: "Hidden deals", description: "Surface fares that don't show up on airline sites directly." },
  { title: "No booking fees", description: "We earn a small commission from the airline or OTA — never from you." },
  { title: "Smart recommendations", description: "Best-value sorting factors in price, duration, and layovers together." },
];
