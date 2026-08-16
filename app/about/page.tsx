import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList, InfoTable } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, SUPPORT_EMAIL, SITE_DISCLAIMER, SITE_DOMAIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} — independent flight metasearch. How we work, who we serve, and what to expect. ${SITE_TAGLINE}.`,
};

export default function AboutPage() {
  return (
    <ContentPage
      title={`About ${SITE_NAME}`}
      description={`Independent flight comparison built for travelers who want clarity before they book. ${SITE_TAGLINE}.`}
      wide
    >
      <Section title="Our mission">
        <p>
          Travel planning should not start with confusion. {SITE_NAME} exists so you can compare flight options from
          multiple airlines and booking partners in one search — then finish your purchase where the ticket is
          actually sold, with full visibility into fare rules and fees.
        </p>
        <p>
          We are not trying to replace airlines or travel agencies. We are trying to replace the messy process of
          opening ten tabs and still not knowing if you saw the best option.
        </p>
      </Section>

      <Section title="The problem we solve">
        <BulletList
          items={[
            "Airfares change minute by minute — manual searching across sites is slow and inconsistent.",
            "The same seat can appear at different prices on different sellers.",
            "Fare types (basic economy, flexible, business) are hard to compare side by side.",
            "Travelers often do not know who to call after booking — airline vs online agency vs comparison site.",
            "Misleading or impersonation sites create distrust — we label our role clearly on every page.",
          ]}
        />
      </Section>

      <Section title="What SkyLerb does">
        <Steps
          items={[
            "Collects flight offer data from partner airlines, OTAs, and distribution feeds.",
            "Presents routes, prices, and schedules in a unified search experience on skylerb.com.",
            "Lets you compare options before committing — filter by what matters to you.",
            "Redirects you to the provider that sells the selected fare.",
            "Publishes help content so you know what happens before, during, and after redirect.",
          ]}
        />
        <Callout title="What we never do">
          <BulletList
            items={[
              "Issue tickets or collect airfare payments on SkyLerb.",
              "Represent any airline as their official reservation desk.",
              "Guarantee a price until you complete checkout on the partner site.",
              "Access or modify PNRs in airline systems.",
              "Override airline fare rules, refund policies, or day-of-travel decisions.",
            ]}
          />
        </Callout>
      </Section>

      <Section title="How booking works — end to end">
        <InfoTable
          rows={[
            {
              label: "Step 1 — Search",
              value: "You enter route and dates on SkyLerb. We query partners for available offers.",
            },
            {
              label: "Step 2 — Compare",
              value: "You review prices, durations, stops, and sellers. We show estimates, not held inventory.",
            },
            {
              label: "Step 3 — Click",
              value: "You choose an offer. Your browser opens the partner booking flow.",
            },
            {
              label: "Step 4 — Review",
              value: "On the partner site, confirm itinerary, names, bags, and fare rules.",
            },
            {
              label: "Step 5 — Pay",
              value: "Payment and ticket issuance happen on the partner site. Save your confirmation email.",
            },
            {
              label: "Step 6 — Travel",
              value: "Check-in, baggage, and changes go through the airline or agency on your ticket.",
            },
          ]}
        />
      </Section>

      <Section title="Transparency & affiliate relationships">
        <p>
          {SITE_NAME} may earn commission when you click a partner link or complete a booking. That revenue helps keep
          search free for consumers. It does not change the price you pay on the provider checkout page — the seller
          sets the fare.
        </p>
        <p>
          We display disclaimers on comparison pages and support content because honest expectations matter. If you
          ever unsure who sold your ticket, check your card statement merchant name and confirmation email header.
        </p>
      </Section>

      <Section title="Who uses SkyLerb">
        <BulletList
          items={[
            "Vacation planners comparing beach, city, and family routes.",
            "Business travelers checking last-minute and next-week options.",
            "Students and budget travelers weighing basic economy vs bundled fares.",
            "International travelers comparing connection lengths and airport choices.",
            "Anyone who wants one starting point before visiting airline and OTA sites directly.",
          ]}
        />
      </Section>

      <Section title="Our standards">
        <BulletList
          items={[
            "Clarity over hype — we explain redirects and limitations upfront.",
            "No airline impersonation — brands identify flights, not ownership.",
            "Useful support — agents help you search and understand results, not fake authority over tickets.",
            "Continuous improvement — search UX, mobile experience, and help content evolve with feedback.",
          ]}
        />
      </Section>

      <Section title="Company information">
        <InfoTable
          rows={[
            { label: "Brand", value: SITE_NAME },
            { label: "Website", value: SITE_DOMAIN },
            { label: "Product", value: "Flight metasearch / comparison" },
            { label: "Tagline", value: SITE_TAGLINE },
            { label: "Support email", value: SUPPORT_EMAIL },
          ]}
        />
      </Section>

      <Section title="Get in touch">
        <p>
          Questions, feedback, or partnership ideas? Visit{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
          , browse the{" "}
          <Link href="/help" className="text-brand-600 hover:underline font-medium">
            Help Center
          </Link>
          , or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="text-xs text-slate-400 pt-4">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
