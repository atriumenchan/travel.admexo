import { SITE_DISCLAIMER, SITE_NAME } from "@/lib/siteConfig";

interface SiteDisclaimerProps {
  /** Slightly tighter padding when nested inside another card/section. */
  compact?: boolean;
  className?: string;
}

export default function SiteDisclaimer({ compact = false, className = "" }: SiteDisclaimerProps) {
  return (
    <section
      aria-label={`${SITE_NAME} disclaimer`}
      className={`bg-slate-50 border-t border-slate-200 ${compact ? "py-6" : "py-10"} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-5xl">
          {SITE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
