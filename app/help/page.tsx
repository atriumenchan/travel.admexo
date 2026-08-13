import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/components/ContentPage";
import { SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Help Center for ${SITE_NAME}. Answers about searching flights, bookings, and support.`,
};

const FAQS = [
  {
    q: `Does ${SITE_NAME} sell plane tickets?`,
    a: `No. ${SITE_NAME} is a comparison / metasearch site. When you choose a flight, you are sent to an airline or travel partner to finish the booking on their website.`,
  },
  {
    q: "Why did the price change when I clicked through?",
    a: "Airlines and OTAs update fares constantly. The price on their site at checkout is the one that applies. Always confirm the total before you pay.",
  },
  {
    q: "Can you change or cancel my booking?",
    a: `No. ${SITE_NAME} does not hold your reservation. Contact the airline or agency listed on your confirmation email or receipt.`,
  },
  {
    q: "Do you charge booking fees?",
    a: `We don't add our own booking fee on top of the provider's fare. We may receive affiliate compensation from partners when you click through or book.`,
  },
  {
    q: `Are you United / Delta / another airline's reservation desk?`,
    a: `No. ${SITE_NAME} is independent and is not affiliated with or endorsed by any airline. We cannot access airline booking systems or act as their call center.`,
  },
  {
    q: "How do I search for flights?",
    a: "Enter origin, destination, and dates on the homepage search form, then compare results. You can also start from Popular Destinations or Today's Deals.",
  },
];

export default function HelpPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Help Center"
      description="Quick answers about searching, booking redirects, and what we can (and can't) help with."
    >
      <Section title="Popular questions">
        <div className="space-y-5">
          {FAQS.map((item) => (
            <div key={item.q} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Still need help?">
        <p>
          For questions about using {SITE_NAME} (not existing airline tickets), reach us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>{" "}
          or call{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_PHONE_DISPLAY}
          </a>
          .
        </p>
        <p>
          Prefer a full contact page?{" "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
