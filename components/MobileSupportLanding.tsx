import Link from "next/link";
import Image from "next/image";
import HideChromeOnMobile from "@/components/HideChromeOnMobile";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Headset,
  ShieldCheck,
  Zap,
  Search,
  HelpCircle,
  Plane,
  ChevronRight,
  Users,
} from "lucide-react";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SUPPORT_EMAIL,
  OFFICE_ADDRESS_LINES,
  SITE_DISCLAIMER,
} from "@/lib/siteConfig";

const TRUST = [
  { icon: Clock, label: "24/7 Available" },
  { icon: Users, label: "Live Agents" },
  { icon: ShieldCheck, label: "Independent Support" },
  { icon: Zap, label: "Fast Help" },
];

const HELP_ITEMS = [
  {
    title: "Compare fares",
    description: `Get help searching routes and comparing flight options on ${SITE_NAME}.`,
    icon: Search,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: `Using ${SITE_NAME}`,
    description: "Questions about results, redirects, or how booking works on partner sites.",
    icon: HelpCircle,
    tone: "bg-brand-50 text-brand-700 border-brand-100",
  },
  {
    title: "Existing booking",
    description: "For changes, cancellations, or refunds, contact the airline or agency on your confirmation.",
    icon: Plane,
    tone: "bg-amber-50 text-amber-800 border-amber-100",
  },
];

/** Mobile-only Skylerb support landing — call-focused, clearly independent. */
export default function MobileSupportLanding() {
  return (
    <div className="md:hidden bg-white text-slate-900">
      <HideChromeOnMobile />
      {/* Top availability bar */}
      <div className="bg-brand-950 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-medium">
        <Phone className="w-3.5 h-3.5 text-accent-300" />
        <span>
          Agents available — Call{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-accent-300 font-bold underline-offset-2">
            {SUPPORT_PHONE_DISPLAY}
          </a>
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="relative h-44">
          <Image
            src="/support/support-plane.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/25 via-brand-950/55 to-brand-950" />
        </div>

        <div className="relative -mt-16 px-5 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-accent-300 text-[11px] font-bold uppercase tracking-widest">Support Center</p>
              <p className="text-white font-bold text-lg leading-tight">{SITE_NAME}</p>
              <p className="text-indigo-200/90 text-[11px] font-medium mt-0.5">{SITE_TAGLINE}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[11px] font-semibold px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Agents available
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white leading-tight mb-2">
            Flight comparison help from {SITE_NAME}
          </h1>
          <p className="text-indigo-100/85 text-sm leading-relaxed mb-5">
            Our team can help you use {SITE_NAME} to search and compare fares. We are an independent metasearch —
            not an airline reservation desk.
          </p>

          <div className="rounded-2xl bg-brand-950/80 border border-white/15 p-4 text-center shadow-xl backdrop-blur-sm">
            <a
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="flex items-center justify-center gap-2 text-white text-2xl font-bold tracking-tight"
            >
              <Phone className="w-6 h-6 text-accent-300" />
              {SUPPORT_PHONE_DISPLAY}
            </a>
            <a
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-bold text-sm py-3.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now — Speak to {SITE_NAME}
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-900 px-3 py-4">
        <div className="grid grid-cols-4 gap-1 text-center">
          {TRUST.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-1.5 px-1">
              <t.icon className="w-5 h-5 text-accent-300" />
              <span className="text-[10px] leading-tight text-indigo-100/90 font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How can we help */}
      <section className="px-5 py-8">
        <h2 className="text-xl font-bold text-brand-950 mb-1">How can we help you today?</h2>
        <p className="text-sm text-slate-500 mb-5">Tap a topic, then call our team.</p>

        <div className="space-y-3">
          {HELP_ITEMS.map((item) => (
            <a
              key={item.title}
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${item.tone}`}
            >
              <span className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-slate-900">{item.title}</span>
                <span className="block text-xs text-slate-600 mt-0.5 leading-relaxed">{item.description}</span>
              </span>
              <ChevronRight className="w-4 h-4 mt-1 shrink-0 opacity-60" />
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-8 bg-slate-50 border-y border-slate-100">
        <h2 className="text-xl font-bold text-brand-950 mb-5">How it works</h2>
        <ol className="space-y-4">
          {[
            { n: "1", title: "Call us", body: `Dial ${SUPPORT_PHONE_DISPLAY} to reach a ${SITE_NAME} agent.` },
            {
              n: "2",
              title: "Tell us what you need",
              body: "Help comparing fares, using search, or understanding how booking redirects work.",
            },
            {
              n: "3",
              title: "Book with the provider",
              body: "Tickets are completed on the airline or travel site — we don’t issue tickets ourselves.",
            },
          ].map((step) => (
            <li key={step.n} className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {step.n}
              </span>
              <div>
                <p className="font-bold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact details */}
      <section className="px-5 py-8 space-y-4">
        <h2 className="text-xl font-bold text-brand-950">Contact details</h2>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <Mail className="w-5 h-5 text-brand-600" />
          <span className="font-semibold text-brand-700">{SUPPORT_EMAIL}</span>
        </a>
        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <Phone className="w-5 h-5 text-brand-600" />
          <span className="font-semibold text-brand-700">{SUPPORT_PHONE_DISPLAY}</span>
        </a>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm text-sm text-slate-600">
          <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <span>
            {OFFICE_ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-8">
        <div className="rounded-2xl bg-hero-gradient p-5 text-center text-white">
          <Headset className="w-8 h-8 mx-auto mb-2 text-accent-300" />
          <p className="font-bold text-lg mb-1">Need help? Call {SITE_NAME}</p>
          <p className="text-accent-300 text-xs font-semibold mb-1">{SITE_TAGLINE}</p>
          <p className="text-indigo-100/85 text-sm mb-4">Independent flight comparison support — not an airline.</p>
          <a
            href={`tel:${SUPPORT_PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-accent-400 text-brand-950 font-bold py-3.5"
          >
            <Phone className="w-4 h-4" />
            Call {SUPPORT_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="px-5 pb-6 text-[11px] text-slate-500 leading-relaxed">
        <p>{SITE_DISCLAIMER}</p>
      </section>

      <footer className="bg-slate-950 text-slate-500 text-xs px-5 py-6 text-center space-y-3">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span>·</span>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-white transition-colors">
            Search flights
          </Link>
        </div>
      </footer>
    </div>
  );
}
