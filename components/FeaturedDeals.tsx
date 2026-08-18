"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_DEALS } from "@/lib/mockContent";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";
import { formatPrice } from "@/lib/utils";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisitorOrigin } from "@/lib/geoOrigin";
import { FALLBACK_ORIGIN } from "@/lib/geoOrigin";

const TAG_STYLES: Record<string, string> = {
  "Flash Sale": "bg-rose-500 text-white",
  "Weekend Escape": "bg-brand-600 text-white",
  "Hidden Gem": "bg-emerald-600 text-white",
  "Business Class": "bg-slate-900 text-white",
  Luxury: "bg-amber-500 text-white",
};

export default function FeaturedDeals({ origin = FALLBACK_ORIGIN }: { origin?: VisitorOrigin }) {
  return (
    <section id="deals" className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Today's Best Deals"
        title="Prices this good don't last"
        description={`A rotating mix of flash sales, weekend escapes, and business-class fares from ${origin.city} — worth booking before they're gone.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_DEALS.filter((deal) => deal.code !== origin.code).map((deal, idx) => {
          const savings = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
          return (
            <motion.a
              key={deal.id}
              href={buildWidgetSearchPath(origin.code, deal.code)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-[24px] bg-white shadow-card hover:shadow-card-hover transition-shadow duration-500 block"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.city}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${TAG_STYLES[deal.tag]}`}>
                  {deal.tag}
                </span>
                <Badge variant="glass" className="absolute top-3 right-3 !text-white">
                  <CountdownTimer hoursFromNow={deal.endsInHours} />
                </Badge>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-lg">
                      {origin.city} → {deal.city}
                    </p>
                    <p className="text-white/60 text-xs">{deal.country}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-400 text-sm line-through">{formatPrice(deal.originalPrice)}</span>
                    <span className="text-emerald-600 text-xs font-bold">-{savings}%</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatPrice(deal.price)}</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-brand-600 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
