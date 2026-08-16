import Link from "next/link";
import type { ReactNode } from "react";

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
}

/** Shared marketing / legal page shell — hero band + readable content card. */
export default function ContentPage({ eyebrow, title, description, children, wide }: ContentPageProps) {
  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-hero-gradient px-4 py-14 sm:py-16 text-center">
        {eyebrow && (
          <p className="text-accent-300 text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        {description && <p className="text-indigo-100/80 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>}
      </section>

      <section className={`${wide ? "max-w-4xl" : "max-w-3xl"} mx-auto px-4 py-12 sm:py-16`}>
        <div className="rounded-[24px] bg-white border border-slate-100 shadow-card p-6 sm:p-10 prose-skylerb">
          {children}
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">
          <Link href="/" className="text-brand-600 hover:underline font-medium">
            ← Back to search
          </Link>
        </p>
      </section>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
      <div className="space-y-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

export function Faq({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
      <h3 className="font-bold text-slate-900 mb-2">{question}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 not-prose">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3">
          <span className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm sm:text-[15px] text-slate-600 leading-relaxed pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Callout({ title, children, tone = "info" }: { title?: string; children: ReactNode; tone?: "info" | "warn" }) {
  const styles =
    tone === "warn"
      ? "bg-amber-50 border-amber-100 text-amber-900"
      : "bg-brand-50 border-brand-100 text-brand-950";
  return (
    <div className={`rounded-xl border p-4 sm:p-5 not-prose ${styles}`}>
      {title && <p className="font-bold mb-2">{title}</p>}
      <div className="text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 marker:text-brand-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
