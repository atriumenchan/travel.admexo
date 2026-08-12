import Link from "next/link";
import { Plane } from "lucide-react";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";
import { SITE_NAME } from "@/lib/siteConfig";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Search Flights", href: "/" },
      { label: "Today's Deals", href: "/#deals" },
      { label: "Popular Destinations", href: "/#popular" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Popular Routes",
    links: [
      { label: "New York → London", href: buildWidgetSearchPath("JFK", "LHR") },
      { label: "Los Angeles → Tokyo", href: buildWidgetSearchPath("LAX", "NRT") },
      { label: "New York → Paris", href: buildWidgetSearchPath("JFK", "CDG") },
      { label: "London → Dubai", href: buildWidgetSearchPath("LHR", "DXB") },
    ],
  },
  {
    title: "Support",
    links: [{ label: "Contact Us", href: "/contact" }],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-[0.08] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              An independent flight metasearch engine comparing prices from hundreds of airlines and booking
              sites. All bookings are completed on the airline or travel provider&apos;s website.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {/* Plain <a> for widget deep links — forces a real page load
                        so the embedded widget picks up the flightSearch param. */}
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Prices are subject to change. Affiliate links may earn a
            commission.
          </p>
        </div>
      </div>
    </footer>
  );
}
