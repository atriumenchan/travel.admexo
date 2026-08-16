import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, SITE_DISCLAIMER, SITE_TAGLINE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} helps travelers discover and compare flight options in one search.`,
};

export default function AboutPage() {
  return (
    <ContentPage title={`About ${SITE_NAME}`}>
      <Section title={`${SITE_NAME} helps travelers discover and compare flight options—all in one simple search.`}>
        <p>
          We created {SITE_NAME} because finding the right flight shouldn&apos;t mean opening multiple websites,
          comparing confusing fare conditions, and spending hours searching for a better price.
        </p>
        <p>
          Our flight-comparison technology searches offers from airlines, travel agencies, and trusted travel
          partners to help you find suitable options based on your destination, travel dates, schedule, and budget.
          Simply enter where you&apos;re flying from, where you want to go, and when you plan to travel. {SITE_NAME}{" "}
          brings the available options together so you can compare them in one place.
        </p>
        <p>
          Once you find the flight that works for you, we redirect you to the selected travel provider&apos;s
          website, where you can review the final fare details and complete your booking securely.
        </p>
        <p>
          Whether you&apos;re planning a business trip, family holiday, spontaneous getaway, or long-awaited
          international adventure, our goal is to make flight discovery faster, clearer, and less stressful.
        </p>
        <p>
          At {SITE_NAME}, we believe travel should begin with excitement—not endless searching. That&apos;s why we
          focus on providing a straightforward comparison experience that helps you spend less time looking for
          flights and more time planning the journey ahead.
        </p>
        <p className="font-semibold text-slate-800">
          {SITE_NAME} — {SITE_TAGLINE}
        </p>
        <p>
          Questions?{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact us
          </Link>{" "}
          or email{" "}
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
