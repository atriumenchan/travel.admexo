"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Thermometer, Clock, TrendingDown } from "lucide-react";
import { PopularRoute, POPULAR_DESTINATIONS, FALLBACK_POPULAR_ROUTES, getAirlineName, buildWidgetSearchPath } from "@/lib/travelpayouts";
import { DESTINATION_DETAILS } from "@/lib/mockContent";
import { formatPrice } from "@/lib/utils";

interface PopularRoutesProps {
  routes: PopularRoute[];
}

export default function PopularRoutes({ routes }: PopularRoutesProps) {
  const displayRoutes = routes.length > 0 ? routes : FALLBACK_POPULAR_ROUTES;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayRoutes.slice(0, 9).map((route, idx) => {
        const dest = POPULAR_DESTINATIONS.find((d) => d.code === route.destination);
        const detail = DESTINATION_DETAILS[route.destination];
        const city = dest?.city ?? route.destination;
        const country = dest?.country ?? "";
        const emoji = dest?.emoji ?? "✈️";
        const searchHref = buildWidgetSearchPath(route.origin || "JFK", route.destination, route.departure_at);

        return (
          <motion.a
            key={route.destination}
            href={searchHref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-[24px] shadow-card hover:shadow-card-hover transition-shadow duration-500 block"
            title={`Search flights to ${city}`}
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4]">
              {detail && (
                <Image
                  src={detail.image}
                  alt={city}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/0 via-transparent to-accent-500/0 group-hover:from-brand-600/15 group-hover:to-accent-500/15 transition-colors duration-500" />

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <span className="glass text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="text-base leading-none">{emoji}</span>
                  {route.destination}
                </span>
                {detail && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-900/30">
                    <TrendingDown className="w-3 h-3" />
                    {detail.savingsPercent}% off
                  </span>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-white font-bold text-2xl leading-tight">{city}</p>
                <p className="text-white/60 text-xs mb-3">{country}</p>

                {detail && (
                  <div className="flex items-center gap-3 text-white/80 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" /> {detail.tempC}°C
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {detail.duration}
                    </span>
                  </div>
                )}

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/50 text-[11px] mb-0.5">From New York · {getAirlineName(route.airline)}</p>
                    <p className="text-white font-bold text-3xl tracking-tight">{formatPrice(route.price)}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-all group-hover:scale-105">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
