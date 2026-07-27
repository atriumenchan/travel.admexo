"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = "price" | "duration" | "best";

interface ResultsFilterProps {
  resultCount: number;
  currentSort: SortKey;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "best", label: "Best" },
  { key: "price", label: "Cheapest" },
  { key: "duration", label: "Fastest" },
];

export default function ResultsFilter({ resultCount, currentSort }: ResultsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSort(key: SortKey) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <p className="text-sm text-slate-500">
        <span className="font-semibold text-slate-800">{resultCount}</span> results found
      </p>
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-500 mr-1">Sort:</span>
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSort(opt.key)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                currentSort === opt.key
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
