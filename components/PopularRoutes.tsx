import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PopularRoute, POPULAR_DESTINATIONS, FALLBACK_POPULAR_ROUTES, getAirlineName, buildWidgetSearchPath } from "@/lib/travelpayouts";
import { formatPrice } from "@/lib/utils";

interface PopularRoutesProps {
  routes: PopularRoute[];
}

const DEST_COLORS: Record<string, string> = {
  london: "from-blue-600 to-blue-800",
  paris: "from-pink-500 to-rose-700",
  dubai: "from-amber-500 to-orange-700",
  tokyo: "from-red-500 to-rose-700",
  singapore: "from-emerald-500 to-teal-700",
  barcelona: "from-yellow-500 to-orange-600",
  bangkok: "from-purple-500 to-indigo-700",
  sydney: "from-cyan-500 to-blue-700",
  "são paulo": "from-green-500 to-emerald-700",
};

function getGradient(city: string): string {
  return DEST_COLORS[city.toLowerCase()] ?? "from-slate-600 to-slate-800";
}

export default function PopularRoutes({ routes }: PopularRoutesProps) {
  const displayRoutes = routes.length > 0 ? routes : FALLBACK_POPULAR_ROUTES;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayRoutes.slice(0, 9).map((route) => {
        const dest = POPULAR_DESTINATIONS.find((d) => d.code === route.destination);
        const city = dest?.city ?? route.destination;
        const country = dest?.country ?? "";
        const emoji = dest?.emoji ?? "✈️";
        const gradient = getGradient(city);

        return (
          <div key={route.destination} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className={`bg-gradient-to-br ${gradient} aspect-[3/2] flex flex-col justify-between p-5`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{emoji}</span>
                  <p className="text-white font-bold text-xl mt-1">{city}</p>
                  <p className="text-white/70 text-sm">{country}</p>
                </div>
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {route.transfers === 0 ? "Nonstop" : `${route.transfers} stop`}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs mb-0.5">From New York</p>
                  <p className="text-white font-bold text-2xl">{formatPrice(route.price)}</p>
                  <p className="text-white/60 text-xs">{getAirlineName(route.airline)}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={buildWidgetSearchPath(route.origin || "JFK", route.destination, route.departure_at)}
                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                    title="View flights"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={route.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-white text-slate-800 hover:bg-slate-100 p-2 rounded-lg transition-colors"
                    title="Book now"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
