import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Callout, BulletList, InfoTable, Steps } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, PRESS_EMAIL, SUPPORT_EMAIL, SITE_DOMAIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Press",
  description: `Press resources, company facts, and media contact for ${SITE_NAME}.`,
};

export default function PressPage() {
  return (
    <ContentPage
      title="Press & Media"
      description={`Facts, story angles, and contacts for journalists covering ${SITE_NAME} and travel metasearch.`}
      wide
    >
      <Section title="Executive summary">
        <p>
          {SITE_NAME} is a consumer flight metasearch platform — travelers search and compare airfare from multiple
          airlines and online travel sellers, then book on the provider site. {SITE_TAGLINE}. The service is free to
          use; revenue may include partner commissions on qualified referrals.
        </p>
        <p>
          {SITE_NAME} does not operate aircraft, sell tickets directly, or act as an airline agent. Airline trademarks
          appear only to describe comparable flight options.
        </p>
      </Section>

      <Section title="Company facts">
        <InfoTable
          rows={[
            { label: "Company / brand", value: SITE_NAME },
            { label: "Website", value: SITE_DOMAIN },
            { label: "Category", value: "Travel technology · metasearch · consumer flights" },
            { label: "Consumer pitch", value: SITE_TAGLINE },
            { label: "Business model", value: "Free search; affiliate / partner referral compensation" },
            { label: "Booking flow", value: "Compare on SkyLerb → purchase on airline or OTA partner" },
            { label: "Support scope", value: "Website and comparison help — not airline operations" },
          ]}
        />
      </Section>

      <Section title="Story angles we can support">
        <BulletList
          items={[
            "How metasearch differs from OTAs and airline direct channels — and why consumers use both.",
            "Why displayed fares change between search and checkout — inventory, taxes, currency.",
            "Comparison fatigue: the tab overload problem in flight shopping.",
            "Consumer protection: identifying legitimate booking sites vs impersonation scams.",
            "Basic economy proliferation — tradeoffs travelers miss when chasing headline price.",
            "Affiliate disclosure in travel media — how comparison sites disclose relationships.",
            "Mobile-first flight shopping and call-support for older or less technical travelers.",
          ]}
        />
      </Section>

      <Section title="Topics we can discuss (on the record)">
        <BulletList
          items={[
            "Product design choices for neutral comparison UX.",
            "Consumer education content on redirects and fare rules.",
            "General industry trends in flight distribution and metasearch.",
            "How partner feeds power search results at a high level.",
            "Privacy and cookie practices — with reference to published Privacy Policy.",
          ]}
        />
      </Section>

      <Section title="Off the record / unavailable">
        <BulletList
          items={[
            "Commentary on behalf of any specific airline or passenger PNR dispute.",
            "Unreleased revenue, partner contract terms, or internal metrics.",
            "Guaranteed fare quotes — all prices are dynamic and seller-specific.",
            "Legal positions on individual consumer booking disputes.",
            "Confirmation of whether a specific traveler booked via SkyLerb (privacy).",
          ]}
        />
      </Section>

      <Section title="Interview request process">
        <Steps
          items={[
            "Email press@skylerb.com with outlet name, journalist, deadline, and topic.",
            "Include 3–5 sample questions if you have them — helps us route quickly.",
            "Note whether you need audio, video, or written quotes only.",
            "Allow at least 24–48 hours for non-breaking requests; same-day not guaranteed.",
          ]}
        />
      </Section>

      <Section title="Media contact">
        <Callout>
          <p>
            <strong>Press inquiries:</strong>{" "}
            <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-bold">
              {PRESS_EMAIL}
            </a>
          </p>
          <p className="pt-2">
            <strong>Traveler support (not media):</strong>{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>{" "}
            or <Link href="/contact">Contact Us</Link>
          </p>
        </Callout>
      </Section>

      <Section title="Brand usage for editors">
        <BulletList
          items={[
            `Correct brand casing: ${SITE_NAME} (capital S and L).`,
            "Domain references: skylerb.com (lowercase).",
            "Do not imply airline endorsement or official airline customer service.",
            "Logo requests — email press@skylerb.com with intended use and publication.",
          ]}
        />
        <p className="pt-2">
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About {SITE_NAME}
          </Link>
          {" · "}
          <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
            Privacy Policy
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
