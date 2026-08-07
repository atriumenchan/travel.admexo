"use client";

import { motion } from "framer-motion";
import { Plane, Search, ShieldCheck, Globe2 } from "lucide-react";
import { TRUST_STATS } from "@/lib/mockContent";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const ICONS = [Plane, Search, ShieldCheck, Globe2];

export default function TrustSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TRUST_STATS.map((stat, idx) => {
          const Icon = ICONS[idx];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-[24px] bg-white border border-slate-100 shadow-card p-6 flex flex-col gap-3"
            >
              <span className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
