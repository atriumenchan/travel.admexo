import type { Metadata } from "next";
import Link from "next/link";
import SimpleSearchBar from "@/components/SimpleSearchBar";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import MobileAirlineSupportLanding from "@/components/MobileAirlineSupportLanding";
import { SITE_NAME, SITE_DISCLAIMER, SITE_TAGLINE } from "@/lib/siteConfig";
import type { AirlineSlug } from "@/lib/mobileAirlineLanding";

type AirlineLanding = {
  slug: string;
  airlineName: string;
  title: string;
  description: string;
  bullets: string[];
};

const LANDINGS: Record<string, AirlineLanding> = {
  southwest: {
    slug: "southwest",
    airlineName: "Southwest Airlines",
    title: "Southwest Airlines Flight Search & Fare Comparison",
    description:
      `Explore Southwest Airlines flight options on ${SITE_NAME}, an independent flight metasearch platform. We gather fare data from travel providers so you can view routes, schedules, and pricing in one place. We are not affiliated with Southwest Airlines and we do not issue tickets.`,
    bullets: [
      "Compare one-way and round-trip Southwest Airlines flights",
      "View estimated fares offered by different travel partners",
      "Check schedules for popular routes",
      "Filter results based on your travel preferences",
    ],
  },
  united: {
    slug: "united",
    airlineName: "United Airlines",
    title: "United Airlines Flight Search & Fare Comparison",
    description:
      `Explore United Airlines flight options on ${SITE_NAME}, an independent flight metasearch platform. We gather fare data from travel providers so you can view routes, schedules, and pricing in one place. We are not affiliated with United Airlines and we do not issue tickets.`,
    bullets: [
      "Compare one-way and round-trip United Airlines flights",
      "View estimated fares offered by different travel partners",
      "Check schedules for popular routes",
      "Filter results based on your travel preferences",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(LANDINGS).map((airline) => ({ airline }));
}

export function generateMetadata({ params }: { params: { airline: string } }): Metadata {
  const landing = LANDINGS[params.airline];
  if (!landing) {
    return { title: "Flight Search" };
  }
  return {
    title: `${landing.airlineName} Flight Search`,
    description: landing.description.slice(0, 155),
  };
}

export default function AirlineSearchLandingPage({ params }: { params: { airline: string } }) {
  const landing = LANDINGS[params.airline];

  if (!landing) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
        <Link href="/" className="text-brand-600 hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  const mobileSlug = params.airline as AirlineSlug;

  return (
    <>
      {(mobileSlug === "southwest" || mobileSlug === "united") && (
        <MobileAirlineSupportLanding slug={mobileSlug} />
      )}

      <div className="hidden md:block bg-surface min-h-screen">
      <section className="bg-hero-gradient px-4 pt-10 pb-8 sm:pt-14 sm:pb-10 text-center">
        <p className="text-accent-300 font-semibold text-sm mb-1">{SITE_TAGLINE}</p>
        <p className="text-indigo-100/90 text-sm mb-2">Search, Compare &amp; Save!</p>
        <div className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs text-white/90 mb-5 max-w-xl">
          {SITE_NAME} is an independent flight metasearch and comparison platform. We are not {landing.airlineName}{" "}
          and are not affiliated with or endorsed by {landing.airlineName}.
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight mb-3">
          {landing.title}
        </h1>
        <p className="text-indigo-100/80 text-sm sm:text-base max-w-2xl mx-auto mb-8">{landing.description}</p>

        <div className="max-w-[920px] mx-auto">
          <div className="rounded-2xl p-px bg-gradient-to-br from-white/40 via-white/10 to-accent-300/30 shadow-glow">
            <div className="rounded-[15px] glass p-2 sm:p-2.5">
              <SimpleSearchBar />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Search {landing.airlineName} flight options</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-4">
            Use the search tool above to compare available {landing.airlineName} routes across different travel
            providers. Results are for informational and comparison purposes only. When you choose a fare, booking
            is completed on the airline or partner website that provides the ticket.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            {landing.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">How {SITE_NAME} works</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            {SITE_NAME} is a neutral, independent metasearch platform. We help travelers compare flight options
            from various airlines and travel providers in a single search. Once you select a fare that fits your
            needs, you are redirected to our travel partner or the airline to complete the booking securely.
          </p>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">{SITE_DISCLAIMER}</p>

        <p className="text-sm text-slate-500">
          <Link href="/about" className="text-brand-600 hover:underline">
            About Us
          </Link>
          {" · "}
          <Link href="/contact" className="text-brand-600 hover:underline">
            Contact Us
          </Link>
          {" · "}
          <Link href="/terms" className="text-brand-600 hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/privacy" className="text-brand-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </section>

      <SiteDisclaimer />
      </div>
    </>
  );
}
