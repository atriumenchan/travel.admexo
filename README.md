# SkyDeal — Flight Metasearch Affiliate Site

A Skyscanner-style flight metasearch engine built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Powered by the Travelpayouts API.

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
    ├── travelpayouts.ts        # Typed API client — all Travelpayouts calls
    └── utils.ts                # formatPrice, formatDate, cn(), slugify helpers
```

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

SkyDeal earns a commission when users book via links on this site. All prices are provided by Travelpayouts and may not reflect the final booking price.
