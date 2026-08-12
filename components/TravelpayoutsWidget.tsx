import TravelpayoutsWidgetBadgeHider from "./TravelpayoutsWidgetBadgeHider";

// Travelpayouts White Label metasearch widget. This is a fully self-contained
// third-party widget: the loader script renders its own search form into
// #tpwl-search and its own results UI into #tpwl-tickets once loaded, so no
// custom search/results logic is needed on our side for this to work.
//
// Our own custom flight search build (SearchForm, the /flights/[slug]
// results page, and the multi-provider aggregator in lib/aggregator.ts) is
// intentionally left in place but unused for now — nothing was deleted, so
// switching back later is just a matter of swapping this component back out.
const WL_ID = "20607";

// This is a plain, server-rendered <script> tag on purpose — NOT next/script
// with strategy="afterInteractive". That was the cause of the ~2s delay
// before the widget appeared: afterInteractive only starts loading the
// script *after* React finishes hydrating the page. A script tag emitted
// directly in the server-rendered HTML gets discovered and starts fetching
// the instant the browser parses this point in the document, well before
// hydration completes.
//
// The custom attributes below tell WordPress caching/optimization plugins
// (WP Rocket, Autoptimize, WP Fastest Cache, Seraph Accelerator) to leave
// this script alone. They're no-ops here since this isn't WordPress, but
// kept for fidelity with the snippet Travelpayouts provided. JSX's built-in
// typing for <script> doesn't know about them, hence the cast.
const WP_PLUGIN_NOOP_ATTRS = {
  nowprocket: "1",
  "data-noptimize": "1",
  "data-cfasync": "false",
  "data-wpfc-render": "false",
  "seraph-accel-crit": "1",
  "data-no-defer": "1",
} as Record<string, string>;

interface TravelpayoutsWidgetProps {
  /** True when the page loaded with a `flightSearch` param — shows a
   * results-shaped skeleton instead of an empty container while the
   * widget loads and fetches real results. */
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

      {/* Search bar is intentionally capped (~960px) and centered so it
          reads as a focused control on desktop, not a full-bleed panel.
          Tickets below can still use the wider page column. */}
      <div className="mx-auto w-full max-w-[960px]">
        <div className="rounded-2xl sm:rounded-[22px] p-px bg-gradient-to-br from-white/40 via-white/10 to-accent-300/30 shadow-glow">
          <div className="rounded-[15px] sm:rounded-[21px] glass p-1 sm:p-1.5">
            {/* Skeleton search bar — visible instantly on first paint. The
                moment the widget's script calls attachShadow() on #tpwl-search,
                the browser stops rendering this light-DOM content. */}
            <div id="tpwl-search">
              <div className="animate-pulse flex flex-col gap-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-11 sm:h-12 bg-white/90 rounded-xl shadow-sm" />
                  <div className="h-11 sm:h-12 bg-white/90 rounded-xl shadow-sm" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <div className="h-11 sm:h-12 bg-white/90 rounded-xl shadow-sm" />
                  <div className="h-11 sm:h-12 bg-white/90 rounded-xl shadow-sm" />
                  <div className="h-11 sm:h-12 bg-white/90 rounded-xl shadow-sm" />
                  <div className="h-11 sm:h-12 bg-brand-200/90 rounded-xl shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="tpwl-tickets">
        {hasSearch && (
          <div className="mt-6 space-y-4 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 animate-pulse h-24" />
            ))}
          </div>
        )}
      </div>

      <TravelpayoutsWidgetBadgeHider />
    </>
  );
}
