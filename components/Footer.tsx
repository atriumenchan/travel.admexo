"use client";

import Link from "next/link";
import { useState } from "react";
import { Plane, Twitter, Instagram, Facebook, Linkedin, ArrowRight, Send } from "lucide-react";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";

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
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <footer className="relative bg-slate-950 text-slate-400 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-[0.08] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Newsletter */}
        <div className="rounded-[28px] bg-white/[0.03] border border-white/10 p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold mb-1.5">Get fares before everyone else</h3>
            <p className="text-slate-400 text-sm">Weekly deals, price drops, and route inspiration. No spam.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 lg:w-72 h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-400 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-5 rounded-2xl bg-brand-gradient text-white font-semibold text-sm flex items-center gap-2 hover:brightness-110 transition-all shrink-0"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
              {subscribed ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </span>
              SkyDeal
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              A flight metasearch engine comparing prices from hundreds of airlines and booking sites.
              All bookings are completed on the airline or OTA website.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      // Plain <a> for widget deep links — see PopularRoutes.tsx
                      // for why (forces a real page load so the embedded
                      // widget picks up the flightSearch param).
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkyDeal. Prices are subject to change. Affiliate links may earn a commission.</p>
          <p>
            Powered by{" "}
            <a href="https://www.travelpayouts.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Travelpayouts
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
