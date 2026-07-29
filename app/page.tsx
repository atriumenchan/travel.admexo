import type { Metadata } from "next";
import SearchForm from "@/components/SearchForm";
import PopularRoutes from "@/components/PopularRoutes";
import HowItWorks from "@/components/HowItWorks";
import { getPopularRoutes } from "@/lib/travelpayouts";
import { Plane, Shield, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "SkyDeal — Find the Cheapest Flights",
  description:
    "Search and compare flights from hundreds of airlines. Find the best deals on cheap flights worldwide with SkyDeal.",
};

export default async function HomePage() {
  const popularRoutes = await getPopularRoutes("JFK").catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient min-h-[520px] flex flex-col items-center justify-center px-4 py-16 sm:py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative z-10 text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-8 h-8 text-blue-200" />
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-widest">Flight Metasearch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Find the Cheapest<br />Flights Anywhere
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-xl mx-auto">
            Compare prices from 700+ airlines and booking sites. No fees, no markups — just the best deals.
          </p>
        </div>

        <div className="relative z-20 w-full max-w-6xl mx-auto">
          <SearchForm />
        </div>

        {/* Trust badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-8 text-blue-200 text-sm">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> No booking fees</span>
          <span className="flex items-center gap-1.5"><TrendingDown className="w-4 h-4" /> Lowest prices guaranteed</span>
          <span className="flex items-center gap-1.5"><Plane className="w-4 h-4" /> 700+ airlines compared</span>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="popular" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Popular Destinations</h2>
          <p className="text-slate-500 text-lg">Handpicked routes with the best deals this season</p>
        </div>
        <PopularRoutes routes={popularRoutes} />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-slate-100 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How SkyDeal Works</h2>
            <p className="text-slate-500 text-lg">We find it. You book it. Simple.</p>
          </div>
          <HowItWorks />
        </div>
      </section>
    </>
  );
}
