import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList, InfoTable } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, PARTNERS_EMAIL, SUPPORT_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Partners",
  description: `Partner with ${SITE_NAME} — airlines, OTAs, affiliates, and travel technology.`,
};

export default function PartnersPage() {
  return (
    <ContentPage
      title="Partners"
      description={`Distribution, data, and affiliate partnerships with ${SITE_NAME}. ${SITE_TAGLINE}.`}
      wide
    >
      <Section title="Partner with SkyLerb">
        <p>
          {SITE_NAME} sits between travelers researching flights and the sellers who issue tickets. We send
          qualified click-through traffic from comparison searches to airline and OTA booking flows. Partners benefit
          from intent-rich users; users benefit from transparent comparison before they commit.
        </p>
        <p>
          We prioritize partnerships that improve fare coverage, landing-page quality, and honest consumer
          expectations — not bait-and-switch pricing or impersonation branding.
        </p>
      </Section>

      <Section title="Partnership types">
        <InfoTable
          rows={[
            {
              label: "Affiliate / referral",
              value: "Trackable links from SkyLerb search results to your booking site; commission on qualified conversions per program terms.",
            },
            {
              label: "Airline & OTA distribution",
              value: "Feed flight inventory, schedules, and pricing into comparison results where technically supported.",
            },
            {
              label: "Metasearch / API integrations",
              value: "Structured data exchange for routes, availability snapshots, and redirect deep links.",
            },
            {
              label: "Technology vendors",
              value: "Hosting, analytics, fraud prevention, airport data, payment-adjacent tools that improve reliability.",
            },
            {
              label: "Co-marketing",
              value: "Route campaigns and educational content — must comply with disclosure and non-impersonation rules.",
            },
          ]}
        />
      </Section>

      <Section title="What we look for in partners">
        <BulletList
          items={[
            "Accurate fare and schedule data with reasonable refresh intervals.",
            "Landing pages that match the price and itinerary shown before redirect where possible.",
            "Clear checkout with full tax and fee breakdown before payment.",
            "Customer support channels for post-booking issues — travelers must not be stranded.",
            "Reliable tracking, reporting, and good-faith dispute resolution on referrals.",
            "Respect for consumer protection norms — no fake airline branding on partner pages.",
          ]}
        />
      </Section>

      <Section title="What partners can expect from SkyLerb">
        <BulletList
          items={[
            "Neutral comparison placement subject to relevance and program terms — not pay-to-hide competitors.",
            "Disclosure that SkyLerb may earn compensation — visible to consumers site-wide.",
            "Mobile and desktop search entry points plus route-specific landing pages where published.",
            "Good-faith communication on tracking anomalies or feed quality issues.",
          ]}
        />
      </Section>

      <Section title="Integration checklist (technical partners)">
        <Steps
          items={[
            "Provide API docs, sandbox credentials, or affiliate link parameters.",
            "Define supported markets, currencies, and route coverage.",
            "Agree on click attribution window and conversion validation rules.",
            "Test redirect URLs for major device/browser combinations.",
            "Establish a contact for feed outages and pricing discrepancies.",
            "Review consumer-facing disclaimer language on landing pages.",
          ]}
        />
      </Section>

      <Section title="How to submit a partnership inquiry">
        <Steps
          items={[
            "Email partners@skylerb.com with company name and partnership type in the subject line.",
            "Describe your product, geographic coverage, and integration method (API, affiliate network, direct).",
            "Share expected volume, commercial model, and sample deep link or feed spec.",
            "Include primary contact, role, and timezone for a follow-up call.",
          ]}
        />
        <Callout>
          <p>
            <strong>Partnerships inbox:</strong>{" "}
            <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline font-bold">
              {PARTNERS_EMAIL}
            </a>
          </p>
          <p className="pt-2 text-sm">
            We read every message. Response time depends on volume and fit — high-quality, complete pitches move
            faster.
          </p>
        </Callout>
      </Section>

      <Section title="Not a partnership inbox">
        <Callout tone="warn">
          <p>
            Travelers needing search help or ticket changes should not email partners@skylerb.com. Use{" "}
            <Link href="/contact">Contact Us</Link> or{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>{" "}
            instead. For airline-specific booking issues, contact the issuer on your confirmation.
          </p>
        </Callout>
      </Section>

      <Section title="Learn more">
        <p>
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About {SITE_NAME}
          </Link>
          {" · "}
          <Link href="/press" className="text-brand-600 hover:underline font-medium">
            Press
          </Link>
          {" · "}
          <Link href="/terms" className="text-brand-600 hover:underline font-medium">
            Terms of Service
          </Link>
        </p>
      </Section>
    </ContentPage>
  );
}
