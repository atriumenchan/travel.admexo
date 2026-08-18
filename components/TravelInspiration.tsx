"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TRAVEL_INSPIRATION } from "@/lib/mockContent";
import { buildWidgetSearchPath, POPULAR_DESTINATIONS } from "@/lib/travelpayouts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisitorOrigin } from "@/lib/geoOrigin";
import { FALLBACK_ORIGIN } from "@/lib/geoOrigin";

export default function TravelInspiration({ origin = FALLBACK_ORIGIN }: { origin?: VisitorOrigin }) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Travel Inspiration"
        title="Not sure where to go?"
        description="Editorial picks across weekend ideas, luxury escapes, and everything in between."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TRAVEL_INSPIRATION.filter((card) => card.code !== origin.code).map((card, idx) => {
          const destCity = POPULAR_DESTINATIONS.find((d) => d.code === card.code)?.city ?? card.code;
          return (
            <motion.a
              key={card.title}
              href={buildWidgetSearchPath(origin.code, card.code)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[28px] shadow-card hover:shadow-card-hover transition-shadow duration-500 block"
              title={`Search flights from ${origin.city} to ${destCity}`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <span className="text-accent-300 text-xs font-bold uppercase tracking-widest mb-2">{card.tag}</span>
                  <p className="text-white/70 text-xs font-semibold mb-1">
                    {origin.city} → {destCity}
                  </p>
                  <h3 className="text-white text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/70 text-sm max-w-md mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
