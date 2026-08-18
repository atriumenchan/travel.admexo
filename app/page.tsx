import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PopularRoutes from "@/components/PopularRoutes";
import FeaturedDeals from "@/components/FeaturedDeals";
import ResultsPreview from "@/components/ResultsPreview";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import TravelInspiration from "@/components/TravelInspiration";
import SiteDisclaimer from "@/components/SiteDisclaimer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPopularRoutes } from "@/lib/travelpayouts";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/siteConfig";
import { detectVisitorOrigin, FALLBACK_ORIGIN } from "@/lib/geoOrigin";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: `${SITE_TAGLINE}. Search and compare flights from hundreds of airlines with ${SITE_NAME}.`,
};

interface HomePageProps {
  searchParams: { flightSearch?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const origin = await detectVisitorOrigin(headers()).catch(() => FALLBACK_ORIGIN);
  const popularRoutes = await getPopularRoutes(origin.code).catch(() => []);

  // Landing here with a `flightSearch` param means the widget is about to
  // show real results — drop every marketing section so the page isn't
  // showing unrelated content while the search loads, and the results
  // skeleton is the first (and only) thing visible.
  const hasSearch = Boolean(searchParams?.flightSearch);

  return (
    <>
      <Hero hasSearch={hasSearch} origin={origin} />

      {!hasSearch && (
        <>
          <FeaturedDeals origin={origin} />

          <section id="popular" className="py-20 px-4 max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Popular Destinations"
              title="Handpicked routes, real savings"
              description={`The best value routes from ${origin.city} this season, refreshed regularly.`}
            />
            <PopularRoutes routes={popularRoutes} originCity={origin.city} />
          </section>

          <ResultsPreview origin={origin} />
          <TrustSection />

          <section id="how-it-works" className="py-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
              <SectionHeading eyebrow="Simple By Design" title={`How ${SITE_NAME} works`} description="We find it. You book it. Simple." />
              <HowItWorks />
            </div>
          </section>

          <WhyChooseUs />
          <Testimonials />
          <TravelInspiration origin={origin} />
        </>
      )}

      <SiteDisclaimer />
    </>
  );
}
