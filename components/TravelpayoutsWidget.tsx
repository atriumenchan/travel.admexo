"use client";

import Script from "next/script";

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

// The snippet Travelpayouts provides tags its <script> with a handful of
// non-standard attributes that tell WordPress caching/optimization plugins
// (WP Rocket, Autoptimize, WP Fastest Cache, Seraph Accelerator) to leave it
// alone. They're no-ops here since this isn't WordPress, but kept for
// fidelity with the snippet they gave us. next/script's types don't know
// about them, hence the cast.
const WP_PLUGIN_NOOP_ATTRS = {
  nowprocket: "1",
  "data-noptimize": "1",
  "data-cfasync": "false",
  "data-wpfc-render": "false",
  "seraph-accel-crit": "1",
  "data-no-defer": "1",
} as Record<string, string>;

export default function TravelpayoutsWidget() {
  return (
    <>
      <Script
        id="tpwl-loader"
        strategy="afterInteractive"
        {...WP_PLUGIN_NOOP_ATTRS}
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var script = document.createElement("script");
              script.async = 1;
              script.type = "module";
              script.src = "https://tpwdgt.com/wl_web/main.js?wl_id=${WL_ID}";
              document.head.appendChild(script);
            })();
          `,
        }}
      />
      <div id="tpwl-search" />
      <div id="tpwl-tickets" />
    </>
  );
}
