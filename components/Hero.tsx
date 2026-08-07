"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import TravelpayoutsWidget from "@/components/TravelpayoutsWidget";
import { cn } from "@/lib/utils";

const CHIPS = [
  { emoji: "🇬🇧", label: "London", price: "$412" },
  { emoji: "🇯🇵", label: "Tokyo", price: "$780" },
  { emoji: "🇦🇪", label: "Dubai", price: "$649" },
  { emoji: "🇪🇸", label: "Barcelona", price: "$289" },
];

interface HeroProps {
  hasSearch: boolean;
}

export default function Hero({ hasSearch }: HeroProps) {
  return (
    <section
      className={cn(
        // Deliberately a *static* gradient, not animated — animating this
        // gradient's position shifted it into much lighter color ranges at
        // some phases, which tanked contrast for the white headline text on
        // top. Motion instead comes from the floating orbs/chips below,
        // which don't affect the base background's darkness.
        "relative overflow-hidden bg-hero-gradient",
        hasSearch ? "pt-8 pb-10 sm:pt-10 sm:pb-12" : "pt-20 pb-16 sm:pt-28 sm:pb-24"
      )}
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-brand-500/40 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full bg-accent-400/30 blur-[110px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-violet-500/20 blur-[100px]"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Subtle flight path */}
      {!hasSearch && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M -50 480 C 250 380, 500 550, 750 300 S 1150 120, 1300 60"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* Noise grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
        {!hasSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl"
          >
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Plane className="w-3.5 h-3.5 text-accent-300" />
              <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
                Flight Metasearch, Reimagined
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Find The Best Flights,
              <br />
              <span className="text-gradient">Not Just The Cheapest.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-indigo-100/80 max-w-xl mx-auto leading-relaxed">
              Compare 700+ airlines and booking sites in seconds. No hidden fees. No markups. No nonsense.
            </p>
          </motion.div>
        )}

        {/* Search widget frame */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: hasSearch ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-7xl relative"
        >
          <div className="rounded-[28px] p-[1.5px] bg-gradient-to-br from-white/40 via-white/10 to-accent-300/30 shadow-glow">
            <div className="rounded-[27px] glass p-1.5 sm:p-2">
              <TravelpayoutsWidget hasSearch={hasSearch} />
            </div>
          </div>
        </motion.div>

        {!hasSearch && (
          <>
            {/* Floating destination chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {CHIPS.map((chip, i) => (
                <motion.span
                  key={chip.label}
                  className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white/90"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <span>{chip.emoji}</span>
                  <span className="font-medium">{chip.label}</span>
                  <span className="text-accent-300 font-semibold">{chip.price}</span>
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-indigo-100/70 text-sm">
              <span>No booking fees</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>Lowest prices guaranteed</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>700+ airlines compared</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
