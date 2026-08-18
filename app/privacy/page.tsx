import type { Metadata } from "next";
import ContentPage, { Section, BulletList, Callout } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy" description={`Last updated: ${LEGAL_EFFECTIVE_DATE}`} wide>
      <Section title="Introduction">
        <p>
          This Privacy Policy governs the privacy practices of skylerb.com, including its subdomains and associated
          web-based services (collectively, the &quot;Website&quot;), as owned and operated by {SITE_NAME}. We
          respect the privacy of our users and explain below how we collect, use, and protect information.
        </p>
      </Section>

      <Section title="What data we collect">
        <p>
          <strong>Information you provide.</strong> Email address, name, phone if you call or write us, and any
          details you include when contacting support, requesting help, reporting bugs, or subscribing to alerts.
        </p>
        <p>
          <strong>Search activity.</strong> Routes, dates, and airports you enter may be processed to display results
          and improve the service. We do not receive your passport or payment card on SkyLerb — those are entered on
          partner booking sites.
        </p>
        <p>
          <strong>Automatic collection.</strong> Technical and usage data such as cookies, device information, IP
          address, referral URLs, browser type, pages viewed, click paths, approximate location derived from IP,
          and server log data.
        </p>
      </Section>

      <Section title="How we use cookies & similar tech">
        <BulletList
          items={[
            "Essential cookies — keep the site functioning and remember basic preferences.",
            "Analytics — understand which pages are used and fix performance issues.",
            "Affiliate / partner tracking — attribute referrals when you click through to book.",
            "Advertising — may support relevant ads or retargeting where enabled and lawful.",
          ]}
        />
        <p>
          You can block or delete cookies in your browser settings. Some features — especially search widgets and
          partner redirects — may not work correctly if essential cookies are disabled.
        </p>
      </Section>

      <Section title="Location">
        <p>
          We may use your IP address to estimate your city or nearby airport so we can pre-fill search origin and
          show route ideas from where you are. If we cannot tell, we fall back to New York. We do not use precise GPS
          unless you later choose that, and we do not share your location with other users.
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

      <Section title="Third-party sites & booking partners">
        <p>
          When you click a flight offer, you leave {SITE_NAME}. Airlines, OTAs, and payment processors collect data
          under their own privacy policies. We encourage you to read those policies before entering personal or payment
          information.
        </p>
        <Callout>
          <p>
            Example: if you book on an airline website after leaving SkyLerb, that airline may store your frequent
            flyer number, passport details, and payment method according to its policy — not ours.
          </p>
        </Callout>
      </Section>

      <Section title="Your choices — practical steps">
        <BulletList
          items={[
            "Marketing emails — use the unsubscribe link in any promotional message we send.",
            "Cookies — adjust browser settings or use industry opt-out tools where available.",
            "Location — disable location permissions in device settings if you do not want IP-based estimates.",
            "Access / deletion requests — email support@skylerb.com with subject “Privacy request” and enough detail to verify you.",
            "Do Not Sell / Share — where applicable law provides opt-out rights, contact us and we will respond per law.",
          ]}
        />
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
