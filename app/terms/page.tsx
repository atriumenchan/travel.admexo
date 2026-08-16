import type { Metadata } from "next";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service" description={`Last updated: ${LEGAL_EFFECTIVE_DATE}`}>
      <Section title="Agreement">
        <p>
          These Terms of Service govern skylerb.com and related services (the &quot;Website&quot;) operated by{" "}
          {SITE_NAME}. By using the Website you agree to these Terms and our Privacy Policy. If you do not agree,
          do not use the Website. We may amend these Terms by posting updates; continued use means acceptance.
        </p>
      </Section>

      <Section title="Nature of our service">
        <p>
          {SITE_NAME} is a travel metasearch engine. We do not sell flights or other travel products. We let users
          search and compare offers and redirect them to third-party suppliers, airlines, agencies, and booking
          platforms. All prices, availability, and details come from third parties. Bookings are completed on the
          provider&apos;s site.
        </p>
        <p>{SITE_NAME} is not responsible for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Accuracy, timeliness, or completeness of any offer</li>
          <li>Price or availability changes after redirection</li>
          <li>Booking, payment, cancellation, refund, or customer-service disputes</li>
          <li>Delays, cancellations, losses, or issues from third-party services</li>
          <li>Acts, omissions, terms, or performance of any third-party provider</li>
        </ul>
      </Section>

      <Section title="License & restricted uses">
        <p>
          You may use the Website for personal, non-commercial flight comparison. You may not scrape or disrupt the
          Website, misuse trademarks, reverse engineer systems except as allowed by law, introduce malware, or use
          the Website unlawfully.
        </p>
      </Section>

      <Section title="Accounts & user content">
        <p>
          If you create an account, you are responsible for keeping credentials confidential and for activity under
          your account. If you submit reviews or other content, you grant {SITE_NAME} a license to use it in
          connection with the Website, and you must not submit unlawful or inappropriate content.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          Website content and branding belong to {SITE_NAME} or its licensors. Airline names and marks belong to
          their owners and are used only to identify comparable options.
        </p>
      </Section>

      <Section title="Disclaimer & liability">
        <p>
          The Website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. To
          the fullest extent permitted by law, {SITE_NAME} disclaims responsibility for third-party content, offers,
          and bookings, and is not liable for indirect or consequential damages arising from use of the Website or
          third-party services.
        </p>
      </Section>

      <Section title="Indemnity & governing law">
        <p>
          You agree to indemnify {SITE_NAME} against claims arising from your misuse of the Website or violation of
          these Terms. These Terms are governed by the laws of the State of Wyoming, United States.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
