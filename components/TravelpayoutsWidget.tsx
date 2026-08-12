import SimpleSearchBar from "@/components/SimpleSearchBar";
import TravelpayoutsWidgetBadgeHider from "./TravelpayoutsWidgetBadgeHider";

// Travelpayouts White Label widget — used for *results* (#tpwl-tickets).
// The search form UI is our own SimpleSearchBar (stable 2-row layout). The
// widget's #tpwl-search host stays in the DOM (hidden) so the WL script can
// still mount and read `?flightSearch=` deep links for results.
const WL_ID = "20607";

const WP_PLUGIN_NOOP_ATTRS = {
  nowprocket: "1",
  "data-noptimize": "1",
  "data-cfasync": "false",
  "data-wpfc-render": "false",
  "seraph-accel-crit": "1",
  "data-no-defer": "1",
} as Record<string, string>;

interface TravelpayoutsWidgetProps {
  hasSearch?: boolean;
}

export default function TravelpayoutsWidget({ hasSearch = false }: TravelpayoutsWidgetProps) {
  return (
    <>
      <script
        async
        type="module"
        src={`https://tpwdgt.com/wl_web/main.js?wl_id=${WL_ID}`}
        {...WP_PLUGIN_NOOP_ATTRS}
      />

      {/* Our search UI — simple Origin|Destination / Dates|Pax|Search grid */}
      <div className="mx-auto w-full max-w-[920px]">
        <div className="rounded-2xl p-px bg-gradient-to-br from-white/40 via-white/10 to-accent-300/30 shadow-glow">
          <div className="rounded-[15px] sm:rounded-[15px] glass p-2 sm:p-2.5">
            <SimpleSearchBar />
          </div>
        </div>
      </div>

      {/* Off-screen host for the Travelpayouts search form — required for the
          widget runtime / deep-link bootstrap, not shown to users. display:none
          can prevent some WL scripts from mounting, so we keep it in-layout
          but invisible. */}
      <div
        id="tpwl-search"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
      />

      <div id="tpwl-tickets">
        {hasSearch && (
          <div className="mt-6 space-y-4 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 animate-pulse h-24"
              />
            ))}
          </div>
        )}
      </div>

      <TravelpayoutsWidgetBadgeHider />
    </>
  );
}
