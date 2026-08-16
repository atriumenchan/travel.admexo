"use client";

import { motion } from "framer-motion";
import { Zap, Bell, CalendarRange, Sparkles, BadgeDollarSign, BrainCircuit } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/mockContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/siteConfig";

const ICONS = [Zap, Bell, CalendarRange, Sparkles, BadgeDollarSign, BrainCircuit];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow={`Why ${SITE_NAME}`}
        title="Built for people who fly often"
        description="Every detail is designed around getting you the right flight, not just any flight."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_CHOOSE_US.map((item, idx) => {
          const Icon = ICONS[idx];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              className="group rounded-[24px] bg-white border border-slate-100 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
