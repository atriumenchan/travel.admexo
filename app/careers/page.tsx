import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, CAREERS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at ${SITE_NAME}.`,
};

export default function CareersPage() {
  return (
    <ContentPage title="Careers">
      <Section title="Open roles">
        <p>We don&apos;t have any open positions right now.</p>
        <p>
          If you&apos;d like to get in touch anyway, email{" "}
          <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {CAREERS_EMAIL}
          </a>
          .
        </p>
        <p>
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About {SITE_NAME}
          </Link>
        </p>
      </Section>
    </ContentPage>
  );
}
