import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, SITE_DISCLAIMER } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} — an independent flight metasearch that helps travelers compare fares across airlines and booking sites.`,
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="Company"
      title={`About ${SITE_NAME}`}
      description="Independent flight comparison. No airline desk. No hidden markups."
    >
      <Section title={`What is ${SITE_NAME}?`}>
        <p>
          {SITE_NAME} is an independent flight metasearch and comparison platform. We help travelers search and
          compare flight options from many airlines and online travel agencies in one place, then send you to the
          provider you choose to complete your booking.
        </p>
        <p>
          We are not an airline, travel agency, ticket seller, or reservation desk for any carrier. We do not issue
          tickets, hold inventory, or process payments for airfare.
        </p>
      </Section>

      <Section title="How it works">
        <p>
          Enter your route and dates, compare results, and click through to an airline or third-party travel
          partner to finish the booking on their site. Prices and availability are set by those providers and can
          change at any time.
        </p>
      </Section>

      <Section title="How we make money">
        <p>
          {SITE_NAME} may receive compensation from partners when you click through or complete a booking. That
          never changes the price you see from the airline or agency — we don&apos;t add booking fees on top of
          their fares.
        </p>
      </Section>

      <Section title="Our principles">
        <ul className="list-disc pl-5 space-y-2">
          <li>Clear comparison first — we surface options, you decide.</li>
          <li>Honest positioning — we never pretend to be an airline or their call center.</li>
          <li>Transparent redirects — bookings always happen with the airline or OTA.</li>
        </ul>
      </Section>

      <Section title="Get in touch">
        <p>
          Questions about {SITE_NAME}? Visit our{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact
          </Link>{" "}
          page or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
