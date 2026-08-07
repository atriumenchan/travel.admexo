"use client";

import Link from "next/link";
import { Plane, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Flights" },
    { href: "/#deals", label: "Deals" },
    { href: "/#popular", label: "Destinations" },
    { href: "/#how-it-works", label: "How it works" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-light shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
            <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md shadow-brand-600/30">
              <Plane className="w-4 h-4 text-white" />
            </span>
            <span>SkyDeal</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative group py-1">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-light border-t border-slate-200/60 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm font-medium text-slate-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
