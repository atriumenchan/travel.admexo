import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, PRESS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Press",
  description: `Press contact for ${SITE_NAME}.`,
};

export default function PressPage() {
  return (
    <ContentPage title="Press">
      <Section title="Media inquiries">
        <p>
          For press questions about {SITE_NAME}, email{" "}
          <a href={`mailto:${PRESS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {PRESS_EMAIL}
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
