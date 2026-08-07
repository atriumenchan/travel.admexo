"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-12", align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl", className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-bold uppercase tracking-[0.18em] mb-3",
            light ? "text-accent-300" : "text-brand-600"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold tracking-tight leading-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg leading-relaxed", light ? "text-slate-300" : "text-slate-500")}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
