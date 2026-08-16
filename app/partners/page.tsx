import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, PARTNERS_EMAIL, SUPPORT_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Partners",
  description: `Partner with ${SITE_NAME} — travel affiliates, data providers, and distribution.`,
};

export default function PartnersPage() {
  return (
    <ContentPage
      title="Partners"
      description={`Work with ${SITE_NAME} to reach travelers comparing flights.`}
      wide
    >
      <Section title="Partner with SkyLerb">
        <p>
          {SITE_NAME} connects travelers comparing flights with airlines and travel providers where bookings are
          completed. {SITE_TAGLINE}. We are interested in partnerships that improve search quality, coverage, and
          transparency for users.
        </p>
      </Section>

      <Section title="Partnership types">
        <div className="space-y-4 not-prose">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900 mb-2">Travel & affiliate partners</p>
            <p className="text-sm text-slate-600">
              Airlines, OTAs, metasearch feeds, and booking platforms that want qualified click-through traffic from
              comparison searches.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900 mb-2">Data & technology</p>
            <p className="text-sm text-slate-600">
              Fare data, airport content, analytics, fraud prevention, hosting, and infrastructure that keeps search
              fast and reliable.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900 mb-2">Marketing & content</p>
            <p className="text-sm text-slate-600">
              Co-marketing, route campaigns, and educational content — as long as messaging stays accurate about how
              booking works.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What we look for">
        <BulletList
          items={[
            "Accurate, timely fare and availability data.",
            "Clear landing pages where users complete booking after click-through.",
            "Transparent fees and fare rules on the provider side.",
            "Reliable tracking and reporting for partner programs.",
            "Alignment with honest metasearch practices — no bait-and-switch pricing.",
          ]}
        />
      </Section>

      <Section title="How to pitch a partnership">
        <Steps
          items={[
            "Email partners@skylerb.com with your company name and partnership type.",
            "Describe your product, geographic coverage, and integration options (API, affiliate link, white-label, etc.).",
            "Share expected traffic quality, markets, and any commercial model you propose.",
            "Include a contact name, role, and best way to schedule a follow-up call.",
          ]}
        />
        <Callout>
          <p>
            Send inquiries to{" "}
            <a href={`mailto:${PARTNERS_EMAIL}`} className="text-brand-600 hover:underline font-bold">
              {PARTNERS_EMAIL}
            </a>
            . We review every message — response times vary by volume.
          </p>
        </Callout>
      </Section>

      <Section title="Traveler support">
        <p>
          If you are a traveler who needs help with a search or an existing booking, this is not the right inbox.
          Please use{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>{" "}
          or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>{" "}
          instead.
        </p>
        <p>
          Read more{" "}
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            about {SITE_NAME}
          </Link>{" "}
          or visit the{" "}
          <Link href="/help" className="text-brand-600 hover:underline font-medium">
            Help Center
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
