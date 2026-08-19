import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import MobileSupportLanding from "@/components/MobileSupportLanding";
import ContentPage, { Section, Steps, Callout, BulletList, Scenario, InfoTable } from "@/components/ContentPage";
import { BOOKING_SCENARIOS } from "@/lib/helpContent";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SUPPORT_EMAIL,
  OFFICE_ADDRESS_LINES,
  PRESS_EMAIL,
  PARTNERS_EMAIL,
  CAREERS_EMAIL,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} support — phone, email, mailing address, and guides for every type of inquiry.`,
};

export default function ContactPage() {
  return (
    <>
      <MobileSupportLanding />

      <div className="hidden md:block overflow-x-hidden">
        <ContentPage
          title="Contact Us"
          description={`Reach ${SITE_NAME} for search help, website support, and partnership routing. ${SITE_TAGLINE}.`}
          wide
        >
          <Callout title="Read this first">
            <p>
              {SITE_NAME} is an independent flight <strong>comparison</strong> website. We help you find and compare
              fares. Tickets are sold, changed, and refunded only by the airline or travel agency on your confirmation —
              not by us.
            </p>
          </Callout>

          <Section title="Choose the right channel">
            <InfoTable
              rows={[
                {
                  label: "Help using the search tool",
                  value: (
                    <>
                      Call{" "}
                      <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
                        {SUPPORT_PHONE_DISPLAY}
                      </a>{" "}
                      or email{" "}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium break-all">
                        {SUPPORT_EMAIL}
                      </a>
                    </>
                  ),
                },
                {
                  label: "Change / cancel existing ticket",
                  value: "Contact the airline or travel agency on your confirmation. SkyLerb cannot change tickets.",
                },
                {
                  label: "Press & media",
                  value: (
                    <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-medium break-all">
                      {PRESS_EMAIL}
                    </a>
                  ),
                },
                {
                  label: "Partnerships & affiliates",
                  value: (
                    <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline font-medium break-all">
                      {PARTNERS_EMAIL}
                    </a>
                  ),
                },
                {
                  label: "Jobs & careers",
                  value: (
                    <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline font-medium break-all">
                      {CAREERS_EMAIL}
                    </a>
                  ),
                },
                {
                  label: "Legal / privacy requests",
                  value: (
                    <>
                      Email{" "}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium break-all">
                        {SUPPORT_EMAIL}
                      </a>{" "}
                      with the subject “Privacy request”.
                    </>
                  ),
                },
              ]}
            />
          </Section>

          <Section title="When to contact SkyLerb vs the airline">
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
                <p className="font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5" /> Contact {SITE_NAME} for
                </p>
                <BulletList
                  items={[
                    "How to run a search — airports, dates, passengers, round trip vs one-way.",
                    "Understanding comparison results and what happens when you click an offer.",
                    "The search widget not loading, blank results, or redirect errors on skylerb.com.",
                    "Questions about our role — what we are and are not (not an airline, not a ticket seller).",
                    "Feedback on the website, mobile experience, or content accuracy.",
                    "Pointing you to the correct airline or agency if you are unsure who sold your ticket.",
                    "Privacy questions about data on SkyLerb — see also our Privacy Policy.",
                  ]}
                />
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-5">
                <p className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5" /> Contact the airline or agency for
                </p>
                <BulletList
                  items={[
                    "Changing dates, times, routes, or passenger names on a purchased ticket.",
                    "Cancellations, refunds, vouchers, and travel credits.",
                    "Seat selection, upgrades, and baggage purchases after booking.",
                    "Check-in, boarding passes, TSA issues, and gate changes.",
                    "Delayed, canceled, or missed flights — rebooking and compensation.",
                    "Lost, delayed, or damaged checked baggage.",
                    "Frequent flyer mileage posting and status benefits.",
                    "Payment disputes — start with the merchant on your card statement.",
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section title="How to reach us">
            <div className="grid sm:grid-cols-2 gap-5 not-prose mb-5">
              <a
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="rounded-2xl border border-brand-100 bg-brand-50 p-6 hover:shadow-md transition-shadow group"
              >
                <Phone className="w-7 h-7 text-brand-600 mb-3" />
                <p className="font-bold text-slate-900 mb-1">Phone support</p>
                <p className="text-2xl font-bold text-brand-700 group-hover:underline">{SUPPORT_PHONE_DISPLAY}</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Best when you need live help comparing routes or the site is not working. Have your origin,
                  destination, and travel dates ready.
                </p>
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md transition-shadow group"
              >
                <Mail className="w-7 h-7 text-brand-600 mb-3" />
                <p className="font-bold text-slate-900 mb-1">Email support</p>
                <p className="text-lg font-bold text-brand-700 group-hover:underline break-all">{SUPPORT_EMAIL}</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Best for screenshots, detailed bug reports, and non-urgent questions. We reply with steps you can
                  follow.
                </p>
              </a>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 not-prose">
              <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> Mailing address
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                {OFFICE_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="text-xs text-slate-500">
                Postal mail is not the fastest way to get search help — phone or email is better for travelers.
              </p>
            </div>
          </Section>

          <Section title="Phone call — what to say">
            <Steps
              items={[
                "Say you need help with SkyLerb flight comparison (not an airline change).",
                "Give origin, destination, and dates you want to search.",
                "Explain the issue — no results, confusing price, site error, or how redirects work.",
                "If about an existing ticket, say you know SkyLerb cannot change it — you need the correct contact for the issuer.",
                "Have email ready if we need to send follow-up steps or links to the Help Center.",
              ]}
            />
          </Section>

          <Section title="Response times & availability">
            <BulletList
              items={[
                "Phone: live agents when available. If you reach voicemail, leave callback number, route, and a short summary.",
                "Email: typical reply within 1–2 business days; complex issues may take longer.",
                "We do not operate airline counters or airport desks.",
                "We cannot expedite airline refunds or override fare rules on your behalf.",
                "For step-by-step guides on dozens of topics, use the Help Center — linked below.",
              ]}
            />
            <p className="flex items-center gap-2 text-sm pt-3">
              <Clock className="w-4 h-4 text-brand-600 shrink-0" />
              <Link href="/help" className="text-brand-600 hover:underline font-medium">
                Open the full Help Center
              </Link>
            </p>
          </Section>

          <Section title="Common situations — quick answers">
            <div className="space-y-4 not-prose">
              {BOOKING_SCENARIOS.slice(0, 4).map((s) => (
                <Scenario
                  key={s.title}
                  title={s.title}
                  problem={s.problem}
                  solution={<Steps items={s.steps} />}
                />
              ))}
            </div>
            <p className="pt-3">
              More scenarios — price changes, missed flights, baggage, duplicates — in the{" "}
              <Link href="/help" className="text-brand-600 hover:underline font-medium">
                Help Center
              </Link>
              .
            </p>
          </Section>

          <Section title="Other departments">
            <div className="space-y-3 not-prose">
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Press & media</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Interview requests, fact-checking, company background —{" "}
                    <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline">
                      {PRESS_EMAIL}
                    </a>
                    . See <Link href="/press">Press</Link>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Partnerships</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Airlines, OTAs, data feeds, affiliate programs —{" "}
                    <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline">
                      {PARTNERS_EMAIL}
                    </a>
                    . See <Link href="/partners">Partners</Link>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <MessageCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Careers</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Hiring and general applications —{" "}
                    <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline">
                      {CAREERS_EMAIL}
                    </a>
                    . See <Link href="/careers">Careers</Link>.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title={`About ${SITE_NAME}`}>
            <p>
              {SITE_NAME} aggregates flight offers so you can compare prices and schedules before booking on a partner
              site. We focus on clarity: show options, explain redirects, and never pretend to be an airline.{" "}
              {SITE_TAGLINE}.
            </p>
            <BulletList
              items={[
                "Free to search — no SkyLerb account required for basic comparison.",
                "Bookings completed on third-party sites subject to their terms.",
                "Affiliate relationships may compensate us — see Terms and site disclaimer.",
              ]}
            />
            <p className="pt-2">
              <Link href="/about" className="text-brand-600 hover:underline font-medium">
                About {SITE_NAME}
              </Link>
              {" · "}
              <Link href="/terms" className="text-brand-600 hover:underline font-medium">
                Terms of Service
              </Link>
              {" · "}
              <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </Section>
        </ContentPage>

        <SiteDisclaimer />
      </div>
    </>
  );
}
