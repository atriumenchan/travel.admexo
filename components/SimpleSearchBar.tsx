"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, Plane, Search, X } from "lucide-react";
import { buildWidgetSearchPath } from "@/lib/travelpayouts";
import { cn } from "@/lib/utils";
import { FALLBACK_ORIGIN } from "@/lib/geoOrigin";
import { useVisitorOrigin } from "@/components/useVisitorOrigin";

interface AirportOption {
  code: string;
  name: string;
  city?: string;
  country?: string;
}

function defaultDepartDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
}

function defaultReturnDate() {
  const d = new Date();
  d.setDate(d.getDate() + 21);
  return d.toISOString().slice(0, 10);
}

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const dt = new Date(`${iso}T00:00:00`);
  const day = dt.getDate();
  const mon = dt.toLocaleString("en", { month: "short" });
  const weekday = dt.toLocaleString("en", { weekday: "short" });
  return `${day} ${mon}, ${weekday}`;
}

/**
 * Simple 2-row search bar matching classic metasearch layout:
 *   Row 1 — Origin | Destination
 *   Row 2 — Depart | Return | Passengers | Search
 *
 * Submits via a full navigation into the Travelpayouts widget deep link
 * (`/?flightSearch=...`) so live results still come from the WL widget.
 */
export default function SimpleSearchBar({
  initialOrigin,
  initialOriginLabel,
}: {
  initialOrigin?: string;
  initialOriginLabel?: string;
}) {
  const detected = useVisitorOrigin();
  const defaultCode = initialOrigin || detected.code || FALLBACK_ORIGIN.code;
  const defaultLabel = initialOriginLabel || detected.city || FALLBACK_ORIGIN.city;

  const [origin, setOrigin] = useState(defaultCode);
  const [destination, setDestination] = useState("");
  const [originLabel, setOriginLabel] = useState(defaultLabel);
  const [destLabel, setDestLabel] = useState("");
  const editedOrigin = useRef(false);
  const [departDate, setDepartDate] = useState(defaultDepartDate);
  const [returnDate, setReturnDate] = useState(defaultReturnDate);
  const [passengers, setPassengers] = useState(1);
  const [cabin] = useState("economy");

  const [originSuggestions, setOriginSuggestions] = useState<AirportOption[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<AirportOption[]>([]);
  const [showOrigin, setShowOrigin] = useState(false);
  const [showDest, setShowDest] = useState(false);
  const [showPax, setShowPax] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const paxRef = useRef<HTMLDivElement>(null);
  const departRef = useRef<HTMLInputElement>(null);
  const returnRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editedOrigin.current || initialOrigin) return;
    setOrigin(detected.code);
    setOriginLabel(detected.city);
  }, [detected.code, detected.city, initialOrigin]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) return [] as AirportOption[];
    try {
      const res = await fetch(`/api/airports?q=${encodeURIComponent(query)}`);
      if (!res.ok) return [];
      return (await res.json()) as AirportOption[];
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (originLabel.length >= 2 && showOrigin) {
        setOriginSuggestions(await fetchSuggestions(originLabel));
      }
    }, 200);
    return () => clearTimeout(t);
  }, [originLabel, fetchSuggestions, showOrigin]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (destLabel.length >= 2 && showDest) {
        setDestSuggestions(await fetchSuggestions(destLabel));
      }
    }, 200);
    return () => clearTimeout(t);
  }, [destLabel, fetchSuggestions, showDest]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (originRef.current && !originRef.current.contains(t)) setShowOrigin(false);
      if (destRef.current && !destRef.current.contains(t)) setShowDest(false);
      if (paxRef.current && !paxRef.current.contains(t)) setShowPax(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function openPicker(ref: React.RefObject<HTMLInputElement | null>) {
    const el = ref.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin || !destination) return;
    // Full page load so the Travelpayouts widget picks up flightSearch.
    window.location.href = buildWidgetSearchPath(
      origin,
      destination,
      departDate,
      passengers,
      returnDate || undefined
    );
  }

  const field =
    "relative flex items-center justify-between gap-2 w-full h-12 sm:h-[52px] px-3.5 rounded-lg bg-white text-left border-0 shadow-sm focus-within:ring-2 focus-within:ring-brand-400/50";

  const dropdown = (
    suggestions: AirportOption[],
    onSelect: (a: AirportOption) => void
  ) =>
    suggestions.length > 0 ? (
      <div className="absolute left-0 right-0 top-full mt-1.5 z-[60] max-h-64 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl">
        {suggestions.map((a) => (
          <button
            key={a.code}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-50 border-b border-slate-100 last:border-0"
            onClick={() => onSelect(a)}
          >
            <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Plane className="w-3.5 h-3.5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-slate-900 truncate">{a.city ?? a.name}</span>
              <span className="block text-xs text-slate-400 truncate">
                {a.name}
                {a.country ? ` · ${a.country}` : ""}
              </span>
            </span>
            <span className="text-[11px] font-bold tracking-wider text-slate-500">{a.code}</span>
          </button>
        ))}
      </div>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[920px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {/* Origin */}
        <div ref={originRef} className="relative">
          <label className={cn(field, "cursor-text")}>
            <input
              type="text"
              value={originLabel}
              onChange={(e) => {
                editedOrigin.current = true;
                setOriginLabel(e.target.value);
                setOrigin("");
                setShowOrigin(true);
              }}
              onFocus={() => setShowOrigin(true)}
              placeholder="From"
              className="flex-1 min-w-0 bg-transparent text-sm sm:text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium outline-none"
              autoComplete="off"
              required
            />
            {origin ? (
              <span className="text-xs font-semibold text-slate-400 tracking-wider shrink-0">{origin}</span>
            ) : null}
          </label>
          {showOrigin && dropdown(originSuggestions, (a) => {
            editedOrigin.current = true;
            setOrigin(a.code);
            setOriginLabel(a.city ?? a.name);
            setShowOrigin(false);
          })}
        </div>

        {/* Destination */}
        <div ref={destRef} className="relative">
          <label className={cn(field, "cursor-text")}>
            <input
              type="text"
              value={destLabel}
              onChange={(e) => {
                setDestLabel(e.target.value);
                setDestination("");
                setShowDest(true);
              }}
              onFocus={() => setShowDest(true)}
              placeholder="To"
              className="flex-1 min-w-0 bg-transparent text-sm sm:text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium outline-none"
              autoComplete="off"
              required
            />
            {destination ? (
              <span className="text-xs font-semibold text-slate-400 tracking-wider shrink-0">{destination}</span>
            ) : null}
          </label>
          {showDest && dropdown(destSuggestions, (a) => {
            setDestination(a.code);
            setDestLabel(a.city ?? a.name);
            setShowDest(false);
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Depart */}
        <button
          type="button"
          className={field}
          onClick={() => openPicker(departRef)}
        >
          <span className={cn("text-sm sm:text-[15px] font-semibold truncate", departDate ? "text-slate-900" : "text-slate-400")}>
            {departDate ? formatDisplayDate(departDate) : "Depart"}
          </span>
          <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
          <input
            ref={departRef}
            type="date"
            value={departDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDepartDate(e.target.value)}
            className="sr-only"
            tabIndex={-1}
          />
        </button>

        {/* Return (optional clear) */}
        <button
          type="button"
          className={field}
          onClick={() => openPicker(returnRef)}
        >
          <span className={cn("text-sm sm:text-[15px] font-semibold truncate", returnDate ? "text-slate-900" : "text-slate-400")}>
            {returnDate ? formatDisplayDate(returnDate) : "Return"}
          </span>
          {returnDate ? (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear return date"
              className="text-brand-600 shrink-0 p-0.5 rounded hover:bg-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                setReturnDate("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  setReturnDate("");
                }
              }}
            >
              <X className="w-4 h-4" />
            </span>
          ) : (
            <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
          )}
          <input
            ref={returnRef}
            type="date"
            value={returnDate}
            min={departDate || new Date().toISOString().slice(0, 10)}
            onChange={(e) => setReturnDate(e.target.value)}
            className="sr-only"
            tabIndex={-1}
          />
        </button>

        {/* Passengers */}
        <div ref={paxRef} className="relative">
          <button type="button" className={cn(field, "w-full")} onClick={() => setShowPax((v) => !v)}>
            <span className="min-w-0">
              <span className="block text-sm sm:text-[15px] font-semibold text-slate-900 truncate">
                {passengers} passenger{passengers === 1 ? "" : "s"}
              </span>
              <span className="block text-[11px] text-slate-400 capitalize leading-tight">{cabin}</span>
            </span>
            <ChevronDown className="w-4 h-4 text-brand-600 shrink-0" />
          </button>
          {showPax && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-[60] rounded-xl bg-white border border-slate-200 shadow-xl p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700">Passengers</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                    onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                    aria-label="Decrease passengers"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold">{passengers}</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                    onClick={() => setPassengers((p) => Math.min(9, p + 1))}
                    aria-label="Increase passengers"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <button
          type="submit"
          className="h-12 sm:h-[52px] rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </form>
  );
}
