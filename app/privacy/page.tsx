import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy" description={`Effective date: ${LEGAL_EFFECTIVE_DATE}`}>
      <Section title="Overview">
        <p>
          This policy describes how {SITE_NAME} handles information when you use our flight comparison website. We
          are a metasearch site — bookings are completed on airline or travel-provider sites, which have their own
          privacy policies.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>
          Search details you enter (such as airports, dates, and passenger count). If you contact us, we collect
          whatever you send (for example email or phone). We also collect basic technical data such as IP address,
          browser type, and pages viewed, including via cookies or similar tools for analytics and affiliate
          tracking.
        </p>
      </Section>

      <Section title="How we use it">
        <p>
          To run and improve the site, respond to support requests, measure traffic, attribute partner referrals,
          and meet legal obligations.
        </p>
      </Section>

      <Section title="Sharing">
        <p>
          When you click a flight offer, you leave our site and the airline or travel partner may receive
          information needed for that referral. We use service providers for hosting and analytics. We may disclose
          information if required by law. We do not sell your personal information as a data product.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Cookies may be used for preferences, analytics, and affiliate tracking. You can control cookies in your
          browser settings.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . Also see{" "}
          <Link href="/terms" className="text-brand-600 hover:underline font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
