"use client";

import { buildWidgetSearchPath } from "@/lib/travelpayouts";
import { useVisitorOrigin } from "@/components/useVisitorOrigin";

const DESTINATIONS = [
  { city: "London", code: "LHR" },
  { city: "Tokyo", code: "NRT" },
  { city: "Paris", code: "CDG" },
  { city: "Dubai", code: "DXB" },
];

export default function FooterPopularRoutes() {
  const origin = useVisitorOrigin();

  return (
    <div>
      <h4 className="text-white font-semibold mb-4 text-sm">Popular Routes</h4>
      <ul className="space-y-2.5 text-sm">
        {DESTINATIONS.filter((dest) => dest.code !== origin.code).map((dest) => (
          <li key={dest.code}>
            <a
              href={buildWidgetSearchPath(origin.code, dest.code)}
              className="hover:text-white transition-colors"
            >
              {origin.city} → {dest.city}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
