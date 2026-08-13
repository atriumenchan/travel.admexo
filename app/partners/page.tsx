import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, PARTNERS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Partners",
  description: `Partnership inquiries for ${SITE_NAME}.`,
};

export default function PartnersPage() {
  return (
    <ContentPage title="Partners">
      <Section title="Partnerships">
        <p>
          For partnership inquiries with {SITE_NAME}, email{" "}
          <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {PARTNERS_EMAIL}
          </a>
          .
        </p>
        <p>
          If you need traveler support, use{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>{" "}
          instead.
        </p>
      </Section>
    </ContentPage>
  );
}
