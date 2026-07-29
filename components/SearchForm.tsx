"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowLeftRight, Calendar, Users, Search, MapPin, Loader2, Minus, Plus } from "lucide-react";
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
  const [showPaxDropdown, setShowPaxDropdown] = useState(false);
  const [originLoading, setOriginLoading] = useState(false);
  const [destLoading, setDestLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const paxRef = useRef<HTMLDivElement>(null);

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
        setOriginLoading(true);
        const results = await fetchSuggestions(originLabel);
        setOriginLoading(false);
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
        setDestLoading(true);
        const results = await fetchSuggestions(destLabel);
        setDestLoading(false);
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
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setShowPaxDropdown(false);
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

  const inputClass =
    "w-full pl-10 pr-9 h-12 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 focus:bg-white transition-all";

  const renderDropdown = (
    suggestions: AirportOption[],
    onSelect: (a: AirportOption) => void,
    align: "left" | "right" = "left"
  ) => (
    <div
      className={cn(
        "absolute top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-[999] max-h-80 overflow-y-auto overflow-x-hidden w-full sm:w-[340px]",
        align === "right" ? "right-0" : "left-0"
      )}
    >
      {suggestions.map((a) => (
        <button
          key={a.code}
          type="button"
          onClick={() => onSelect(a)}
          className="w-full text-left px-3 py-2.5 hover:bg-brand-50 transition-colors flex items-center gap-3 border-b border-slate-100 last:border-0"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Plane className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{a.city ?? a.name}</p>
            <p className="text-xs text-slate-400 truncate">{a.name}{a.country ? ` · ${a.country}` : ""}</p>
          </div>
          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-100 px-2 py-1 rounded-md shrink-0 tracking-wider">
            {a.code}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white border border-slate-100 shadow-2xl shadow-brand-900/10",
        compact ? "rounded-2xl shadow-lg p-4" : "rounded-3xl p-5 sm:p-6"
      )}
    >
      {/* Trip type toggle */}
      <div className="inline-flex bg-slate-100 rounded-full p-1 mb-5">
        {(["round", "one-way"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={cn(
              "px-5 py-1.5 rounded-full text-sm font-semibold transition-all",
              tripType === t
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t === "round" ? "Round trip" : "One way"}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Origin + Destination with swap */}
        <div className="relative flex-[2.2] grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={swapAirports}
            className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg hover:rotate-180 transition-all duration-300"
            aria-label="Swap airports"
          >
            <ArrowLeftRight className="w-4 h-4 text-brand-600" />
          </button>

          {/* Origin */}
          <div className="relative" ref={originRef}>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">From</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
              <input
                type="text"
                value={originLabel}
                onChange={(e) => { setOriginLabel(e.target.value); setOrigin(""); }}
                onFocus={() => originSuggestions.length > 0 && setShowOriginDropdown(true)}
                placeholder="City or airport"
                className={inputClass}
                required
              />
              {originLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
              )}
            </div>
            {showOriginDropdown && renderDropdown(originSuggestions, (a) => {
              setOrigin(a.code);
              setOriginLabel(`${a.city ?? a.name} (${a.code})`);
              setShowOriginDropdown(false);
            }, "left")}
          </div>

          {/* Destination */}
          <div className="relative" ref={destRef}>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">To</label>
            <div className="relative">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 rotate-45" />
              <input
                type="text"
                value={destLabel}
                onChange={(e) => { setDestLabel(e.target.value); setDestination(""); }}
                onFocus={() => destSuggestions.length > 0 && setShowDestDropdown(true)}
                placeholder="City or airport"
                className={inputClass}
                required
              />
              {destLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
              )}
            </div>
            {showDestDropdown && renderDropdown(destSuggestions, (a) => {
              setDestination(a.code);
              setDestLabel(`${a.city ?? a.name} (${a.code})`);
              setShowDestDropdown(false);
            }, "right")}
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-3 flex-[1.6]">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Depart</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 pointer-events-none" />
              <input
                type="date"
                value={departDate}
                min={today}
                onChange={(e) => setDepartDate(e.target.value)}
                className={cn(inputClass, "pr-2")}
                required
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 pointer-events-none" />
              <input
                type="date"
                value={returnDate}
                min={departDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType === "one-way"}
                className={cn(inputClass, "pr-2", tripType === "one-way" && "opacity-40 cursor-not-allowed")}
              />
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="relative lg:w-40 shrink-0" ref={paxRef}>
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Passengers</label>
          <button
            type="button"
            onClick={() => setShowPaxDropdown((v) => !v)}
            className={cn(inputClass, "relative pr-3 flex items-center text-left cursor-pointer")}
          >
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
            <span className="flex-1 truncate">{passengers} {passengers === 1 ? "Adult" : "Adults"}</span>
          </button>
          {showPaxDropdown && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-[999] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Adults</p>
                  <p className="text-xs text-slate-400">Age 12+</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                    disabled={passengers <= 1}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-400 hover:text-brand-600 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-bold text-slate-800">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers((p) => Math.min(9, p + 1))}
                    disabled={passengers >= 9}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-400 hover:text-brand-600 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="lg:w-40 shrink-0 flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
