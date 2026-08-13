import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service" description={`Effective date: ${LEGAL_EFFECTIVE_DATE}`}>
      <Section title="Using the site">
        <p>
          By using {SITE_NAME}, you agree to these terms. {SITE_NAME} is an independent flight comparison website.
          We do not sell tickets, issue tickets, or act as an airline or travel agency.
        </p>
      </Section>

      <Section title="Bookings">
        <p>
          When you select a flight, you are redirected to an airline or travel provider. Your booking contract is
          with them. Prices and availability can change; confirm the final total on their site before you pay. For
          changes or cancellations, contact that provider — we cannot manage your reservation.
        </p>
      </Section>

      <Section title="Compensation">
        <p>
          We may receive compensation from partners when you click through or complete a booking. That does not add
          a fee from us on top of the provider&apos;s fare.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Don&apos;t misuse the site (including unlawful use, scraping that disrupts the service, or attempts to
          break security).
        </p>
      </Section>

      <Section title="Disclaimer">
        <p>
          The site is provided as is. Flight information comes from third parties and may be incomplete or out of
          date. To the fullest extent allowed by law, {SITE_NAME} is not liable for losses from using the site or
          from bookings made with third parties.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          . See also our{" "}
          <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
            Privacy Policy
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
