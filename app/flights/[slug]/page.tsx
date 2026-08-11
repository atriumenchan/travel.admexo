import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import FlightCard from "@/components/FlightCard";
import FlightCardSkeleton from "@/components/FlightCardSkeleton";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import ResultsFilter from "@/components/ResultsFilter";
import { searchFlights, getMonthlyPrices } from "@/lib/travelpayouts";
import { searchAllProviders, type ProviderStatus } from "@/lib/aggregator";
import { parseSlugs } from "@/lib/utils";
import { AlertCircle, Plane, Zap } from "lucide-react";

export const maxDuration = 60;

interface PageProps {
  params: { slug: string };
  searchParams: {
    origin?: string;
    destination?: string;
    departDate?: string;
    returnDate?: string;
    passengers?: string;
    tripType?: string;
    sort?: string;
  };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const parsed = parseSlugs(params.slug);
  if (!parsed) return { title: "Flights" };
  const { origin, destination } = parsed;
  const depart = searchParams.departDate ?? "";
  return {
    title: `Flights from ${origin} to ${destination}${depart ? ` on ${depart}` : ""} — Skylerb`,
    description: `Find the cheapest flights from ${origin} to ${destination}. Compare prices from hundreds of airlines and book the best deal on Skylerb.`,
    openGraph: {
      title: `Cheap Flights: ${origin} → ${destination}`,
      description: `Compare and book cheap flights from ${origin} to ${destination}.`,
    },
  };
}

async function FlightResults({ params, searchParams }: PageProps) {
  const parsed = parseSlugs(params.slug);
  if (!parsed) return notFound();

  const origin = searchParams.origin ?? parsed.origin;
  const destination = searchParams.destination ?? parsed.destination;
  const departDate = searchParams.departDate;
  const returnDate = searchParams.returnDate;
  const sort = (searchParams.sort as "price" | "duration" | "best") ?? "price";

  if (!departDate) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <p className="font-semibold text-amber-800">Please select a departure date to see flights.</p>
      </div>
    );
  }

  let flights: import("@/lib/travelpayouts").FlightResult[] = [];
  let error: string | null = null;
  let isLive = false;
  let sources: ProviderStatus[] = [];

  // 1) Fan out to every configured live provider (Priceline, Google Flights
  // via SerpApi, ...) in parallel and merge/de-duplicate their results.
  try {
    const aggregated = await searchAllProviders({
      origin,
      destination,
      departDate,
      returnDate,
      passengers: Number(searchParams.passengers ?? 1),
      tripType: (searchParams.tripType as "round" | "one-way") ?? "round",
    });
    sources = aggregated.sources;
    if (aggregated.flights.length > 0) {
      isLive = true;
      flights = aggregated.flights;
    }
  } catch {
    // All providers failed/timed out — fall through to Travelpayouts
  }

  // 2) Fallback: Travelpayouts cached prices
  if (flights.length === 0) {
    try {
      flights = await searchFlights({
        origin,
        destination,
        departDate,
        returnDate,
        limit: 30,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("RATE_LIMIT")) {
        error = "Too many requests. Please try again in a moment.";
      } else {
        error = "Unable to load flights right now. Please try again.";
      }
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="font-semibold text-red-700">{error}</p>
      </div>
    );
  }

  if (!flights.length) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center">
        <Plane className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-600 text-lg mb-1">No flights found</p>
        <p className="text-slate-400 text-sm">Try different dates or nearby airports.</p>
      </div>
    );
  }

  const sorted = [...flights].sort((a, b) => {
    if (sort === "duration") return (a.duration || a.duration_to) - (b.duration || b.duration_to);
    if (sort === "best") {
      const scoreA = a.price + (a.transfers * 100) + (a.duration_to * 0.5);
      const scoreB = b.price + (b.transfers * 100) + (b.duration_to * 0.5);
      return scoreA - scoreB;
    }
    return a.price - b.price;
  });

  const liveSources = sources.filter((s) => s.ok && s.count > 0);

  return (
    <div className="space-y-4">
      {isLive && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <Zap className="w-3.5 h-3.5" />
          Live prices · updated in real time
          {liveSources.length > 0 && (
            <span className="text-slate-400 font-normal">
              · combined from {liveSources.map((s) => s.label).join(", ")}
            </span>
          )}
        </div>
      )}
      <ResultsFilter resultCount={sorted.length} currentSort={sort} />
      {sorted.map((flight, idx) => (
        <FlightCard key={`${flight.airline}-${flight.departure_at}-${idx}`} flight={flight} index={idx} />
      ))}
    </div>
  );
}

async function CalendarSection({ origin, destination }: { origin: string; destination: string }) {
  const monthly = await getMonthlyPrices(origin, destination).catch(() => []);
  if (!monthly.length) return null;
  return (
    <div className="mt-8">
      <MonthlyCalendar prices={monthly} />
    </div>
  );
}

export default async function FlightSearchPage({ params, searchParams }: PageProps) {
  const parsed = parseSlugs(params.slug);
  if (!parsed) return notFound();

  const origin = searchParams.origin ?? parsed.origin;
  const destination = searchParams.destination ?? parsed.destination;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search bar at top */}
      <div className="bg-brand-700 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchForm
            initialOrigin={origin}
            initialDestination={destination}
            initialDepartDate={searchParams.departDate}
            initialReturnDate={searchParams.returnDate}
            initialPassengers={Number(searchParams.passengers ?? 1)}
            initialTripType={(searchParams.tripType as "round" | "one-way") ?? "round"}
            compact
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Flights from <span className="text-brand-600">{origin}</span> to{" "}
            <span className="text-brand-600">{destination}</span>
          </h1>
          {searchParams.departDate && (
            <p className="text-slate-500 text-sm mt-1">
              {searchParams.departDate}{searchParams.returnDate ? ` — ${searchParams.returnDate}` : ""}{" "}
              · {searchParams.passengers ?? 1} {Number(searchParams.passengers ?? 1) === 1 ? "passenger" : "passengers"}
            </p>
          )}
        </div>

        {/* Results with loading fallback */}
        <Suspense fallback={
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => <FlightCardSkeleton key={i} />)}
          </div>
        }>
          <FlightResults params={params} searchParams={searchParams} />
        </Suspense>

        {/* Calendar */}
        <Suspense fallback={null}>
          <CalendarSection origin={origin} destination={destination} />
        </Suspense>
      </div>
    </div>
  );
}
