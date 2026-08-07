"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mockContent";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeading eyebrow="Loved By Travelers" title="What people are saying" />

      <div className="relative rounded-[28px] bg-white border border-slate-100 shadow-card p-8 sm:p-12">
        <Quote className="w-10 h-10 text-brand-100 absolute top-6 left-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed max-w-2xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-full bg-brand-gradient text-white font-bold flex items-center justify-center">
                {t.initials}
              </span>
              <div className="text-left">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">
                  {t.location} · Flew to {t.destination}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-400 hover:text-brand-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-brand-600" : "w-1.5 bg-slate-200"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-400 hover:text-brand-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
