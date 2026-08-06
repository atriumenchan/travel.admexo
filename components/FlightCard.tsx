import { ExternalLink, Clock, ArrowRight, Minus } from "lucide-react";
import { FlightResult, getAirlineName, formatDuration } from "@/lib/travelpayouts";
import AirlineLogo from "@/components/AirlineLogo";
import { formatPrice, formatTime, formatDate } from "@/lib/utils";

interface FlightCardProps {
  flight: FlightResult;
  index: number;
}

export default function FlightCard({ flight, index }: FlightCardProps) {
  const isBest = index === 0;
  const stopsLabel =
    flight.transfers === 0
      ? "Nonstop"
      : flight.transfers === 1
      ? "1 stop"
      : `${flight.transfers} stops`;

  const sourceLabels: Record<string, string> = {
    priceline: "Priceline",
    "google-flights": "Google Flights",
    "google-flights2": "Google Flights",
  };
  const sourceLabel = flight.source ? sourceLabels[flight.source] ?? flight.source : null;

  return (
    <div className={`bg-white rounded-xl border ${isBest ? "border-brand-400 shadow-md" : "border-slate-200 shadow-sm"} p-4 sm:p-5 hover:shadow-md transition-shadow`}>
      {(isBest || sourceLabel) && (
        <div className="mb-3 flex items-center gap-2">
          {isBest && (
            <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Best value
            </span>
          )}
          {sourceLabel && (
            <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2 py-0.5 rounded-full">
              via {sourceLabel}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 w-full sm:w-40 shrink-0">
          <AirlineLogo code={flight.airline} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
              {flight.airline_name ?? getAirlineName(flight.airline)}
            </p>
            <p className="text-xs text-slate-400">{flight.airline}{flight.flight_number}</p>
          </div>
        </div>

        {/* Route / times */}
        <div className="flex-1 flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">{formatTime(flight.departure_at)}</p>
            <p className="text-xs text-slate-500">{flight.origin_airport || flight.origin}</p>
            <p className="text-xs text-slate-400">{formatDate(flight.departure_at)}</p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(flight.duration_to || flight.duration)}
            </p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-slate-300" />
              {flight.transfers === 0 ? (
                <ArrowRight className="w-3 h-3 text-slate-400" />
              ) : (
                <div className="flex gap-0.5">
                  {Array.from({ length: flight.transfers }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ))}
                </div>
              )}
              <div className="flex-1 h-px bg-slate-300" />
            </div>
            <p className={`text-xs font-medium ${flight.transfers === 0 ? "text-green-600" : "text-amber-600"}`}>
              {stopsLabel}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">
              {flight.return_at ? formatTime(flight.return_at) : <Minus className="w-4 h-4 text-slate-300 mx-auto" />}
            </p>
            <p className="text-xs text-slate-500">{flight.destination_airport || flight.destination}</p>
            {flight.return_at && <p className="text-xs text-slate-400">{formatDate(flight.return_at)}</p>}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto sm:ml-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{formatPrice(flight.price)}</p>
            <p className="text-xs text-slate-400">per person</p>
          </div>
          <a
            href={flight.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Book now
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
