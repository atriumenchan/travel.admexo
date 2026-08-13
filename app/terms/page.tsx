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
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}. Rules for using our independent flight comparison website.`,
};

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of Service"
      description={`Effective date: ${LEGAL_EFFECTIVE_DATE}`}
    >
      <Section title="1. Agreement">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of {SITE_URL} and related
          services operated by {SITE_NAME} (the &quot;Service&quot;). By using the Service, you agree to these
          Terms. If you do not agree, do not use the Service.
        </p>
      </Section>

      <Section title={`2. What ${SITE_NAME} is (and is not)`}>
        <p>
          {SITE_NAME} is an independent flight metasearch and comparison platform. We display flight options for
          informational and comparison purposes and may redirect you to airlines or third-party travel providers to
          complete a booking.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>We are not an airline, travel agency, or ticket issuer.</li>
          <li>We do not sell, process, or fulfill airline tickets.</li>
          <li>We are not a customer-service or reservation desk for any airline.</li>
          <li>
            Airline names and trademarks belong to their owners and are used only to identify comparable options;
            no affiliation or endorsement is implied.
          </li>
        </ul>
      </Section>

      <Section title="3. Bookings and third parties">
        <p>
          When you select a flight option, you are redirected to an airline or other travel provider. Your contract
          for the ticket is solely with that provider. Their terms, fare rules, baggage policies, change/cancel
          fees, and privacy policies apply. {SITE_NAME} is not a party to your booking and is not responsible for
          the provider&apos;s performance, pricing errors, schedule changes, cancellations, or customer support for
          your reservation.
        </p>
      </Section>

      <Section title="4. Prices and availability">
        <p>
          Fares, taxes, fees, and availability shown on the Service are provided by third parties or partners and
          may be estimates, outdated, or subject to change without notice until you complete a booking with the
          provider. Always confirm the final price and terms on the provider&apos;s site before paying.
        </p>
      </Section>

      <Section title="5. Affiliate relationships">
        <p>
          {SITE_NAME} may receive compensation from partners when users click through or complete a booking. This
          does not increase the fare charged by the airline or agency for that booking.
        </p>
      </Section>

      <Section title="6. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the Service for any unlawful purpose</li>
          <li>Scrape, crawl, or harvest data in a way that burdens or disrupts the Service</li>
          <li>Attempt to bypass security, interfere with the Service, or reverse engineer it except as allowed by law</li>
          <li>Misrepresent your identity or affiliation</li>
          <li>Use the Service to send spam or malicious content</li>
        </ul>
      </Section>

      <Section title="7. Intellectual property">
        <p>
          The Service&apos;s branding, design, text, and software (excluding third-party marks and content) are owned
          by {SITE_NAME} or its licensors. You may use the Service for personal, non-commercial flight comparison.
          You may not copy or reuse substantial parts of the Service without permission.
        </p>
      </Section>

      <Section title="8. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE
          DO NOT WARRANT THAT RESULTS ARE COMPLETE, ACCURATE, OR ERROR-FREE, OR THAT THE SERVICE WILL BE
          UNINTERRUPTED.
        </p>
      </Section>

      <Section title="9. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()} AND ITS AFFILIATES, OFFICERS, AND
          PARTNERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
          ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE OR ANY BOOKING MADE WITH A
          THIRD PARTY. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE WILL NOT EXCEED ONE HUNDRED U.S.
          DOLLARS (US $100).
        </p>
      </Section>

      <Section title="10. Indemnity">
        <p>
          You agree to indemnify and hold harmless {SITE_NAME} and its affiliates from claims, damages, and expenses
          (including reasonable attorneys&apos; fees) arising from your misuse of the Service or violation of these
          Terms.
        </p>
      </Section>

      <Section title="11. Changes and termination">
        <p>
          We may modify these Terms or the Service at any time. Continued use after changes means you accept the
          updated Terms. We may suspend or stop providing the Service without notice.
        </p>
      </Section>

      <Section title="12. Governing law">
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-law
          rules, unless mandatory consumer protections in your jurisdiction require otherwise.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          Questions about these Terms:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . See also our{" "}
          <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact
          </Link>{" "}
          page.
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
