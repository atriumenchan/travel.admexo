// ---------------------------------------------------------------------------
// Shared contract every flight-search provider must implement so the
// aggregator can call all of them the same way and merge their results.
// ---------------------------------------------------------------------------

export interface ProviderSearchParams {
  origin: string;
  destination: string;
  departDate: string; // YYYY-MM-DD
  returnDate?: string;
  passengers?: number;
  tripType?: "round" | "one-way";
}

export interface NormalizedFlight {
  id: string;
  source: string; // provider id, e.g. "priceline" | "google-flights"
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  airline_name?: string;
  flight_number: string;
  departure_at: string;
  return_at: string | null; // arrival time of the last leg (see FlightCard for why)
  transfers: number;
  return_transfers: number;
  duration: number;
  duration_to: number;
  duration_back: number;
}

export interface FlightProvider {
  id: string;
  label: string;
  /** Whether at least one API key is configured for this provider. */
  isConfigured(): boolean;
  search(params: ProviderSearchParams): Promise<NormalizedFlight[]>;
}
