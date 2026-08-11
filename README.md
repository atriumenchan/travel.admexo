# Skylerb — Flight Metasearch Affiliate Site

A Skyscanner-style flight metasearch engine built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Live prices are aggregated in parallel from multiple flight-search APIs (Priceline via RapidAPI, Google Flights via SerpApi), with Travelpayouts as the cached fallback.

> All bookings are completed on airline or OTA websites via affiliate deep links. No payment processing on-site.

---

## Features

- **Flight search** — origin/destination IATA autocomplete, depart/return dates, passenger count, round-trip/one-way
- **Search results** — sorted by price, duration, or best value with animated skeletons while loading
- **Cheapest month calendar** — color-coded monthly price view for any route
- **Popular destinations** — inspiration cards pulled live from Travelpayouts API (fallback to static data)
- **SEO** — per-route metadata at `/flights/jfk-to-lhr`, Open Graph tags, robots directives
- **Affiliate deep links** — every "Book now" button opens the airline/OTA in a new tab with your tracking marker

---

## Getting Started

### 1. Get Travelpayouts credentials

1. Sign up at [travelpayouts.com](https://www.travelpayouts.com)
2. Go to **Tools → API** to get your **API Token**
3. Find your **Marker** in the Affiliate dashboard (Partners → My programs)

### 2. Clone & install

```bash
git clone <repo>
cd flights
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
TRAVELPAYOUTS_TOKEN=your_api_token_here
TRAVELPAYOUTS_MARKER=your_affiliate_marker_here

# Optional live providers — the site works without these (falls back to
# Travelpayouts cached prices), but each one you add increases result
# coverage. Comma-separate multiple keys per provider to pool quota.
RAPIDAPI_KEY_PRICELINE=your_rapidapi_key_here
SERPAPI_KEY=your_serpapi_key_here

# Optional — only needed if this API is on a different RapidAPI account
# than Priceline. Defaults to reusing RAPIDAPI_KEY_PRICELINE otherwise.
RAPIDAPI_KEY_GOOGLE_FLIGHTS2=your_rapidapi_key_here
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
flights/
├── app/
│   ├── layout.tsx              # Root layout, Navbar, Footer
│   ├── page.tsx                # Homepage — search form + popular routes
│   ├── flights/[slug]/
│   │   ├── page.tsx            # Search results + monthly calendar
│   │   └── loading.tsx         # Loading skeleton page
│   └── api/airports/route.ts   # Airport autocomplete API
├── components/
│   ├── SearchForm.tsx          # Client-side search form with autocomplete
│   ├── FlightCard.tsx          # Individual flight result card
│   ├── FlightCardSkeleton.tsx  # Loading skeleton
│   ├── ResultsFilter.tsx       # Sort controls
│   ├── MonthlyCalendar.tsx     # Cheapest month view
│   ├── PopularRoutes.tsx       # Inspiration destination cards
│   ├── HowItWorks.tsx          # Informational section
│   ├── Navbar.tsx              # Top navigation
│   └── Footer.tsx              # Site footer
└── lib/
    ├── keyPool.ts               # Multi-key round-robin pool w/ rate-limit fallback
    ├── aggregator.ts            # Fans out to all providers in parallel, dedupes & merges
    ├── providers/
    │   ├── types.ts             # Shared FlightProvider / NormalizedFlight contract
    │   ├── priceline.ts         # Priceline (RapidAPI) provider
    │   ├── serpapi.ts           # Google Flights (SerpApi) provider
    │   └── googleFlights2.ts    # Google Flights (RapidAPI "google-flights2") provider
    ├── travelpayouts.ts         # Typed API client — cached fallback + affiliate links
    └── utils.ts                 # formatPrice, formatDate, cn(), slugify helpers
```

---

## Multi-Provider Live Search

`lib/aggregator.ts` is the single entry point the results page calls. On every search it:

1. Filters `PROVIDERS` down to the ones with at least one API key configured (`isConfigured()`).
2. Calls all of them **in parallel** via `Promise.allSettled`, each with its own timeout, so one slow/broken provider never blocks the others.
3. Normalizes every result into a common shape, then **de-duplicates** flights that appear in more than one source (same airline + flight number + departure time — cheapest price wins).
4. Returns the merged, deduped list plus a per-provider status report (used for the "Live prices · combined from Priceline, Google Flights" banner and for debugging failures).
5. If every live provider fails or returns nothing, the page falls back to Travelpayouts' cached prices so users still see results.

**Adding a new provider:** implement the `FlightProvider` interface (`lib/providers/types.ts`) in a new file under `lib/providers/`, then add it to the `PROVIDERS` array in `lib/aggregator.ts`. Use `KeyPool` (`lib/keyPool.ts`) for API keys so multiple keys for that provider are automatically pooled and rotated.

**Multiple keys per provider:** set the env var to a comma-separated list (e.g. `RAPIDAPI_KEY_PRICELINE=key1,key2,key3`). Requests round-robin across the keys; if one gets rate-limited (HTTP 429), it's put on a short cooldown and the next key is used automatically — no code changes needed, just add more keys.

**Latency budget:** each provider has its own short internal timeout (6-10s) with minimal retries, and the aggregator caps every provider at 13s no matter how many are configured — so total search time stays bounded even as more providers are added, instead of growing with each new one. Repeat searches (same origin/destination/date/passengers/tripType, e.g. from sorting or navigating back) are served from a 3-minute in-memory cache in `lib/aggregator.ts` and return in well under 100ms.

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. In **Settings → Environment Variables**, add:
   - `TRAVELPAYOUTS_TOKEN`
   - `TRAVELPAYOUTS_MARKER`
4. Deploy — Vercel auto-detects Next.js

---

## API Caching

| Data | Cache TTL |
|------|-----------|
| Airport list | Permanent (`force-cache`) |
| Flight search results | No cache (live prices) |
| Monthly price calendar | 1 hour (`revalidate: 3600`) |
| Popular routes | 24 hours (`revalidate: 86400`) |

---

## Travelpayouts API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /aviasales/v3/prices/best` | Live cheapest flight options |
| `GET /v1/prices/cheap` | Fallback cheap prices by date |
| `GET /v1/prices/monthly` | Monthly cheapest price calendar |
| `GET /v1/city-directions` | Popular destinations from an origin |
| `GET /data/en/airports.json` | Airport autocomplete data |

---

## Affiliate Disclosure

Skylerb earns a commission when users book via links on this site. All prices are provided by Travelpayouts and may not reflect the final booking price.
