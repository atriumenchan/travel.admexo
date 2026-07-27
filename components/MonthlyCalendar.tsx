"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { MonthlyPrice } from "@/lib/travelpayouts";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MonthlyCalendarProps {
  prices: MonthlyPrice[];
}

export default function MonthlyCalendar({ prices }: MonthlyCalendarProps) {
  const [viewYear, setViewYear] = useState(() => {
    const now = new Date();
    return now.getFullYear();
  });

  if (!prices.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <p className="text-slate-500">No monthly pricing data available for this route.</p>
      </div>
    );
  }

  const priceMap: Record<string, MonthlyPrice> = {};
  prices.forEach((p) => {
    priceMap[p.month] = p;
  });

  const allPrices = prices.map((p) => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  function getPriceColor(price: number): string {
    const ratio = (price - minPrice) / (maxPrice - minPrice || 1);
    if (ratio < 0.25) return "bg-green-100 text-green-800 border-green-300";
    if (ratio < 0.5) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (ratio < 0.75) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-slate-800">Cheapest month to fly</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewYear((y) => y - 1)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <span className="text-sm font-semibold text-slate-700 w-12 text-center">{viewYear}</span>
          <button
            type="button"
            onClick={() => setViewYear((y) => y + 1)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {months.map((month, idx) => {
          const key = `${viewYear}-${String(idx + 1).padStart(2, "0")}`;
          const data = priceMap[key];

          return (
            <div key={key}>
              {data ? (
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={cn(
                    "block border rounded-lg p-2.5 text-center hover:shadow-sm transition-all group",
                    getPriceColor(data.price)
                  )}
                >
                  <p className="text-xs font-semibold mb-1">{month}</p>
                  <p className="text-sm font-bold">{formatPrice(data.price)}</p>
                  <ExternalLink className="w-3 h-3 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="border border-slate-200 rounded-lg p-2.5 text-center bg-slate-50">
                  <p className="text-xs font-semibold text-slate-400 mb-1">{month}</p>
                  <p className="text-sm text-slate-300">—</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block" /> Cheapest</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 inline-block" /> Fair</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-200 inline-block" /> Pricey</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 inline-block" /> Expensive</span>
      </div>
    </div>
  );
}
