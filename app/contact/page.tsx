import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import {
  SITE_NAME,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SUPPORT_EMAIL,
  OFFICE_ADDRESS_LINES,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME}, an independent travel-comparison website. We do not sell tickets directly.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Mobile — call-focused Skylerb support (not an airline desk) */}
      <div className="md:hidden">
        <section className="relative bg-hero-gradient overflow-hidden">
          <div className="relative h-56">
            <Image src="/support/support-plane.jpg" alt="" fill className="object-cover opacity-70" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/70 to-brand-950" />
          </div>

          <div className="relative -mt-20 px-6 pb-10 text-center">
            <span className="inline-block text-accent-300 text-xs font-bold uppercase tracking-widest mb-3">
              {SITE_NAME} Support
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">Contact Us</h1>
            <p className="text-indigo-100/85 text-sm mb-6 max-w-sm mx-auto">
              Need help using {SITE_NAME} to compare fares? Reach our team below.
            </p>

            <a
              href={`tel:${SUPPORT_PHONE_TEL}`}
              className="inline-flex items-center gap-2 bg-brand-gradient text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-glow hover:brightness-110 transition-all active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" />
              Call {SUPPORT_PHONE_DISPLAY}
            </a>
            <p className="text-white/50 text-xs mt-3">Tap to call</p>
          </div>
        </section>

        <section className="px-6 py-8 space-y-5 text-sm text-slate-600 leading-relaxed">
          <p>
            {SITE_NAME}.com is an independent travel-comparison website that helps travelers easily find and compare
            available flight deals.
          </p>
          <p>
            <strong className="text-slate-900">Please note:</strong> {SITE_NAME} is not an airline or travel agency
            and does not sell or issue tickets directly. If you need help with an existing booking, cancellation,
            payment, refund, or schedule change, contact the travel provider you booked with.
          </p>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-3">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 text-brand-700 font-semibold">
              <Mail className="w-4 h-4" /> {SUPPORT_EMAIL}
            </a>
            <a href={`tel:${SUPPORT_PHONE_TEL}`} className="flex items-center gap-2 text-brand-700 font-semibold">
              <Phone className="w-4 h-4" /> {SUPPORT_PHONE_DISPLAY}
            </a>
            <div className="flex items-start gap-2 text-slate-600">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-600" />
              <span>
                {OFFICE_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </section>

        <div className="bg-slate-950 text-slate-500 text-xs px-6 py-6 text-center space-y-2">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-surface">
        <section className="bg-hero-gradient px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-indigo-100/80">Search, Compare &amp; Save!</p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="rounded-[24px] bg-white border border-slate-100 shadow-card p-10">
            <p className="text-slate-600 leading-relaxed mb-4">
              {SITE_NAME}.com is an independent travel-comparison website that helps travelers easily find and
              compare available flight deals.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              As frequent travelers ourselves, we understand how time-consuming it can be to search across multiple
              websites for suitable fares. {SITE_NAME} was created to simplify this process, helping you save time
              and make more informed travel decisions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whether you are traveling for business or leisure, our goal is to make flight comparison easier so
              you can focus on enjoying your journey.
            </p>

            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800 mb-8">
              <strong>Please note:</strong> {SITE_NAME} is not an airline or travel agency and does not sell or
              issue tickets directly. If you need assistance with an existing booking, cancellation, payment,
              refund, or schedule change, please contact the travel provider with whom you completed your booking.
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-600" /> Email
                </h3>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" /> Call
                </h3>
                <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 mb-8">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> Office Address
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {OFFICE_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6 text-center">
              <p className="font-semibold text-slate-900 mb-2">
                Need help using {SITE_NAME} to compare fares? Contact us at:
              </p>
              <a
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="inline-flex items-center gap-2 text-2xl font-bold text-brand-700"
              >
                <Phone className="w-5 h-5" /> {SUPPORT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </div>

      <SiteDisclaimer />
    </>
  );
}
