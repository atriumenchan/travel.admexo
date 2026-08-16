import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import MobileSupportLanding from "@/components/MobileSupportLanding";
import ContentPage, { Section, Steps, Callout, BulletList } from "@/components/ContentPage";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DISCLAIMER,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SUPPORT_EMAIL,
  OFFICE_ADDRESS_LINES,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} support. Independent flight comparison help — we are not an airline and do not sell tickets.`,
};

export default function ContactPage() {
  return (
    <>
      <MobileSupportLanding />

      {/* Desktop — expanded contact page */}
      <div className="hidden md:block">
        <ContentPage
          title="Contact Us"
          description={`${SITE_TAGLINE} — get help using ${SITE_NAME} to search and compare flights.`}
          wide
        >
          <Callout title="Important">
            <p>
              {SITE_NAME} is an independent flight metasearch website. We help you <strong>compare</strong> fares.
              We do not sell tickets, change reservations, or process refunds for flights booked elsewhere.
            </p>
          </Callout>

          <Section title="When to contact SkyLerb">
            <p>Reach out when you need help with our website or comparison process:</p>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" /> We can help with
                </p>
                <BulletList
                  items={[
                    "Searching for flights and reading comparison results.",
                    "Understanding how redirects to airline and partner sites work.",
                    "Technical issues with the search tool or pages on skylerb.com.",
                    "General questions about what SkyLerb is and how we operate.",
                    "Feedback about the site experience.",
                  ]}
                />
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                <p className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4" /> Contact the airline or agency instead for
                </p>
                <BulletList
                  items={[
                    "Changing or canceling an existing booking.",
                    "Refunds, vouchers, or travel credits.",
                    "Seat selection, baggage, or special assistance on a ticket you already bought.",
                    "Flight delays, missed connections, or day-of-travel problems.",
                    "Payment disputes for a completed booking — use the merchant on your receipt.",
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section title="How to reach us">
            <div className="grid sm:grid-cols-2 gap-5 not-prose">
              <a
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="rounded-2xl border border-brand-100 bg-brand-50 p-6 hover:shadow-md transition-shadow group"
              >
                <Phone className="w-6 h-6 text-brand-600 mb-3" />
                <p className="font-bold text-slate-900 mb-1">Call support</p>
                <p className="text-2xl font-bold text-brand-700 group-hover:underline">{SUPPORT_PHONE_DISPLAY}</p>
                <p className="text-xs text-slate-500 mt-2">Best for urgent search or website questions.</p>
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md transition-shadow group"
              >
                <Mail className="w-6 h-6 text-brand-600 mb-3" />
                <p className="font-bold text-slate-900 mb-1">Email us</p>
                <p className="text-lg font-bold text-brand-700 group-hover:underline break-all">{SUPPORT_EMAIL}</p>
                <p className="text-xs text-slate-500 mt-2">Include screenshots and travel dates if reporting a bug.</p>
              </a>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 mt-4 not-prose">
              <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> Mailing address
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {OFFICE_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </Section>

          <Section title="What to include in your message">
            <Steps
              items={[
                "Tell us whether you need help with a new search or an existing ticket (for existing tickets, we can only guide you to the right provider).",
                "Share origin, destination, and dates you searched.",
                "Describe what happened and what you expected instead.",
                "Add your browser, device, and screenshots if something on the site did not work.",
                "For booking issues after payment, include the airline or agency name from your confirmation — not just SkyLerb.",
              ]}
            />
          </Section>

          <Section title="Response times">
            <BulletList
              items={[
                "Phone: we aim to answer live when agents are available. If you reach voicemail, leave your callback number and a short summary.",
                "Email: most messages receive a reply within 1–2 business days. Complex technical reports may take longer.",
                "We do not have access to airline reservation systems — we cannot look up your ticket by name alone.",
              ]}
            />
            <p className="flex items-center gap-2 text-sm pt-2">
              <Clock className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                For step-by-step guides, visit our{" "}
                <Link href="/help" className="text-brand-600 hover:underline font-medium">
                  Help Center
                </Link>
                .
              </span>
            </p>
          </Section>

          <Section title="Other departments">
            <div className="space-y-3 not-prose">
              <p className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Press & media</strong> — see our{" "}
                  <Link href="/press">Press page</Link> for media contact details.
                </span>
              </p>
              <p className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Partnerships</strong> — travel partners and affiliates should use
                  the <Link href="/partners">Partners page</Link>.
                </span>
              </p>
              <p className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Careers</strong> — hiring inquiries go to{" "}
                  <Link href="/careers">Careers</Link>.
                </span>
              </p>
            </div>
          </Section>

          <Section title="About SkyLerb">
            <p>
              {SITE_NAME} helps travelers compare flight options from multiple airlines and booking sites in one
              search. We built it to save time — open one place, scan routes and prices, then book where the fare is
              sold. {SITE_TAGLINE}.
            </p>
            <p>
              Learn more on our <Link href="/about">About page</Link>.
            </p>
            <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
          </Section>
        </ContentPage>

        <SiteDisclaimer />
      </div>
    </>
  );
}
