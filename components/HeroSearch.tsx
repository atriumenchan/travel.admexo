"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Calendar } from "lucide-react";
import SearchForm from "@/components/SearchForm";

function LiveWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || injected.current) return;
    injected.current = true;

    const existing = document.getElementById("tp-widget-script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "tp-widget-script";
    script.async = true;
    script.src =
      "https://tpwdgt.com/content?currency=usd&trs=555469&shmarker=756745&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
    script.setAttribute("charset", "utf-8");
    script.onload = () => setTimeout(() => setLoaded(true), 300);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="relative w-full">
      {/* Skeleton shown while widget loads */}
      {!loaded && (
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            <div className="h-11 flex-1 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-11 flex-1 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-11 w-32 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-11 w-32 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-11 w-28 bg-emerald-100 rounded-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-3 bg-slate-100 rounded-full animate-pulse" />
            <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      )}
      {/* Widget container — always mounted, hidden until loaded */}
      <div
        ref={containerRef}
        className={`w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
      />
    </div>
  );
}

export default function HeroSearch() {
  const [tab, setTab] = useState<"live" | "dates">("live");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab pills */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTab("live")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            tab === "live"
              ? "bg-white text-brand-700 shadow-md"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <Zap className="w-4 h-4" />
          Live Search
        </button>
        <button
          onClick={() => setTab("dates")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            tab === "dates"
              ? "bg-white text-brand-700 shadow-md"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Cheapest Dates
        </button>
      </div>

      {/* Tab description */}
      <p className="text-white/60 text-xs mb-3 ml-1">
        {tab === "live"
          ? "Real-time prices from 700+ airlines & booking sites"
          : "Find the cheapest month to fly for any route"}
      </p>

      {/* Panel */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Live widget — keep mounted so script doesn't reload */}
        <div className={tab === "live" ? "block" : "hidden"}>
          <LiveWidget />
        </div>

        {/* Custom form */}
        {tab === "dates" && (
          <div className="p-4">
            <SearchForm />
          </div>
        )}
      </div>
    </div>
  );
}
