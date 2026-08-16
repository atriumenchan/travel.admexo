import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, {
  Section,
  Faq,
  Steps,
  Callout,
  BulletList,
  Scenario,
  InfoTable,
} from "@/components/ContentPage";
import { BOOKING_SCENARIOS, FARE_GLOSSARY, SEARCH_TIPS } from "@/lib/helpContent";
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
  description: `Complete guide to using ${SITE_NAME} — search, compare, book, troubleshoot, and get support.`,
};

export default function HelpPage() {
  return (
    <ContentPage
      title="Help Center"
      description={`Everything you need to search smarter, book safely, and know who to call. ${SITE_TAGLINE}.`}
      wide
    >
      <Callout title={`${SITE_NAME} is an independent flight comparison site`}>
        <p>
          We help you search and compare fares from airlines and travel partners. We do <strong>not</strong> sell
          tickets, operate flights, check you in, or manage reservations. When you choose a fare, you leave {SITE_NAME}{" "}
          and complete payment on the provider shown in the results.
        </p>
      </Callout>

      <Section title="Quick navigation">
        <InfoTable
          rows={[
            { label: "New to SkyLerb?", value: "Start with Getting started and Search tips below." },
            { label: "Ready to book?", value: "Read Booking & redirects and Before you pay checklist." },
            { label: "Already purchased?", value: "Jump to Existing bookings and Common scenarios." },
            { label: "Something broken?", value: "See Troubleshooting and Contact support." },
            { label: "Confused by a term?", value: "Scroll to Glossary at the bottom." },
          ]}
        />
      </Section>

      <Section title="Getting started — your first search">
        <p>The homepage search bar is the fastest way to compare flights across providers:</p>
        <Steps
          items={[
            "Open skylerb.com and find the search form at the top of the page.",
            "Type your departure city or airport — pick the suggestion that matches the airport you can actually reach.",
            "Type your destination the same way.",
            "Select a departure date on the calendar. For round trips, add a return date.",
            "Set passengers (adults, children, infants) if the form shows those controls.",
            "Press Search and wait for results — loading can take 10–30 seconds depending on route and partners.",
            "Scan the list for price, total duration, stops, and airline. Click the offer you want.",
            "You will be redirected to the booking site — finish there, not on SkyLerb.",
          ]}
        />
        <Callout title="One-way vs round trip">
          <p>
            One-way searches show single-direction pricing. Round-trip searches often show bundled return pricing that
            may be cheaper than two one-ways — try both if you are flexible. Multi-city trips may need separate
            one-way searches unless the partner site supports multi-city booking after redirect.
          </p>
        </Callout>
      </Section>

      <Section title="Search tips — find better fares">
        <p>Small changes to how you search can surface meaningfully different prices:</p>
        <BulletList items={SEARCH_TIPS} />
        <Callout tone="warn">
          <p>
            The cheapest fare is not always the best value. Add bag fees, seat fees, and change penalties before you
            decide. A slightly higher fare with a free carry-on can cost less overall than basic economy plus bags.
          </p>
        </Callout>
      </Section>

      <Section title="Understanding your results">
        <p>Each row in the results list is an offer from a travel partner, not a ticket you hold yet:</p>
        <BulletList
          items={[
            "Headline price is usually per adult before optional extras — taxes may be included or shown separately depending on the partner.",
            "Total travel time includes layovers — a 18-hour trip with a long connection may be cheaper but harder than a nonstop.",
            "Multiple airlines on one itinerary often means codeshare or partner tickets — verify the operating carrier for each leg.",
            "Some prices are cached — if a fare fails at checkout, refresh the search; seats may have sold out.",
            "Currency may convert at checkout based on the partner site and your card issuer.",
            "SkyLerb may rank or sort offers for relevance; we do not control inventory or final pricing.",
          ]}
        />
        <p className="pt-2 font-semibold text-slate-800">Before you click an offer, check:</p>
        <Steps
          items={[
            "Departure and arrival airports — some listings use secondary airports farther from the city.",
            "Number of stops and minimum connection time.",
            "Whether baggage is included (carry-on and checked).",
            "Which website will sell the ticket — airline direct vs OTA affects support and changes later.",
          ]}
        />
      </Section>

      <Section title="Booking & redirects — what happens next">
        <Steps
          items={[
            "Click the flight or price you want from the results list.",
            "Your browser opens a new tab or redirects to an airline or online travel agency.",
            "The partner site reloads the itinerary — confirm dates, times, and passenger count match what you picked.",
            "Enter legal names exactly as on passports or government ID.",
            "Add bags, seats, insurance, or other extras if you need them — skipping now can cost more at the airport.",
            "Enter payment on the partner site. SkyLerb never sees your card number.",
            "Save the confirmation email and screenshot the booking reference (PNR).",
            "Download the airline app and add your trip using the confirmation number for check-in and alerts.",
          ]}
        />
        <Callout tone="warn" title="If confirmation does not arrive">
          <Steps
            items={[
              "Wait 15–30 minutes — some OTAs send email in batches.",
              "Search all inboxes and spam for the merchant name on your card statement.",
              "Log in to the partner website with the email you used at checkout.",
              "Call the partner support line with your payment amount, date, and last four digits of your card.",
            ]}
          />
        </Callout>
      </Section>

      <Section title="Before you pay — final checklist">
        <BulletList
          items={[
            "Passenger names match travel documents — no nicknames unless they appear on the ID.",
            "Dates and times are correct — note AM/PM and time zone changes on international routes.",
            "Airports are correct — ORD vs MDW, JFK vs EWR, etc.",
            "Fare rules explain change and refund policies — screenshot them if non-refundable.",
            "Baggage allowance matches what you plan to bring.",
            "Contact email and phone on the booking are ones you monitor through travel day.",
            "Total price on the payment screen matches what you expected including all fees.",
          ]}
        />
      </Section>

      <Section title="After you book — keep these handy">
        <InfoTable
          rows={[
            {
              label: "Confirmation email",
              value: "Proof of purchase from the airline or OTA — forward it to travel companions.",
            },
            {
              label: "PNR / record locator",
              value: "6-character code used on airline websites and at check-in.",
            },
            {
              label: "ETicket number",
              value: "13-digit ticket number if issued — needed for some changes and mileage credit.",
            },
            {
              label: "Merchant receipt",
              value: "Card statement entry showing who charged you — use this if support asks who sold the fare.",
            },
            {
              label: "Fare rules screenshot",
              value: "Useful if you later dispute change fees or refund eligibility.",
            },
          ]}
        />
      </Section>

      <Section title="Common scenarios — step by step">
        <p>Real situations travelers run into. Follow the steps for your case:</p>
        <div className="space-y-4 not-prose">
          {BOOKING_SCENARIOS.map((s) => (
            <Scenario
              key={s.title}
              title={s.title}
              problem={s.problem}
              solution={<Steps items={s.steps} />}
            />
          ))}
        </div>
      </Section>

      <Section title="Existing bookings — who to contact">
        <p>SkyLerb cannot access airline reservation systems. Use this routing guide:</p>
        <InfoTable
          rows={[
            {
              label: "Change dates or times",
              value: "Airline or agency on your confirmation — use manage booking online first.",
            },
            {
              label: "Cancel and refund",
              value: "Seller on your receipt — refund rules are in your fare type, not on SkyLerb.",
            },
            {
              label: "Add bags or seats",
              value: "Operating airline website or app, or the OTA if they sold the ticket.",
            },
            {
              label: "Check-in",
              value: "Operating airline — OTAs do not run check-in counters.",
            },
            {
              label: "Delay, cancellation, IRROPS",
              value: "Operating airline at the airport or via their rebooking desk / phone line.",
            },
            {
              label: "Lost baggage",
              value: "Airline baggage office at arrival airport before leaving the terminal.",
            },
            {
              label: "Miles / loyalty credit",
              value: "Operating airline frequent flyer program — may need ticket number.",
            },
            {
              label: "Chargeback / bank dispute",
              value: "Your card issuer after you documented contact with the merchant.",
            },
          ]}
        />
        <Callout title={`When ${SITE_NAME} support can still help`}>
          <BulletList
            items={[
              "Running a new comparison search for backup flights.",
              "Explaining how you got from SkyLerb to a partner site.",
              "Website bugs, broken search, or pages not loading.",
              "Clarifying that we are not the airline — and pointing you to the right issuer.",
            ]}
          />
        </Callout>
      </Section>

      <Section title="Frequently asked questions">
        <div className="space-y-4 not-prose">
          <Faq question={`Does ${SITE_NAME} sell airline tickets?`}>
            <p>
              No. {SITE_NAME} is a metasearch engine. We display offers; airlines and OTAs sell tickets and collect
              payment on their own sites.
            </p>
          </Faq>

          <Faq question="Can you change, cancel, or refund my flight?">
            <p>
              No. Only the issuer on your confirmation can modify a ticket. We do not have your PNR in our systems.
            </p>
            <Steps
              items={[
                "Find your confirmation email.",
                "Note the selling company (airline or OTA) and PNR.",
                "Visit their help center or call the number on the confirmation.",
                "Have ticket number, passenger names, and payment details ready.",
              ]}
            />
          </Faq>

          <Faq question={`Is ${SITE_NAME} affiliated with airlines shown in results?`}>
            <p>
              No. Airline names and logos identify flights available for comparison. No endorsement or agency
              relationship is implied.
            </p>
          </Faq>

          <Faq question="Why is the price different after I click through?">
            <p>
              Fares are dynamic. Between our search snapshot and the partner checkout, seats may sell, taxes update,
              or currency convert differently. Always treat the checkout total as final.
            </p>
          </Faq>

          <Faq question="Is the cheapest result always available?">
            <p>
              Not guaranteed. Partners sometimes show cached availability. If checkout fails, rerun search or pick the
              next fare — do not assume the list is a live seat map.
            </p>
          </Faq>

          <Faq question="Should I book with the airline or an OTA?">
            <p>
              Airline direct often simplifies changes and day-of-travel support. OTAs sometimes bundle deals or
              multi-airline itineraries. Compare fare rules and who you will call if plans change.
            </p>
          </Faq>

          <Faq question="Can I hold a fare on SkyLerb without paying?">
            <p>
              No. Holds and 24-hour free cancellation (where offered) happen on the partner site after redirect — check
              their policies during checkout.
            </p>
          </Faq>

          <Faq question="Do you store my passport or payment details?">
            <p>
              Payment is entered on partner sites. We may store cookies and usage data to run the website — see{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </Faq>

          <Faq question="Can I search for someone else?">
            <p>
              Yes — you can search any route. Passenger names are entered on the booking site. Ensure the traveler&apos;s
              details match their ID at checkout.
            </p>
          </Faq>

          <Faq question="Are taxes and fees included in listed prices?">
            <p>
              It varies by partner and route. Some show all-in totals; others add taxes at checkout. Review the full
              breakdown before paying.
            </p>
          </Faq>

          <Faq question="The search widget is blank or spinning — what now?">
            <Steps
              items={[
                "Hard refresh the page (Ctrl+F5 or Cmd+Shift+R).",
                "Disable ad blockers and privacy extensions for skylerb.com.",
                "Try incognito/private mode or another browser.",
                "Switch from Wi‑Fi to mobile data — some networks block travel scripts.",
                "Update your browser to the latest version.",
                "Email support@skylerb.com with device, browser version, route searched, and a screenshot.",
              ]}
            />
          </Faq>

          <Faq question="I clicked the wrong flight — can SkyLerb undo it?">
            <p>
              If you already paid on a partner site, contact that seller immediately. If you only clicked but did not
              pay, close the tab and search again — no booking was made on SkyLerb.
            </p>
          </Faq>

          <Faq question="Does SkyLerb charge a service fee?">
            <p>
              Searching on {SITE_NAME} is free. Any service or booking fees appear on the partner checkout page — read
              the total before you confirm payment.
            </p>
          </Faq>
        </div>
      </Section>

      <Section title="Troubleshooting the website">
        <BulletList
          items={[
            "Results never load — disable blockers, retry, or email us with your route and browser.",
            "Wrong airport suggested — type the 3-letter code (e.g. SFO) instead of the city name.",
            "Calendar will not open — try desktop site or another device; clear cache if stuck.",
            "Redirect opened a blank tab — allow pop-ups for skylerb.com and retry the click.",
            "Prices look unrealistic — verify on the partner site; report obvious errors with screenshots.",
            "Mobile layout issues — rotate device or use desktop for complex multi-passenger searches.",
          ]}
        />
      </Section>

      <Section title="Travel safety & security tips">
        <BulletList
          items={[
            "Book only on HTTPS pages with a recognizable airline or agency domain after leaving SkyLerb.",
            "Never wire money or pay by gift card for flights — legitimate sellers take standard card payments on their site.",
            "SkyLerb support will not ask for your full card number or password by email.",
            "Verify visa and passport validity for international trips — comparison sites do not check immigration rules.",
            "Arrive at the airport early for international flights — documentation checks take time.",
          ]}
        />
      </Section>

      <Section title="Glossary">
        <div className="space-y-4 not-prose">
          {FARE_GLOSSARY.map((item) => (
            <div key={item.term} className="rounded-lg border border-slate-100 p-4">
              <p className="font-bold text-slate-900">{item.term}</p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Before you call or email support">
        <p>Gather this information so our team can help on the first reply:</p>
        <Steps
          items={[
            "Describe your goal — new search, understand a result, or website error.",
            "Route: origin, destination, dates, number of passengers.",
            "Device and browser (e.g. Android Chrome, Mac Safari).",
            "Screenshots of any error or unexpected price.",
            "For ticket issues: airline/OTA name, PNR, and what you already tried with them.",
            "Best callback number and timezone if you want a phone follow-up.",
          ]}
        />
      </Section>

      <Section title="Contact support">
        <p>{SITE_NAME} agents help with comparison tools and website questions — not airline operations.</p>
        <InfoTable
          rows={[
            {
              label: "Phone",
              value: `${SUPPORT_PHONE_DISPLAY} — best for urgent search help`,
            },
            {
              label: "Email",
              value: `${SUPPORT_EMAIL} — include screenshots and route details`,
            },
            {
              label: "Contact page",
              value: "Full routing guide for who handles what",
            },
            {
              label: "Helpful links",
              value: "Privacy, Terms, About — footer of every page",
            },
          ]}
        />
        <p className="pt-2">
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_PHONE_DISPLAY}
          </a>
          {" · "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {SUPPORT_EMAIL}
          </a>
          {" · "}
          <Link href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact Us
          </Link>
        </p>
        <p className="text-xs text-slate-400 pt-4">{SITE_DISCLAIMER}</p>
      </Section>
    </ContentPage>
  );
}
