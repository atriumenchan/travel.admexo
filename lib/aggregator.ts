import { buildAviasalesSearchLink, type FlightResult } from "@/lib/travelpayouts";
import { pricelineProvider } from "@/lib/providers/priceline";
import { serpApiProvider } from "@/lib/providers/serpapi";
import type { FlightProvider, NormalizedFlight, ProviderSearchParams } from "@/lib/providers/types";

// Add more providers here as new API keys/subscriptions are wired in.
const PROVIDERS: FlightProvider[] = [pricelineProvider, serpApiProvider];

// Generous enough for a provider's own internal retry/backoff loop (e.g.
// Priceline's flaky upstream scraper) to actually finish, while still
// leaving headroom under the page's overall maxDuration.
const PROVIDER_TIMEOUT_MS = 35_000;

export interface ProviderStatus {
  id: string;
  label: string;
  ok: boolean;
  count: number;
  error?: string;
}

export interface AggregatedSearchResult {
  flights: FlightResult[];
  sources: ProviderStatus[];
}

/**
 * Two flights are treated as the same real-world flight (and merged into
 * one) if they share an airline + flight number + departure minute. When
 * duplicates are found across providers, the cheapest price wins.
 */
function dedupeKey(f: NormalizedFlight): string {
  const departMinute = f.departure_at ? f.departure_at.slice(0, 16) : "";
  return `${f.airline}${f.flight_number}-${departMinute}`;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Provider timed out")), ms)),
  ]);
}

/**
 * Fans out to every configured flight-search provider in parallel, merges
 * and de-duplicates the results, and returns the combined list along with
 * a per-provider status report (used to show "Live from N sources" and to
 * gracefully degrade when some providers fail or aren't configured).
 */
export async function searchAllProviders(params: ProviderSearchParams): Promise<AggregatedSearchResult> {
  const active = PROVIDERS.filter((p) => p.isConfigured());
  const sources: ProviderStatus[] = [];

  const settled = await Promise.allSettled(
    active.map((p) => withTimeout(p.search(params), PROVIDER_TIMEOUT_MS))
  );

  const best = new Map<string, NormalizedFlight>();

  settled.forEach((result, i) => {
    const provider = active[i];
    if (result.status === "fulfilled") {
      sources.push({ id: provider.id, label: provider.label, ok: true, count: result.value.length });
      for (const flight of result.value) {
        const key = dedupeKey(flight);
        const existing = best.get(key);
        if (!existing || flight.price < existing.price) best.set(key, flight);
      }
    } else {
      const reason = result.reason;
      sources.push({
        id: provider.id,
        label: provider.label,
        ok: false,
        count: 0,
        error: reason instanceof Error ? reason.message : String(reason),
      });
    }
  });

  const flights: FlightResult[] = Array.from(best.values()).map((f) => ({
    origin: f.origin,
    destination: f.destination,
    origin_airport: f.origin_airport,
    destination_airport: f.destination_airport,
    price: f.price,
    airline: f.airline,
    airline_name: f.airline_name,
    flight_number: f.flight_number,
    departure_at: f.departure_at,
    return_at: f.return_at,
    transfers: f.transfers,
    return_transfers: f.return_transfers,
    duration: f.duration,
    duration_to: f.duration_to,
    duration_back: f.duration_back,
    link: buildAviasalesSearchLink(
      f.origin,
      f.destination,
      params.departDate,
      params.tripType === "round" ? params.returnDate : undefined,
      params.passengers ?? 1
    ),
    source: f.source,
  }));

  return { flights, sources };
}
