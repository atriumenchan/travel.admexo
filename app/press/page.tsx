import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, PRESS_EMAIL, SITE_DISCLAIMER } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Press",
  description: `Press and media resources for ${SITE_NAME}, an independent flight metasearch platform.`,
};

export default function PressPage() {
  return (
    <ContentPage
      eyebrow="Company"
      title="Press"
      description="Media inquiries, brand facts, and how to describe Skylerb accurately."
    >
      <Section title="Boilerplate">
        <p>
          {SITE_NAME} is an independent flight metasearch and comparison platform. Travelers use {SITE_NAME} to
          search and compare flight options across airlines and booking sites. {SITE_NAME} does not sell or issue
          tickets; users complete bookings with airlines or third-party travel providers. {SITE_NAME} may receive
          compensation from partners when users click through or book.
        </p>
      </Section>

      <Section title="Key facts">
        <ul className="list-disc pl-5 space-y-2">
          <li>Category: Flight metasearch / fare comparison</li>
          <li>Not an airline, GDS, or travel agency</li>
          <li>Bookings completed on partner / airline sites</li>
          <li>Positioning: transparent comparison, no airline impersonation</li>
        </ul>
      </Section>

      <Section title="Media contact">
        <p>
          For interviews, fact-checks, or asset requests, email{" "}
          <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {PRESS_EMAIL}
          </a>
          .
        </p>
        <p>
          Company overview:{" "}
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About Us
          </Link>
          .
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
