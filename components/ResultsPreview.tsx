"use client";

import { motion } from "framer-motion";
import { Clock, Luggage, Leaf, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { RESULTS_PREVIEW, RESULTS_PREVIEW_ROUTE } from "@/lib/mockContent";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

const BADGE_STYLE: Record<string, "success" | "brand" | "accent"> = {
  Cheapest: "success",
  "Best value": "brand",
  Fastest: "accent",
};

export default function ResultsPreview() {
  const searchHref = buildWidgetSearchPath(RESULTS_PREVIEW_ROUTE.origin, RESULTS_PREVIEW_ROUTE.destination);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="See It In Action"
        title="Every result, fully transparent"
        description="Emissions, baggage allowance, refund policy, and a rating for every fare — not just a price."
      />

      <div className="space-y-3">
        {RESULTS_PREVIEW.map((flight, idx) => (
          <motion.a
            key={flight.airline}
            href={searchHref}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            className="group bg-white rounded-[20px] border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 block"
            title="Search this route for live prices"
          >
            <div className="flex items-center gap-3 w-full sm:w-44 shrink-0">
              <span className="w-11 h-11 rounded-xl bg-brand-gradient text-white font-bold text-xs flex items-center justify-center shadow-md shadow-brand-600/20">
                {flight.logoInitial}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{flight.airline}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-slate-500">{flight.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {flight.duration} · {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                {flight.co2Percent <= 0 ? `${Math.abs(flight.co2Percent)}% less CO₂` : `${flight.co2Percent}% more CO₂`}
              </span>
              <span className="flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5" /> {flight.baggage}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> {flight.refundable ? "Refundable" : "Non-refundable"}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:ml-auto">
              {flight.badge && <Badge variant={BADGE_STYLE[flight.badge]}>{flight.badge}</Badge>}
              <p className="text-2xl font-bold text-slate-900 tracking-tight w-20 text-right">${flight.price}</p>
              <span className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-brand-600 flex items-center justify-center transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-6">
        Example results shown for illustration — click any card to search live prices for this route.
      </p>
    </section>
  );
}
