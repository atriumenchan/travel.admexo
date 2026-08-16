import Link from "next/link";
import {
  Phone,
  Plane,
  ChevronRight,
  Star,
  Heart,
} from "lucide-react";
import HideChromeOnMobile from "@/components/HideChromeOnMobile";
import {
  MOBILE_AIRLINE_LANDINGS,
  type AirlineSlug,
} from "@/lib/mobileAirlineLanding";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SITE_DISCLAIMER,
} from "@/lib/siteConfig";

function PhoneCta({
  label,
  accent,
  primaryDark,
  className = "",
}: {
  label: string;
  accent: string;
  primaryDark: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <a
        href={`tel:${SUPPORT_PHONE_TEL}`}
        className="flex items-center justify-center gap-2 text-white text-2xl font-bold tracking-tight"
      >
        <Phone className="w-6 h-6" style={{ color: accent }} />
        {SUPPORT_PHONE_DISPLAY}
      </a>
      <a
        href={`tel:${SUPPORT_PHONE_TEL}`}
        className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl font-bold text-sm py-3.5 transition-colors"
        style={{ backgroundColor: accent, color: primaryDark }}
      >
        <Phone className="w-4 h-4" />
        {label}
      </a>
    </div>
  );
}

function SouthwestLayout({ slug }: { slug: AirlineSlug }) {
  const config = MOBILE_AIRLINE_LANDINGS[slug];
  const { primary, primaryDark, accent } = config;

  return (
    <div className="bg-white text-slate-900">
      {/* Header */}
      <header className="px-4 pt-4 pb-3" style={{ backgroundColor: primaryDark }}>
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center gap-2 text-white font-bold">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: accent, color: primaryDark }}
            >
              <Plane className="w-4 h-4" />
            </span>
            {SITE_NAME}
          </Link>
          <span className="text-[11px] text-white/80 font-medium">24/7 Support</span>
        </div>

        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[11px] font-semibold px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            5 Agents Live
          </span>
        </div>

        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="flex items-center justify-center gap-2 w-full rounded-full font-extrabold text-xs tracking-wide py-3.5 mb-4 uppercase"
          style={{ backgroundColor: accent, color: primaryDark }}
        >
          <Phone className="w-4 h-4" />
          Speak to a Live Agent Now
        </a>

        <h1 className="text-2xl font-bold text-white text-center leading-tight mb-1">
          <span className="text-white">{SITE_NAME}</span>{" "}
          <span style={{ color: accent }}>{config.shortName}</span> Support
        </h1>
        <p className="text-center text-white/70 text-xs mb-3">{SITE_TAGLINE}</p>

        <div className="flex items-center justify-center gap-2 text-white/80 text-xs mb-4">
          <Heart className="w-3 h-3" style={{ color: accent }} fill="currentColor" />
          <span>{config.subheadline} Call for comparison help.</span>
          <Heart className="w-3 h-3" style={{ color: accent }} fill="currentColor" />
        </div>

        <div
          className="rounded-2xl border border-white/20 p-4 text-center"
          style={{ backgroundColor: `${primaryDark}cc` }}
        >
          <PhoneCta label={`Call Now — ${config.ctaLabel}`} accent={accent} primaryDark={primaryDark} />
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-white/70">
          {config.trustStrip.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1">
              <t.icon className="w-3 h-3" style={{ color: accent }} />
              {t.label}
            </span>
          ))}
        </div>
      </header>

      {/* Hero visual */}
      <div className="relative h-40 overflow-hidden" style={{ background: `linear-gradient(180deg, ${primaryDark} 0%, ${primary} 100%)` }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Plane className="w-32 h-32 text-white rotate-[-12deg]" />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{
            background: `linear-gradient(90deg, ${accent} 0%, #ef4444 50%, ${accent} 100%)`,
            clipPath: "ellipse(120% 100% at 50% 100%)",
          }}
        />
      </div>

      {/* Service grid */}
      <section className="px-4 py-8" style={{ backgroundColor: primary }}>
        <h2 className="text-white font-bold text-center mb-5">We&apos;re here to help with:</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {config.serviceGrid.map((item) => (
            <a
              key={item.label}
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="w-14 h-14 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-white" />
              </span>
              <span className="text-[11px] text-white/90 font-medium leading-tight">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="rounded-xl border border-white/25 bg-white/10 p-4 flex items-start gap-3">
          <Star className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} fill="currentColor" />
          <p className="text-sm text-white/95 leading-relaxed">
            Friendly agents. Fast answers. Real comparison help. Call{" "}
            <a href={`tel:${SUPPORT_PHONE_TEL}`} className="font-bold underline" style={{ color: accent }}>
              {SUPPORT_PHONE_DISPLAY}
            </a>{" "}
            now.
          </p>
        </div>

        <p className="text-[10px] text-white/60 text-center mt-4 leading-relaxed px-2">
          {SITE_NAME} is not {config.airlineName}. Airline names are used only to identify flights for comparison.
        </p>
      </section>

      {/* Help cards */}
      <section className="px-4 py-8 bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-1">How can we help you today?</h2>
        <p className="text-sm text-slate-500 mb-5">
          Get fast, reliable support for comparing {config.shortName} fares on {SITE_NAME}.
        </p>

        <div className="space-y-3">
          {config.helpCards.map((card) => (
            <a
              key={card.title}
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm ${card.tone}`}
            >
              <span className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <card.icon className="w-5 h-5 text-brand-600" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-slate-900">{card.title}</span>
                <span className="block text-xs text-slate-600 mt-0.5 leading-relaxed">{card.description}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 mt-2">
                  Call Now <ChevronRight className="w-3 h-3" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-8 bg-slate-50 border-y border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-5 text-center">How it works — it&apos;s easy as 1-2-3</h2>
        <ol className="space-y-4 mb-6">
          {[
            { n: "1", title: "Call us", body: `Dial ${SUPPORT_PHONE_DISPLAY} to reach a ${SITE_NAME} agent.` },
            { n: "2", title: "Get help", body: `Tell us what you need — we'll help you compare ${config.shortName} fares.` },
            { n: "3", title: "Book with the provider", body: "Complete your ticket on the airline or travel partner site." },
          ].map((step) => (
            <li key={step.n} className="flex gap-3">
              <span
                className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0"
                style={{ backgroundColor: primary }}
              >
                {step.n}
              </span>
              <div>
                <p className="font-bold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl text-white font-bold py-3.5"
          style={{ backgroundColor: primaryDark }}
        >
          <Phone className="w-4 h-4" />
          {SUPPORT_PHONE_DISPLAY}
        </a>
      </section>

      <LandingFooter primary={primary} primaryDark={primaryDark} accent={accent} ctaLabel={config.ctaLabel} />
    </div>
  );
}

function UnitedLayout({ slug }: { slug: AirlineSlug }) {
  const config = MOBILE_AIRLINE_LANDINGS[slug];
  const { primary, primaryDark, accent } = config;

  return (
    <div className="bg-white text-slate-900">
      {/* Top bar */}
      <div className="px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-white" style={{ backgroundColor: primaryDark }}>
        <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
        <span>
          Agents available now — Call{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="font-bold" style={{ color: accent }}>
            {SUPPORT_PHONE_DISPLAY}
          </a>
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${primary} 0%, #1e40af 55%, #3b82f6 100%)` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/30 blur-2xl" />
        </div>

        <div className="relative px-4 pt-5 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Support Center</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-100 text-[10px] font-semibold px-2 py-0.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                5 Agents Available
              </span>
            </div>
            <Link href="/" className="text-right">
              <p className="text-white font-bold text-lg leading-none">{SITE_NAME}</p>
              <p className="text-[10px] text-white/70 mt-0.5">{SITE_TAGLINE}</p>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-white leading-tight mb-2">{config.headline}</h1>
          <p className="text-sm text-white/85 leading-relaxed mb-4">{config.intro}</p>

          <div className="relative h-28 rounded-xl overflow-hidden mb-4 bg-white/10 border border-white/15">
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-full h-12 bg-white/20 blur-sm" />
              <Plane className="absolute top-4 w-20 h-20 text-white/40 rotate-[-8deg]" />
            </div>
          </div>
        </div>
      </section>

      {/* Phone CTA block */}
      <section className="px-4 py-5" style={{ backgroundColor: primaryDark }}>
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div className="p-4 text-center">
            <a
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="flex items-center justify-center gap-2 text-white text-2xl font-bold"
            >
              <Phone className="w-6 h-6" style={{ color: accent }} />
              {SUPPORT_PHONE_DISPLAY}
            </a>
          </div>
          <a
            href={`tel:${SUPPORT_PHONE_TEL}`}
            className="flex items-center justify-center gap-2 w-full font-bold text-sm py-3.5"
            style={{ backgroundColor: accent, color: primaryDark }}
          >
            Call Now — {config.ctaLabel}
          </a>
        </div>
      </section>

      {/* Trust icons */}
      <section className="px-3 py-4" style={{ backgroundColor: primary }}>
        <div className="grid grid-cols-4 gap-1 text-center">
          {config.serviceGrid.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 px-1">
              <item.icon className="w-5 h-5 text-white/90" />
              <span className="text-[10px] leading-tight text-white/80 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Help section */}
      <section className="px-4 py-8">
        <h2 className="text-xl font-bold mb-1" style={{ color: primaryDark }}>
          How can we help you today?
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Our team helps you compare {config.airlineName} fares on {SITE_NAME} — {SITE_TAGLINE.toLowerCase()}.
        </p>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {config.helpCards.map((card) => (
            <a
              key={card.title}
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className={`rounded-2xl border p-4 ${card.tone}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <card.icon className="w-4 h-4" />
                <span className="font-bold">{card.title}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{card.description}</p>
            </a>
          ))}
        </div>

        {config.listItems && (
          <div className="space-y-2 mb-6">
            {config.listItems.map((item) => (
              <a
                key={item.title}
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <span className={`w-10 h-10 rounded-full ${item.tone} flex items-center justify-center shrink-0`}>
                  <item.icon className="w-5 h-5 text-white" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-slate-900 text-sm">{item.title}</span>
                  <span className="block text-xs text-slate-500 leading-relaxed">{item.description}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        )}

        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="flex items-center gap-3 w-full rounded-2xl p-4 font-bold shadow-md"
          style={{ backgroundColor: accent, color: primaryDark }}
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: primaryDark }}
          >
            <Phone className="w-5 h-5 text-white" />
          </span>
          <span className="flex-1 text-left">
            <span className="block text-base">Call Now — {SUPPORT_PHONE_DISPLAY}</span>
            <span className="block text-xs font-medium opacity-80">{config.ctaLabel}</span>
          </span>
        </a>
      </section>

      {/* Footer trust strip */}
      <section className="px-4 py-5 grid grid-cols-3 gap-2 text-center" style={{ backgroundColor: primaryDark }}>
        {config.trustStrip.map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1.5">
            <t.icon className="w-5 h-5 text-white/80" />
            <span className="text-[10px] text-white/70 font-medium leading-tight">{t.label}</span>
          </div>
        ))}
      </section>

      <LandingFooter primary={primary} primaryDark={primaryDark} accent={accent} ctaLabel={config.ctaLabel} />
    </div>
  );
}

function LandingFooter({
  primary,
  primaryDark,
  accent,
  ctaLabel,
}: {
  primary: string;
  primaryDark: string;
  accent: string;
  ctaLabel: string;
}) {
  return (
    <>
      <section className="px-4 py-6" style={{ backgroundColor: primary }}>
        <div className="flex items-center gap-4">
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: accent, color: primaryDark }}
          >
            <Plane className="w-6 h-6" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">Need help? Call now.</p>
            <p className="text-white/80 text-xs leading-relaxed mt-0.5">
              Our {SITE_NAME} team is ready 24/7.{" "}
              <a href={`tel:${SUPPORT_PHONE_TEL}`} className="font-bold" style={{ color: accent }}>
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 text-white font-bold text-sm py-3.5"
        >
          <Phone className="w-4 h-4" />
          {ctaLabel}
        </a>
      </section>

      <section className="px-4 py-4 text-[10px] text-slate-500 leading-relaxed bg-slate-50">
        <p>{SITE_DISCLAIMER}</p>
      </section>

      <footer className="bg-slate-950 text-slate-500 text-xs px-4 py-6 text-center space-y-3">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. {SITE_TAGLINE}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-white transition-colors">
            Search flights
          </Link>
        </div>
      </footer>
    </>
  );
}

export default function MobileAirlineSupportLanding({ slug }: { slug: AirlineSlug }) {
  const config = MOBILE_AIRLINE_LANDINGS[slug];
  if (!config) return null;

  return (
    <div className="md:hidden">
      <HideChromeOnMobile />
      {config.variant === "southwest" ? <SouthwestLayout slug={slug} /> : <UnitedLayout slug={slug} />}
    </div>
  );
}
