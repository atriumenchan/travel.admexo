"use client";

import { useEffect } from "react";
import Script from "next/script";

// ---------------------------------------------------------------------------
// Hide the widget's own "Powered by Travelpayouts" badge.
//
// The widget renders into an *open* shadow root (confirmed via devtools:
// document.querySelector('#tpwl-search').shadowRoot is accessible), so we
// can safely reach in and hide it — this doesn't touch anything Travelpayouts
// itself serves, it just adjusts presentation in our own page. Travelpayouts
// also exposes an official "Powered by" toggle in the White Label dashboard
// (Content/Design tab) which is the more durable place to control this long
// term; this is a client-side belt-and-suspenders fix in the meantime.
//
// The widget's internal class names are auto-generated/hashed (e.g.
// "TripClassList-module__root__4xZiP") and can change on their next release,
// so instead of hardcoding a selector we walk the shadow DOM for whichever
// element's text says "powered by" and hide its smallest self-contained
// container. A MutationObserver keeps re-checking as the widget re-renders
// (e.g. after a search), since the badge can be removed and re-added.
// ---------------------------------------------------------------------------

function hidePoweredByBadge(root: ParentNode) {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>("*"));
  for (const el of candidates) {
    if (el.children.length > 0) continue; // only consider leaf nodes
    const text = (el.textContent ?? "").trim().toLowerCase();
    if (!text || !/powered\s*by/.test(text)) continue;
    if (el.dataset.tpwlHidden === "1") continue;

    let target: HTMLElement = el;
    for (let i = 0; i < 3; i++) {
      const parent = target.parentElement;
      if (!parent) break;
      const parentText = (parent.textContent ?? "").trim().toLowerCase().replace(/\s+/g, " ");
      if (parentText === text.replace(/\s+/g, " ")) target = parent;
      else break;
    }
    target.style.display = "none";
    el.dataset.tpwlHidden = "1";
  }
}

function watchForShadowRoot(hostId: string) {
  let stopped = false;
  let observer: MutationObserver | null = null;

  const attach = (host: Element) => {
    if (!host.shadowRoot || observer) return;
    hidePoweredByBadge(host.shadowRoot);
    observer = new MutationObserver(() => hidePoweredByBadge(host.shadowRoot!));
    observer.observe(host.shadowRoot, { childList: true, subtree: true });
  };

  let attempts = 0;
  const poll = setInterval(() => {
    if (stopped) return clearInterval(poll);
    const host = document.getElementById(hostId);
    if (host?.shadowRoot) {
      attach(host);
      clearInterval(poll);
    } else if (++attempts > 60) {
      clearInterval(poll); // give up after ~30s — widget likely didn't load
    }
  }, 500);

  return () => {
    stopped = true;
    clearInterval(poll);
    observer?.disconnect();
  };
}

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
  useEffect(() => {
    const stopSearch = watchForShadowRoot("tpwl-search");
    const stopTickets = watchForShadowRoot("tpwl-tickets");
    return () => {
      stopSearch();
      stopTickets();
    };
  }, []);

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
