import Link from "next/link";
import { Plane } from "lucide-react";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <Plane className="w-5 h-5" />
              <span>SkyDeal</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              SkyDeal is a flight metasearch engine. We compare prices from hundreds of airlines
              and booking sites. All bookings are completed on the airline or OTA website.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Search Flights</Link></li>
              <li><Link href="/#popular" className="hover:text-white transition-colors">Popular Destinations</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Popular Routes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={buildWidgetSearchPath("JFK", "LHR")} className="hover:text-white transition-colors">New York → London</Link></li>
              <li><Link href={buildWidgetSearchPath("LAX", "NRT")} className="hover:text-white transition-colors">Los Angeles → Tokyo</Link></li>
              <li><Link href={buildWidgetSearchPath("JFK", "CDG")} className="hover:text-white transition-colors">New York → Paris</Link></li>
              <li><Link href={buildWidgetSearchPath("LHR", "DXB")} className="hover:text-white transition-colors">London → Dubai</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkyDeal. Prices are subject to change. Affiliate links may earn a commission.</p>
          <p>Powered by <a href="https://www.travelpayouts.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Travelpayouts</a></p>
        </div>
      </div>
    </footer>
  );
}
