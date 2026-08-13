import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, SITE_DISCLAIMER } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} is an independent flight comparison website.`,
};

export default function AboutPage() {
  return (
    <ContentPage title={`About ${SITE_NAME}`}>
      <Section title="Who we are">
        <p>
          {SITE_NAME} is an independent flight metasearch website. We help you compare flight options from airlines
          and booking sites, then send you to those providers to complete your booking.
        </p>
        <p>
          We are not an airline or a travel agency. We do not sell or issue tickets.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact us
          </Link>{" "}
          or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
