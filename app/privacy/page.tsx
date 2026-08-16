import type { Metadata } from "next";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy" description={`Last updated: ${LEGAL_EFFECTIVE_DATE}`}>
      <Section title="Introduction">
        <p>
          This Privacy Policy governs the privacy practices of skylerb.com, including its subdomains and associated
          web-based services (collectively, the &quot;Website&quot;), as owned and operated by {SITE_NAME}. We
          respect the privacy of our users and explain below how we collect, use, and protect information.
        </p>
      </Section>

      <Section title="What data we collect">
        <p>
          <strong>Information you provide.</strong> Email address, first name, and any details you include when
          contacting us, requesting help, or (if offered) subscribing to alerts.
        </p>
        <p>
          <strong>Automatic collection.</strong> Technical and usage data such as cookies, device information, IP
          address, referral URLs, browser type, pages viewed, search activity, and log data.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          We may use cookies to remember searches and preferences, understand traffic, improve performance, and
          support advertising or affiliate tracking. You can manage cookies in your browser; disabling some cookies
          may limit Website features.
        </p>
      </Section>

      <Section title="Location">
        <p>
          We may use IP-based or similar technology to estimate your city or region for relevant travel results or
          ads. We do not share your precise current location with other users. You can disable location access in
          your device or browser settings.
        </p>
      </Section>

      <Section title="How we use information">
        <p>
          To operate and improve the Website, respond to inquiries, send communications you requested or consented
          to, measure engagement, prevent fraud or misuse, personalize content, and comply with law.
        </p>
      </Section>

      <Section title="Sharing">
        <p>
          We do not sell or rent your personally identifiable information for others&apos; independent marketing. We
          may share information with service providers (hosting, analytics, email, security, advertising) that help
          us run the Website, when you consent, when needed to provide a feature you requested, or when required by
          law. When you click a travel offer, the receiving provider may collect information under its own policy.
        </p>
      </Section>

      <Section title="Legal disclosures">
        <p>
          We may disclose information when required by law or legal process, to assist authorities, enforce our
          Terms, prevent fraud or harm, or protect the rights and safety of {SITE_NAME}, users, or others.
        </p>
      </Section>

      <Section title="Security & retention">
        <p>
          We use reasonable safeguards, but no method of transmission or storage is fully secure. We retain
          information only as long as reasonably needed for the purposes in this policy, legal obligations, disputes,
          and fraud prevention.
        </p>
      </Section>

      <Section title="Your choices & GDPR">
        <p>
          You may unsubscribe from marketing emails via the link in those emails or by contacting us. Where GDPR or
          similar laws apply, you may have rights to access, correct, delete, restrict, or object to certain
          processing, and to data portability. Contact us to make a request; we may need to verify your identity.
        </p>
      </Section>

      <Section title="Children">
        <p>
          The Website is not directed to children under 13, and we do not knowingly collect their personal
          information. Contact us if you believe a child has provided information so we can delete it.
        </p>
      </Section>

      <Section title="Third-party sites">
        <p>
          Links to airlines and other sites are for convenience. Their privacy practices are their own—review their
          policies before sharing information or booking.
        </p>
      </Section>

      <Section title="Updates & contact">
        <p>
          We may update this Privacy Policy by posting a new version on the Website. Questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
