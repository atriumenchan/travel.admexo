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
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPopularRoutes } from "@/lib/travelpayouts";

export const metadata: Metadata = {
  title: "SkyDeal — Find the Best Flights, Not Just the Cheapest",
  description:
    "Search and compare flights from hundreds of airlines. Find the best deals on cheap flights worldwide with SkyDeal.",
};

interface HomePageProps {
  searchParams: { flightSearch?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const popularRoutes = await getPopularRoutes("JFK").catch(() => []);

  // Landing here with a `flightSearch` param means the widget is about to
  // show real results — drop every marketing section so the page isn't
  // showing unrelated content while the search loads, and the results
  // skeleton is the first (and only) thing visible.
  const hasSearch = Boolean(searchParams?.flightSearch);

  return (
    <>
      <Hero hasSearch={hasSearch} />

      {!hasSearch && (
        <>
          <FeaturedDeals />

          <section id="popular" className="py-20 px-4 max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Popular Destinations"
              title="Handpicked routes, real savings"
              description="The best value routes from New York this season, refreshed regularly."
            />
            <PopularRoutes routes={popularRoutes} />
          </section>

          <ResultsPreview />
          <TrustSection />

          <section id="how-it-works" className="py-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
              <SectionHeading eyebrow="Simple By Design" title="How SkyDeal works" description="We find it. You book it. Simple." />
              <HowItWorks />
            </div>
          </section>

          <WhyChooseUs />
          <Testimonials />
          <TravelInspiration />
        </>
      )}
    </>
  );
}
