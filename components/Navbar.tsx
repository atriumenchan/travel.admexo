"use client";

import Link from "next/link";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-brand-700 font-bold text-xl">
            <Plane className="w-6 h-6" />
            <span>SkyDeal</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-brand-600 transition-colors">Flights</Link>
            <Link href="/#popular" className="hover:text-brand-600 transition-colors">Destinations</Link>
            <Link href="/#how-it-works" className="hover:text-brand-600 transition-colors">How it works</Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Flights</Link>
          <Link href="/#popular" className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Destinations</Link>
          <Link href="/#how-it-works" className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>How it works</Link>
        </div>
      )}
    </nav>
  );
}
