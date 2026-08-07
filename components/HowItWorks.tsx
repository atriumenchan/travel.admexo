"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, CreditCard } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    description: "Enter your origin, destination, and dates. We query hundreds of airlines and booking sites in parallel.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare",
    description: "See every option sorted by price, duration, or best value — filter by stops, airline, or time of day.",
  },
  {
    icon: CreditCard,
    title: "Book",
    description: "Click through to the airline or OTA directly and complete your booking at the price we showed you.",
  },
];

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="relative flex flex-col items-center text-center group"
          >
            <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-white shadow-card border border-slate-100 flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-brand-200">
              <span className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center">
                <step.icon className="w-5 h-5 text-white" />
              </span>
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                {idx + 1}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
