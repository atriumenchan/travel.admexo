import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, CAREERS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at ${SITE_NAME}. Join a small team building an honest flight comparison experience.`,
};

export default function CareersPage() {
  return (
    <ContentPage
      eyebrow="Company"
      title="Careers"
      description={`Help travelers find better flights — without the dark patterns.`}
    >
      <Section title={`Work with ${SITE_NAME}`}>
        <p>
          We&apos;re building a clean, independent flight metasearch: compare options clearly, send people to the
          right airline or OTA, and stay honest about who we are.
        </p>
        <p>
          We don&apos;t currently list open roles on this page, but we&apos;re always interested in hearing from
          people who care about travel product, performance, and trust.
        </p>
      </Section>

      <Section title="What we're interested in">
        <ul className="list-disc pl-5 space-y-2">
          <li>Product &amp; design for search and comparison UX</li>
          <li>Full-stack / frontend engineers (Next.js, APIs, performance)</li>
          <li>Partnerships with airlines, OTAs, and affiliate networks</li>
          <li>Content and growth that stays accurate and non-misleading</li>
        </ul>
      </Section>

      <Section title="How to apply">
        <p>
          Send a short note about what you&apos;d like to work on, plus a résumé or portfolio, to{" "}
          <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {CAREERS_EMAIL}
          </a>
          . We read every message even when we&apos;re not actively hiring.
        </p>
        <p>
          Curious what we do day to day? Read{" "}
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About Us
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
