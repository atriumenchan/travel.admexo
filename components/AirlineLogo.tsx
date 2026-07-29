"use client";

import { useState } from "react";

export default function AirlineLogo({ code }: { code: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
        {code}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://pics.avs.io/80/80/${code}.png`}
      alt={code}
      width={40}
      height={40}
      loading="lazy"
      className="w-10 h-10 rounded-lg bg-white border border-slate-100 object-contain p-1 shrink-0"
      onError={() => setError(true)}
    />
  );
}
