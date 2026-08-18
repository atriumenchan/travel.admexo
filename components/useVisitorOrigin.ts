"use client";

import { useEffect, useState } from "react";
import { FALLBACK_ORIGIN, type VisitorOrigin } from "@/lib/geoOrigin";

let cached: VisitorOrigin | null = null;
let inflight: Promise<VisitorOrigin> | null = null;

function loadOrigin(): Promise<VisitorOrigin> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch("/api/geo-origin")
      .then(async (res) => {
        if (!res.ok) return FALLBACK_ORIGIN;
        const data = (await res.json()) as VisitorOrigin;
        if (!data?.code || !data?.city) return FALLBACK_ORIGIN;
        cached = data;
        return data;
      })
      .catch(() => FALLBACK_ORIGIN);
  }
  return inflight;
}

/** Nearby origin from IP — New York / JFK until detection finishes or fails. */
export function useVisitorOrigin(): VisitorOrigin {
  const [origin, setOrigin] = useState<VisitorOrigin>(cached ?? FALLBACK_ORIGIN);

  useEffect(() => {
    let cancelled = false;
    loadOrigin().then((next) => {
      if (!cancelled) setOrigin(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return origin;
}
