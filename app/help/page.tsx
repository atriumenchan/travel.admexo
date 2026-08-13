import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Help for using ${SITE_NAME}.`,
};

export default function HelpPage() {
  return (
    <ContentPage title="Help Center">
      <Section title="Basics">
        <p>
          <strong>Does {SITE_NAME} sell tickets?</strong> No. We compare flight options. You book on the airline
          or travel site you choose.
        </p>
        <p>
          <strong>Can you change or cancel my booking?</strong> No. Contact the airline or agency on your
          confirmation.
        </p>
        <p>
          <strong>Are you an airline reservation desk?</strong> No. {SITE_NAME} is independent and not affiliated
          with any airline.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>{" "}
          or call{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_PHONE_DISPLAY}
          </a>
          . Or go to{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
