import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Faq, Steps, Callout, BulletList } from "@/components/ContentPage";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DISCLAIMER,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Help using ${SITE_NAME} — search flights, understand results, booking redirects, and when to contact support.`,
};

export default function HelpPage() {
  return (
    <ContentPage
      title="Help Center"
      description={`Guides and answers for using ${SITE_NAME}. ${SITE_TAGLINE}.`}
      wide
    >
      <Callout title={`${SITE_NAME} is an independent flight comparison site`}>
        <p>
          We help you search and compare fares. We do <strong>not</strong> sell tickets, operate flights, or manage
          airline reservations. When you pick a fare, you complete booking on the airline or travel partner shown in
          the results.
        </p>
      </Callout>

      <Section title="Getting started — search for flights">
        <p>Use the search bar on the homepage to compare options in one place:</p>
        <Steps
          items={[
            "Enter your departure airport or city (for example, JFK or New York).",
            "Enter your destination airport or city (for example, LHR or London).",
            "Choose your departure date. Add a return date if you need a round trip.",
            "Select the number of passengers and cabin class if those options appear.",
            "Click Search and wait for results to load from our travel partners.",
            "Compare prices, times, and airlines, then click the offer you want to continue on the provider site.",
          ]}
        />
        <p className="pt-2">
          Tip: flexible dates can surface cheaper fares. Try shifting your trip by a day or two if prices look high.
        </p>
      </Section>

      <Section title="Understanding your results">
        <BulletList
          items={[
            "Prices shown on SkyLerb are estimates from third-party providers and can change before you pay.",
            "The final price, taxes, baggage rules, and seat selection appear on the booking site — always review there before paying.",
            "Some results may include multiple airlines or codeshare flights. Check the itinerary details on the partner page.",
            "If a fare disappears, availability may have sold out or the provider updated pricing. Run the search again.",
            "We may earn a commission when you click through and book. This does not change the price you pay on the provider site.",
          ]}
        />
      </Section>

      <Section title="Booking & redirects — what happens next">
        <Steps
          items={[
            "Click the flight or price you want from the results list.",
            "You leave SkyLerb and land on an airline or travel agency website.",
            "Review the full itinerary, passenger details, baggage, and cancellation policy on that site.",
            "Enter traveler information and payment on the provider site — not on SkyLerb.",
            "Save your confirmation email and booking reference from the provider. That is your proof of purchase.",
          ]}
        />
        <Callout tone="warn">
          <p>
            If you do not receive a confirmation email within a reasonable time, check spam folders first, then
            contact the <strong>booking provider</strong> listed on your payment receipt — not SkyLerb.
          </p>
        </Callout>
      </Section>

      <Section title="Frequently asked questions">
        <div className="space-y-4 not-prose">
          <Faq question={`Does ${SITE_NAME} sell airline tickets?`}>
            <p>
              No. {SITE_NAME} is a metasearch engine. We display offers from airlines and travel partners. The actual
              sale, payment, and ticket issuance happen on their websites.
            </p>
          </Faq>

          <Faq question="Can you change, cancel, or refund my flight?">
            <p>
              No. Only the airline or agency that issued your ticket can do that. Find the company name and booking
              reference on your confirmation email, then contact them directly.
            </p>
            <p>
              <strong>What to do:</strong> Open your confirmation → note the booking reference (PNR) → visit the
              airline or agency help page → use their manage-booking tool or call their support line.
            </p>
          </Faq>

          <Faq question={`Is ${SITE_NAME} an airline or reservation desk?`}>
            <p>
              No. We are not affiliated with any airline. Airline names on this site identify flights you can
              compare — they do not mean we represent those airlines.
            </p>
          </Faq>

          <Faq question="Why is the price different after I click through?">
            <p>
              Fares update constantly. A provider may refresh availability, taxes, or currency conversion between
              our search and their checkout. Always confirm the final total on the booking page before paying.
            </p>
          </Faq>

          <Faq question="I was charged but have no ticket — what should I do?">
            <p>
              Contact the merchant shown on your bank or card statement first. If the charge came from an airline or
              online travel agency, their support team can trace the booking. Have your payment date, amount, and
              email address ready.
            </p>
          </Faq>

          <Faq question="Can I book baggage, seats, or special assistance through SkyLerb?">
            <p>
              Those extras are added during or after checkout on the provider site. Search here first, then manage
              add-ons with the airline or agency once your ticket is confirmed.
            </p>
          </Faq>

          <Faq question="Do you store my passport or payment details?">
            <p>
              Payment details are entered on partner booking sites, not on SkyLerb. We may collect limited technical
              data (like cookies and search activity) to run the site — see our{" "}
              <Link href="/privacy">Privacy Policy</Link> for details.
            </p>
          </Faq>

          <Faq question="The search widget is not loading — how do I fix it?">
            <p>Try these steps in order:</p>
            <BulletList
              items={[
                "Refresh the page and search again.",
                "Disable ad blockers or privacy extensions for this site and retry.",
                "Clear browser cache or try a private/incognito window.",
                "Switch browsers (Chrome, Safari, Firefox) or use mobile data instead of Wi‑Fi.",
                "If it still fails, email us with your device, browser, and a screenshot.",
              ]}
            />
          </Faq>
        </div>
      </Section>

      <Section title="Existing bookings — who to contact">
        <p>For trips you already purchased, contact the issuer on your confirmation:</p>
        <BulletList
          items={[
            "Schedule changes, delays, or missed connections → airline operating the flight.",
            "Cancellations and refunds → airline or agency that sold the ticket (check fare rules).",
            "Baggage lost or damaged → airline baggage office at the airport or their claims portal.",
            "Hotel, car, or package add-ons → the company that sold that portion of the trip.",
            "Credit card disputes → your bank, after you have tried the provider's support channel.",
          ]}
        />
        <Callout title="We can still help you with">
          <BulletList
            items={[
              "Running a new search on SkyLerb to compare alternative flights.",
              "Explaining how results and redirects work.",
              "Technical issues with the search tool on our website.",
              "Questions about what SkyLerb is and what we do not do.",
            ]}
          />
        </Callout>
      </Section>

      <Section title="Before you call or email support">
        <p>Have this ready so we can help faster:</p>
        <BulletList
          items={[
            "What you were trying to do (search, compare, understand a result).",
            "Origin, destination, and travel dates you entered.",
            "Browser and device (for example, iPhone Safari or Windows Chrome).",
            "Screenshots if something looked wrong on screen.",
            "For existing tickets: your booking reference and the airline or agency name — we cannot look up bookings for you, but we can point you in the right direction.",
          ]}
        />
      </Section>

      <Section title="Contact support">
        <p>Reach the {SITE_NAME} team for comparison and website help:</p>
        <BulletList
          items={[
            `Phone: ${SUPPORT_PHONE_DISPLAY} (tap to call on mobile)`,
            `Email: ${SUPPORT_EMAIL}`,
            `Contact form page: /contact`,
          ]}
        />
        <p>
          Phone:{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_PHONE_DISPLAY}
          </a>
          {" · "}
          Email:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          {" · "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
        </p>
        <p className="text-xs text-slate-400 pt-2">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
