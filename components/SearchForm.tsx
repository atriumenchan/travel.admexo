"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowLeftRight, Search, Loader2, Minus, Plus } from "lucide-react";
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
  const [originInfo, setOriginInfo] = useState<AirportOption | null>(null);
  const [destInfo, setDestInfo] = useState<AirportOption | null>(null);
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
  const departInputRef = useRef<HTMLInputElement>(null);
  const returnInputRef = useRef<HTMLInputElement>(null);

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
    setOriginInfo(destInfo);
    setDestInfo(originInfo);
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

  function openPicker(ref: { current: HTMLInputElement | null }) {
    const el = ref.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const formatShortDate = (d: string) => {
    const dt = new Date(`${d}T00:00:00`);
    return `${dt.getDate()} ${dt.toLocaleString("en", { month: "short" })}'${String(dt.getFullYear()).slice(2)}`;
  };
  const formatWeekday = (d: string) =>
    new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" });

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

  const cellPad = compact ? "px-4 py-2" : "px-4 py-2.5";
  const labelClass = "text-[10px] font-semibold text-slate-400 uppercase tracking-wider";
  const valueClass = "text-base sm:text-lg font-bold text-slate-900 leading-6";
  const subClass = "text-xs text-slate-400 truncate";

  return (
    <form onSubmit={handleSubmit}>
      {/* Trip type toggle */}
      <div className="inline-flex bg-white/95 rounded-full p-1 mb-3 shadow-sm">
        {(["round", "one-way"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={cn(
              "px-5 py-1.5 rounded-full text-sm font-semibold transition-all",
              tripType === t
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t === "round" ? "Round trip" : "One way"}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:items-stretch">
        {/* Unified search bar */}
        <div className="flex-1 flex flex-col lg:flex-row bg-white border border-slate-200 rounded-2xl shadow-xl shadow-brand-900/5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

          {/* From */}
          <div
            className={cn("relative flex-[1.3] hover:bg-brand-50/50 transition-colors rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl", cellPad)}
            ref={originRef}
          >
            <p className={labelClass}>From</p>
            <input
              type="text"
              value={originLabel}
              onChange={(e) => { setOriginLabel(e.target.value); setOrigin(""); setOriginInfo(null); }}
              onFocus={() => originSuggestions.length > 0 && setShowOriginDropdown(true)}
              placeholder="City or airport"
              className="w-full bg-transparent text-base sm:text-lg font-bold text-slate-900 leading-6 placeholder:text-sm placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
              required
            />
            <p className={subClass}>
              {originInfo ? `${originInfo.code}, ${originInfo.name}` : "Search city or airport"}
            </p>
            {originLoading && (
              <Loader2 className="absolute right-4 top-4 w-4 h-4 text-slate-400 animate-spin" />
            )}
            {/* Swap */}
            <button
              type="button"
              onClick={swapAirports}
              aria-label="Swap airports"
              className="absolute z-20 right-5 bottom-0 translate-y-1/2 lg:right-0 lg:bottom-auto lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg hover:rotate-180 transition-all duration-300"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-brand-600" />
            </button>
            {showOriginDropdown && renderDropdown(originSuggestions, (a) => {
              setOrigin(a.code);
              setOriginLabel(a.city ?? a.name);
              setOriginInfo(a);
              setShowOriginDropdown(false);
            }, "left")}
          </div>

          {/* To */}
          <div
            className={cn("relative flex-[1.3] hover:bg-brand-50/50 transition-colors", cellPad)}
            ref={destRef}
          >
            <p className={labelClass}>To</p>
            <input
              type="text"
              value={destLabel}
              onChange={(e) => { setDestLabel(e.target.value); setDestination(""); setDestInfo(null); }}
              onFocus={() => destSuggestions.length > 0 && setShowDestDropdown(true)}
              placeholder="City or airport"
              className="w-full bg-transparent text-base sm:text-lg font-bold text-slate-900 leading-6 placeholder:text-sm placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
              required
            />
            <p className={subClass}>
              {destInfo ? `${destInfo.code}, ${destInfo.name}` : "Search city or airport"}
            </p>
            {destLoading && (
              <Loader2 className="absolute right-4 top-4 w-4 h-4 text-slate-400 animate-spin" />
            )}
            {showDestDropdown && renderDropdown(destSuggestions, (a) => {
              setDestination(a.code);
              setDestLabel(a.city ?? a.name);
              setDestInfo(a);
              setShowDestDropdown(false);
            }, "right")}
          </div>

          {/* Departure */}
          <div
            className={cn("relative flex-1 hover:bg-brand-50/50 transition-colors cursor-pointer", cellPad)}
            onClick={() => openPicker(departInputRef)}
          >
            <p className={labelClass}>Departure</p>
            {departDate ? (
              <>
                <p className={valueClass}>{formatShortDate(departDate)}</p>
                <p className={subClass}>{formatWeekday(departDate)}</p>
              </>
            ) : (
              <>
                <p className={cn(valueClass, "text-slate-300")}>Select</p>
                <p className={subClass}>Add a date</p>
              </>
            )}
            <input
              ref={departInputRef}
              type="date"
              value={departDate}
              min={today}
              onChange={(e) => setDepartDate(e.target.value)}
              className="absolute bottom-0 left-0 w-full h-1 opacity-0 pointer-events-none"
              required
            />
          </div>

          {/* Return */}
          <div
            className={cn("relative flex-1 transition-colors", cellPad, tripType === "one-way" ? "opacity-50" : "hover:bg-brand-50/50 cursor-pointer")}
            onClick={() => tripType !== "one-way" && openPicker(returnInputRef)}
          >
            <p className={labelClass}>Return</p>
            {tripType === "one-way" ? (
              <>
                <p className={cn(valueClass, "text-slate-300")}>—</p>
                <p className={subClass}>One way</p>
              </>
            ) : returnDate ? (
              <>
                <p className={valueClass}>{formatShortDate(returnDate)}</p>
                <p className={subClass}>{formatWeekday(returnDate)}</p>
              </>
            ) : (
              <>
                <p className={cn(valueClass, "text-slate-300")}>Select</p>
                <p className={subClass}>Add a date</p>
              </>
            )}
            {tripType !== "one-way" && (
              <input
                ref={returnInputRef}
                type="date"
                value={returnDate}
                min={departDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                className="absolute bottom-0 left-0 w-full h-1 opacity-0 pointer-events-none"
              />
            )}
          </div>

          {/* Travellers */}
          <div
            className={cn("relative flex-1 hover:bg-brand-50/50 transition-colors cursor-pointer rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl", cellPad)}
            ref={paxRef}
            onClick={() => setShowPaxDropdown((v) => !v)}
          >
            <p className={labelClass}>Travellers</p>
            <p className={valueClass}>{passengers}</p>
            <p className={subClass}>{passengers === 1 ? "Adult" : "Adults"}</p>
            {showPaxDropdown && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-[999] p-4"
              >
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
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          className="lg:w-36 h-12 lg:h-auto rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
}
