import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, CAREERS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Careers",
  description: `Work at ${SITE_NAME} — independent flight metasearch. ${SITE_TAGLINE}.`,
};

export default function CareersPage() {
  return (
    <ContentPage
      title="Careers"
      description={`Join the team building a simpler way to compare flights.`}
      wide
    >
      <Section title="Working at SkyLerb">
        <p>
          {SITE_NAME} is a lean travel-comparison product focused on speed, clarity, and honest expectations. We
          build tools that help real people make travel decisions — not dark patterns or fake urgency.
        </p>
        <p>
          We are remote-friendly for the right roles and care about clear communication, ownership, and shipping
          improvements that users actually notice.
        </p>
      </Section>

      <Section title="What we value">
        <BulletList
          items={[
            "Clarity — say what the product does and what it does not do.",
            "User respect — no airline impersonation, no misleading booking flows.",
            "Pragmatism — ship useful fixes instead of perfect decks.",
            "Curiosity — travel search changes constantly; we adapt with it.",
            "Integrity — disclose affiliate relationships and partner redirects openly.",
          ]}
        />
      </Section>

      <Section title="Teams we hire for (when roles open)">
        <BulletList
          items={[
            "Engineering — frontend, full-stack, performance, search integrations.",
            "Product & design — UX for search, results, and mobile landing experiences.",
            "Operations & support — help travelers use comparison tools effectively.",
            "Partnerships — travel data, affiliate, and distribution relationships.",
            "Content — help center, SEO, and educational travel content.",
          ]}
        />
      </Section>

      <Section title="Open positions">
        <Callout tone="warn">
          <p>
            <strong>We don&apos;t have any open positions listed right now.</strong> Check back later or send a
            general application if you are passionate about travel search.
          </p>
        </Callout>
      </Section>

      <Section title="How to apply">
        <Steps
          items={[
            "Email careers@skylerb.com with the role you are interested in (or “general”).",
            "Attach your resume or LinkedIn profile and a short note on why travel search interests you.",
            "Include links to work you are proud of — GitHub, portfolio, or case studies.",
            "Tell us your timezone and earliest start date if you have one.",
          ]}
        />
        <p>
          Send applications to{" "}
          <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {CAREERS_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Interview process (typical)">
        <BulletList
          items={[
            "Intro call — mutual fit, role scope, and how SkyLerb works.",
            "Skills conversation — walk through past projects relevant to the role.",
            "Practical exercise for some roles — short take-home or live problem, kept reasonable.",
            "Final chat — team fit, compensation, and start date.",
          ]}
        />
        <p>
          {SITE_NAME} — {SITE_TAGLINE}. Learn more{" "}
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            about us
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
