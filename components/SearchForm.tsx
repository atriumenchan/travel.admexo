"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowLeftRight, Calendar, Users, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirportOption {
  code: string;
  name: string;
  city?: string;
  country?: string;
  city_code?: string;
  country_code?: string;
}

interface SearchFormProps {
  initialOrigin?: string;
  initialDestination?: string;
  initialDepartDate?: string;
  initialReturnDate?: string;
  initialPassengers?: number;
  initialTripType?: "round" | "one-way";
  compact?: boolean;
}

export default function SearchForm({
  initialOrigin = "",
  initialDestination = "",
  initialDepartDate = "",
  initialReturnDate = "",
  initialPassengers = 1,
  initialTripType = "round",
  compact = false,
}: SearchFormProps) {
  const router = useRouter();
  const [tripType, setTripType] = useState<"round" | "one-way">(initialTripType);
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [originLabel, setOriginLabel] = useState(initialOrigin);
  const [destLabel, setDestLabel] = useState(initialDestination);
  const [departDate, setDepartDate] = useState(initialDepartDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [originSuggestions, setOriginSuggestions] = useState<AirportOption[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<AirportOption[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (query: string): Promise<AirportOption[]> => {
    if (query.length < 2) return [];
    try {
      const res = await fetch(`/api/airports?q=${encodeURIComponent(query)}`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (originLabel.length >= 2) {
        const results = await fetchSuggestions(originLabel);
        setOriginSuggestions(results);
        setShowOriginDropdown(results.length > 0);
      } else {
        setOriginSuggestions([]);
        setShowOriginDropdown(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [originLabel, fetchSuggestions]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (destLabel.length >= 2) {
        const results = await fetchSuggestions(destLabel);
        setDestSuggestions(results);
        setShowDestDropdown(results.length > 0);
      } else {
        setDestSuggestions([]);
        setShowDestDropdown(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [destLabel, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (originRef.current && !originRef.current.contains(e.target as Node)) setShowOriginDropdown(false);
      if (destRef.current && !destRef.current.contains(e.target as Node)) setShowDestDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function swapAirports() {
    setOrigin(destination);
    setDestination(origin);
    setOriginLabel(destLabel);
    setDestLabel(originLabel);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin || !destination || !departDate) return;
    setLoading(true);
    const params = new URLSearchParams({
      origin,
      destination,
      departDate,
      passengers: String(passengers),
      tripType,
    });
    if (tripType === "round" && returnDate) params.set("returnDate", returnDate);
    router.push(`/flights/${origin.toLowerCase()}-to-${destination.toLowerCase()}?${params}`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white rounded-2xl shadow-xl p-4 sm:p-6",
        compact ? "shadow-md rounded-xl" : ""
      )}
    >
      {/* Trip type toggle */}
      <div className="flex gap-2 mb-4">
        {(["round", "one-way"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              tripType === t
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t === "round" ? "Round trip" : "One way"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Origin */}
        <div className="relative" ref={originRef}>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={originLabel}
              onChange={(e) => { setOriginLabel(e.target.value); setOrigin(""); }}
              onFocus={() => originSuggestions.length > 0 && setShowOriginDropdown(true)}
              placeholder="City or airport"
              className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
          {showOriginDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {originSuggestions.map((a) => (
                <button
                  key={a.code}
                  type="button"
                  onClick={() => { setOrigin(a.code); setOriginLabel(`${a.city ?? a.name} (${a.code})`); setShowOriginDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-sm text-slate-800">{a.code}</span>
                  <span className="text-sm text-slate-500 ml-2">{a.city ?? a.name}{a.country ? `, ${a.country}` : ""}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap + Destination */}
        <div className="relative" ref={destRef}>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">To</label>
          <div className="relative">
            <button
              type="button"
              onClick={swapAirports}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 hidden sm:block"
              aria-label="Swap airports"
            >
              <ArrowLeftRight className="w-3 h-3 text-slate-500" />
            </button>
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={destLabel}
              onChange={(e) => { setDestLabel(e.target.value); setDestination(""); }}
              onFocus={() => destSuggestions.length > 0 && setShowDestDropdown(true)}
              placeholder="City or airport"
              className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
          {showDestDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {destSuggestions.map((a) => (
                <button
                  key={a.code}
                  type="button"
                  onClick={() => { setDestination(a.code); setDestLabel(`${a.city ?? a.name} (${a.code})`); setShowDestDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-sm text-slate-800">{a.code}</span>
                  <span className="text-sm text-slate-500 ml-2">{a.city ?? a.name}{a.country ? `, ${a.country}` : ""}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-1">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Depart</label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={departDate}
                min={today}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full pl-8 pr-2 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          {tripType === "round" && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Return</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={returnDate}
                  min={departDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-8 pr-2 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Passengers + Search */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
