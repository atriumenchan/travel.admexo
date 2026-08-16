import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, SUPPORT_EMAIL, SITE_DISCLAIMER } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} helps travelers discover and compare flight options in one search. ${SITE_TAGLINE}.`,
};

export default function AboutPage() {
  return (
    <ContentPage
      title={`About ${SITE_NAME}`}
      description={`Independent flight metasearch — ${SITE_TAGLINE}.`}
      wide
    >
      <Section title="Why we built SkyLerb">
        <p>
          Finding the right flight used to mean opening a dozen tabs — airline sites, OTAs, deal pages — and still
          wondering if you missed a better fare. We created {SITE_NAME} to pull that work into one simple search so
          you can compare routes, times, and prices faster.
        </p>
        <p>
          We are travelers too. We care about clear pricing, fewer clicks, and knowing exactly where you will complete
          your booking before you pay.
        </p>
      </Section>

      <Section title="What SkyLerb does">
        <BulletList
          items={[
            "Aggregates flight offers from airlines and trusted travel partners.",
            "Lets you filter and compare options side by side in one interface.",
            "Redirects you to the provider that sells the fare so you can review final details and pay securely.",
            "Surfaces popular routes and deals to inspire where you might go next.",
          ]}
        />
        <Callout title="What we do not do">
          <BulletList
            items={[
              "We do not operate flights or airport services.",
              "We do not issue tickets or collect payment for airfare on SkyLerb.",
              "We are not a travel agency representing any airline.",
              "We cannot change or cancel bookings made on other websites.",
            ]}
          />
        </Callout>
      </Section>

      <Section title="How it works">
        <Steps
          items={[
            "Enter where you are flying from, where you are going, and your dates on the homepage.",
            "Browse comparison results from multiple providers.",
            "Click the option that fits your schedule and budget.",
            "Finish booking on the airline or partner site — review baggage, seats, and cancellation rules there.",
            "Keep your confirmation email from that provider for travel day and support.",
          ]}
        />
      </Section>

      <Section title="Our approach">
        <p>
          {SITE_NAME} is built to be neutral. We do not favor one airline over another — we show options available
          through our partners at the time of your search. Prices change quickly in travel; always confirm the final
          total before checkout.
        </p>
        <p>
          We may receive compensation when you click a partner link or complete a booking. That helps us keep the
          comparison tool free to use. It does not change the fare you pay on the provider site.
        </p>
      </Section>

      <Section title="Who we serve">
        <BulletList
          items={[
            "Leisure travelers comparing vacation flights.",
            "Business travelers checking schedules and last-minute options.",
            "Families booking multi-passenger trips.",
            "Anyone who wants one place to start a flight search instead of five.",
          ]}
        />
      </Section>

      <Section title={`${SITE_NAME} — ${SITE_TAGLINE}`}>
        <p>
          Our goal is straightforward: low-cost discovery, easy comparison, reliable redirects to where tickets are
          actually sold. Travel should start with planning your trip — not wrestling with tabs.
        </p>
        <p>
          Questions or feedback?{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact us
          </Link>{" "}
          or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . For how-to guides, visit the{" "}
          <Link href="/help" className="text-brand-600 hover:underline font-medium">
            Help Center
          </Link>
          .
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
