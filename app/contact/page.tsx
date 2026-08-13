import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Wallet, Headset, ShieldCheck, Mail, Clock } from "lucide-react";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import { SITE_NAME, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL, SUPPORT_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_NAME}, an independent flight comparison platform. We're not an airline or travel agency — we help you compare fares.`,
};

const FEATURES = [
  { icon: Wallet, title: "Low fares", description: "We compare cheap flight tickets across hundreds of airlines and booking sites." },
  { icon: Headset, title: "Friendly support", description: "Our team can help you find and compare fares — reach out any time." },
  { icon: ShieldCheck, title: "Honest process", description: "No hidden fees or markups. Bookings are always completed on the airline or OTA's site." },
];

const SUPPORT_LINE_NOTE = `This line is here to help you compare fares and use ${SITE_NAME} — if you need help with an existing booking, please contact the airline or agency you booked with directly.`;

export default function ContactPage() {
  return (
    <>
      {/* ------------------------------------------------------------------
          Mobile view — a full-bleed graphic-style page, shown below the md
          breakpoint. Built as real HTML/CSS rather than a static image so
          the phone number (currently a placeholder — see lib/siteConfig.ts)
          can be updated in one place later without regenerating an asset.
      ------------------------------------------------------------------- */}
      <div className="md:hidden">
        <section className="relative bg-hero-gradient overflow-hidden">
          <div className="relative h-64">
            <Image src="/support/support-plane.jpg" alt="" fill className="object-cover opacity-70" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/70 to-brand-950" />
          </div>

          <div className="relative -mt-24 px-6 pb-10 text-center">
            <span className="inline-block text-accent-300 text-xs font-bold uppercase tracking-widest mb-3">
              {SITE_NAME} Support
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight mb-4">
              Need Help With
              <br />
              Your Flight Search?
            </h1>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/85 max-w-xs mx-auto mb-8 text-left">
              <span>✓ Compare fares</span>
              <span>✓ Domestic &amp; international</span>
              <span>✓ Friendly support</span>
              <span>✓ Available 24/7</span>
            </div>

            <a
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="inline-flex items-center gap-2 bg-brand-gradient text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-glow hover:brightness-110 transition-all active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" />
              Call {SUPPORT_PHONE_DISPLAY}
            </a>
            <p className="text-white/50 text-xs mt-3">Tap to call · No wait time</p>
          </div>
        </section>

        <section className="px-6 py-10 space-y-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-slate-900">{f.title}</p>
                <p className="text-sm text-slate-500">{f.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-brand-50 px-6 py-8 text-center">
          <h2 className="font-bold text-slate-900 text-lg mb-2">Contact us</h2>
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="flex items-center justify-center gap-2 text-brand-700 font-semibold">
            <Phone className="w-4 h-4" /> {SUPPORT_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center justify-center gap-2 text-brand-700 font-semibold mt-2">
            <Mail className="w-4 h-4" /> {SUPPORT_EMAIL}
          </a>
        </section>

        <section className="px-6 py-6 text-xs text-slate-500 leading-relaxed">
          <p>{SUPPORT_LINE_NOTE}</p>
        </section>

        <div className="bg-slate-950 text-slate-500 text-xs px-6 py-6 text-center space-y-2 md:hidden">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          Desktop view — a standard contact page, shown at md and up.
      ------------------------------------------------------------------- */}
      <div className="hidden md:block bg-surface">
        <section className="bg-hero-gradient px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-indigo-100/80">Search, Compare &amp; Save!</p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="rounded-[24px] bg-white border border-slate-100 shadow-card p-10">
            <p className="text-slate-600 leading-relaxed mb-4">
              {SITE_NAME} is an independent travel comparison website that helps you easily find and compare the
              best available flight fares from hundreds of airlines and booking sites.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              As frequent travelers ourselves, we understand how time-consuming it can be to search across
              different sites for the lowest fares. Our platform was built to simplify that process, saving you
              both time and money when planning your trips.
            </p>
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800 mb-8">
              <strong>Note:</strong> We are not an airline or a travel agency and do not sell tickets directly. If
              you need assistance with an existing booking, please contact the provider you booked with.
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-600" /> General inquiries
                </h3>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" /> Availability
                </h3>
                <p className="text-slate-600">24/7 — we typically respond within one business day.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6 text-center">
              <p className="font-semibold text-slate-900 mb-2">Need help comparing fares? Our team is available 24/7 at:</p>
              <a href={`tel:${SUPPORT_PHONE_TEL}`} className="inline-flex items-center gap-2 text-2xl font-bold text-brand-700">
                <Phone className="w-5 h-5" /> {SUPPORT_PHONE_DISPLAY}
              </a>
            </div>

            <p className="text-xs text-slate-400 mt-8 leading-relaxed">{SUPPORT_LINE_NOTE}</p>
          </div>
        </section>
      </div>

      <SiteDisclaimer />
    </>
  );
}
