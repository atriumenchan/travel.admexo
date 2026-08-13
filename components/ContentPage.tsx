import Link from "next/link";
import type { ReactNode } from "react";

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/** Shared marketing / legal page shell — hero band + readable content card. */
export default function ContentPage({ eyebrow, title, description, children }: ContentPageProps) {
  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-hero-gradient px-4 py-14 sm:py-16 text-center">
        {eyebrow && (
          <p className="text-accent-300 text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        {description && <p className="text-indigo-100/80 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>}
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
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
    <section className="mb-8 last:mb-0">
      <h2 className="text-lg font-bold text-slate-900 mb-3">{title}</h2>
      <div className="space-y-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}
