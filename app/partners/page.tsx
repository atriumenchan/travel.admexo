import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, PARTNERS_EMAIL, SITE_DISCLAIMER } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Partners",
  description: `Partner with ${SITE_NAME}. Affiliate, airline, and OTA partnership inquiries.`,
};

export default function PartnersPage() {
  return (
    <ContentPage
      eyebrow="Company"
      title="Partners"
      description="Airlines, OTAs, and affiliate networks — let's help travelers compare and book."
    >
      <Section title={`Partnering with ${SITE_NAME}`}>
        <p>
          {SITE_NAME} sends intent-rich flight shoppers to airlines and travel providers to complete bookings. We
          care about accurate fares, clear redirects, and an experience that doesn&apos;t mislead travelers about
          who is selling the ticket.
        </p>
      </Section>

      <Section title="Who we work with">
        <ul className="list-disc pl-5 space-y-2">
          <li>Airlines and airline metasearch / white-label partners</li>
          <li>Online travel agencies (OTAs)</li>
          <li>Affiliate and performance networks</li>
          <li>Technology providers that improve search quality or conversion</li>
        </ul>
      </Section>

      <Section title="What we look for">
        <ul className="list-disc pl-5 space-y-2">
          <li>Reliable deep links and landing experiences</li>
          <li>Competitive, up-to-date fare feeds where applicable</li>
          <li>Transparent commercial terms</li>
          <li>Alignment with honest, non-impersonating consumer messaging</li>
        </ul>
      </Section>

      <Section title="Get in touch">
        <p>
          Email partnership details to{" "}
          <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {PARTNERS_EMAIL}
          </a>
          . Include your company, geography, and how you&apos;d like to work together.
        </p>
        <p>
          Travelers looking for support should use{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>{" "}
          instead.
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
