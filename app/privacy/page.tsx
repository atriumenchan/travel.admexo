import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import {
  SITE_NAME,
  SUPPORT_EMAIL,
  LEGAL_EFFECTIVE_DATE,
  SITE_URL,
  SITE_DISCLAIMER,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn what information we collect, how we use it, and your choices.`,
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy Policy"
      description={`Effective date: ${LEGAL_EFFECTIVE_DATE}`}
    >
      <Section title="1. Introduction">
        <p>
          This Privacy Policy explains how {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          collects, uses, and shares information when you use {SITE_URL} and related services (the
          &quot;Service&quot;).
        </p>
        <p>
          {SITE_NAME} is an independent flight metasearch platform. We do not sell airline tickets. When you book,
          you leave our site and complete the transaction with an airline or third-party travel provider under
          their own privacy practices.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>
          <strong>Information you provide.</strong> Search details you enter (origins, destinations, dates,
          passenger counts), and contact details if you email or call support (such as name, email address, or
          phone number).
        </p>
        <p>
          <strong>Information collected automatically.</strong> Device and browser type, IP address, approximate
          location derived from IP, pages viewed, referring URLs, and interaction data. We may use cookies, pixels,
          and similar technologies for analytics, preferences, and affiliate tracking.
        </p>
        <p>
          <strong>Information from partners.</strong> Aggregated or campaign-level data from advertising,
          analytics, or travel partners related to clicks and conversions.
        </p>
      </Section>

      <Section title="3. How we use information">
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, operate, and improve the Service (including search and comparison features)</li>
          <li>Respond to support requests and communicate with you</li>
          <li>Measure performance, diagnose issues, and prevent fraud or abuse</li>
          <li>Attribute referrals to travel partners and receive applicable compensation</li>
          <li>Comply with law and enforce our Terms of Service</li>
        </ul>
      </Section>

      <Section title="4. Sharing of information">
        <p>We may share information with:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Travel and affiliate partners</strong> when you click through to view or book a fare (they
            process bookings under their own policies)
          </li>
          <li>
            <strong>Service providers</strong> who help us host, analyze, or operate the Service (under
            confidentiality obligations)
          </li>
          <li>
            <strong>Legal authorities</strong> when required by law or to protect rights, safety, and security
          </li>
          <li>
            <strong>Business transfers</strong> if we are involved in a merger, acquisition, or asset sale
          </li>
        </ul>
        <p>We do not sell your personal information as a standalone consumer data product.</p>
      </Section>

      <Section title="5. Cookies and tracking">
        <p>
          We and our partners may use cookies and similar technologies to remember preferences, understand traffic,
          and attribute affiliate activity. You can control cookies through your browser settings; disabling some
          cookies may limit parts of the Service.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          We retain information for as long as needed to provide the Service, meet legal obligations, resolve
          disputes, and enforce agreements. Retention periods vary by data type and purpose.
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We use reasonable administrative, technical, and organizational measures to protect information. No
          method of transmission or storage is completely secure; we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="8. International visitors">
        <p>
          The Service may be hosted or operated in the United States or other countries. If you access it from
          elsewhere, your information may be transferred to and processed in those locations, which may have
          different data-protection rules than your home country.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          The Service is not directed to children under 13 (or the equivalent minimum age in your jurisdiction).
          We do not knowingly collect personal information from children. If you believe a child has provided
          information to us, contact us and we will take appropriate steps to delete it.
        </p>
      </Section>

      <Section title="10. Your choices">
        <p>
          Depending on where you live, you may have rights to access, correct, delete, or restrict certain
          personal information, or to object to certain processing. To make a request, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . We may need to verify your identity before responding.
        </p>
      </Section>

      <Section title="11. Third-party sites">
        <p>
          Links to airlines, OTAs, and other sites are provided for convenience. Their privacy practices are their
          own; review their policies before sharing information or completing a booking.
        </p>
      </Section>

      <Section title="12. Changes">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Effective date&quot; above will change
          when we do. Continued use of the Service after an update means you accept the revised policy.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . Or visit{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
          .
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
