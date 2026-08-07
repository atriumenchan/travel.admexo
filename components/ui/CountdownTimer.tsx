"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function format(ms: number): string {
  if (ms <= 0) return "Expired";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Countdown to a deadline computed client-side from `hoursFromNow` at
 * mount time, so it's stable across server/client renders (no hydration
 * mismatch) while still ticking down live in the browser. */
export function CountdownTimer({ hoursFromNow, className }: { hoursFromNow: number; className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = Date.now() + hoursFromNow * 3600 * 1000;
    const tick = () => setRemaining(deadline - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hoursFromNow]);

  return (
    <span className={className}>
      <Timer className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
      {remaining === null ? "--:--:--" : format(remaining)}
    </span>
  );
}
