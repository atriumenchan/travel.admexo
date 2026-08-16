import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Callout, BulletList } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, PRESS_EMAIL, SUPPORT_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Press",
  description: `Press and media inquiries for ${SITE_NAME} — independent flight metasearch.`,
};

export default function PressPage() {
  return (
    <ContentPage
      title="Press & Media"
      description={`News, facts, and contact information for journalists covering ${SITE_NAME}.`}
      wide
    >
      <Section title="Company overview">
        <p>
          {SITE_NAME} is an independent flight metasearch platform that helps consumers compare airfare from
          multiple airlines and online travel partners in one search. {SITE_TAGLINE}.
        </p>
        <p>
          Users search on {SITE_NAME}, compare options, and complete purchases on the airline or travel site that
          offers the fare. {SITE_NAME} does not sell tickets directly.
        </p>
      </Section>

      <Section title="Quick facts">
        <BulletList
          items={[
            "Product: flight comparison / metasearch website",
            "Website: skylerb.com",
            "Category: travel technology, consumer travel, affiliate metasearch",
            "Model: free consumer search; revenue may include partner commissions on qualified referrals",
            "Service area: primarily US-facing search; international routes depend on partner coverage",
          ]}
        />
      </Section>

      <Section title="What we can discuss">
        <BulletList
          items={[
            "How metasearch differs from online travel agencies and airline direct booking.",
            "Consumer tips for comparing fares and avoiding common booking mistakes.",
            "Trends in flight shopping behavior and multi-tab comparison fatigue.",
            "How affiliate and partner relationships work in travel search (high level).",
            "Product updates to the SkyLerb comparison experience.",
          ]}
        />
      </Section>

      <Section title="What we cannot provide">
        <BulletList
          items={[
            "Commentary on behalf of any airline or on specific passenger booking disputes.",
            "Internal partner contract terms or unreleased commercial metrics.",
            "Guaranteed fare quotes — prices are dynamic and set by third-party providers.",
            "Access to a traveler’s ticket without going through the issuing airline or agency.",
          ]}
        />
      </Section>

      <Section title="Media contact">
        <Callout>
          <p>
            For press inquiries, interview requests, and fact-checking, email{" "}
            <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-bold">
              {PRESS_EMAIL}
            </a>
            .
          </p>
          <p className="pt-2">Please include your outlet, deadline, and the topic you are covering.</p>
        </Callout>
        <p>
          For traveler support (not media), use{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>{" "}
          or the{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact page
          </Link>{" "}
          instead.
        </p>
      </Section>

      <Section title="Brand & assets">
        <p>
          {SITE_NAME} wordmark and site design are proprietary. Media may use the name {SITE_NAME} to refer to our
          service in editorial coverage. Do not imply endorsement by any airline. For logo requests, contact{" "}
          <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {PRESS_EMAIL}
          </a>
          .
        </p>
        <p>
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About {SITE_NAME}
          </Link>
          {" · "}
          <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
            Privacy Policy
          </Link>
        </p>
      </Section>
    </ContentPage>
  );
}
