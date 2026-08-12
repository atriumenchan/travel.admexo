"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Client-side tweaks for the Travelpayouts White Label widget (open shadow
// DOM). We intentionally avoid hardcoding full hashed class names — those
// change across Travelpayouts releases — and instead match stable prefixes
// like "DefaultSearch-module__mergedInputs".
//
// 1) Hide UI we don't want: "Powered by", "Show hotels", "Create multi-city".
// 2) Fix cramped airport fields: the default single-row layout assigns each
//    origin/destination input a ~9.6rem min-width below 1440px, which clips
//    names like "New York, United States" / "Los Angeles" behind ellipsis.
//    We give the airport pair a full-width first row so both cities (and
//    their IATA codes) stay readable, with dates / passengers / search on
//    the second row.
// ---------------------------------------------------------------------------

const HIDE_PATTERNS = [/powered\s*by/i, /show\s*hotels/i, /multi-?\s*city/i];

const SEARCH_LAYOUT_CSS = `
  /* Full-width airport pair on its own row so city names aren't truncated */
  [class*="DefaultSearch-module__root"] {
    flex-wrap: wrap !important;
    align-items: stretch !important;
  }

  [class*="DefaultSearch-module__mergedInputs"] {
    flex: 1 1 100% !important;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
  }

  [class*="DefaultSearch-module__mergedInputs"] [class*="Input-module__root"] {
    flex: 1 1 0 !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  /* Prefer clipping over aggressive ellipsis once we have enough width;
     with a full-width row, common city names fit without truncation. */
  [class*="DefaultSearch-module__mergedInputs"] [class*="Input-module__input"] {
    text-overflow: ellipsis !important;
  }

  /* Second row: dates + passengers share space; search stays compact */
  [class*="DefaultSearch-module__flex1"] {
    flex: 1 1 11rem !important;
    min-width: 10rem !important;
    max-width: 100% !important;
  }

  [class*="DefaultSearch-module__submitBtn"],
  [class*="DefaultSearch-module__submitBtn"] button {
    flex: 1 1 10rem !important;
    min-width: 10rem !important;
    max-width: 100% !important;
  }

  /* Multi-city variant (if shown): same priority for the places block */
  [class*="MultiRouteSearch-module__places"],
  [class*="MultiRouteSearch-module__mergedInputs"] {
    min-width: 0 !important;
  }
  [class*="MultiRouteSearch-module__mergedInputs"] [class*="Input-module__root"] {
    min-width: 0 !important;
  }
`;

function hideMatchingElements(root: ParentNode) {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>("*"));
  for (const el of candidates) {
    if (el.children.length > 0) continue; // only consider leaf nodes
    const text = (el.textContent ?? "").trim().toLowerCase();
    if (!text || !HIDE_PATTERNS.some((p) => p.test(text))) continue;
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

function injectSearchLayoutStyles(shadowRoot: ShadowRoot) {
  if (shadowRoot.querySelector("style[data-skylerb-search-layout]")) return;
  const style = document.createElement("style");
  style.dataset.skylerbSearchLayout = "1";
  style.textContent = SEARCH_LAYOUT_CSS;
  shadowRoot.appendChild(style);
}

function watchForShadowRoot(hostId: string, options: { injectLayout?: boolean } = {}) {
  let stopped = false;
  let observer: MutationObserver | null = null;

  const attach = (host: Element) => {
    if (!host.shadowRoot || observer) return;
    if (options.injectLayout) injectSearchLayoutStyles(host.shadowRoot);
    hideMatchingElements(host.shadowRoot);
    observer = new MutationObserver(() => {
      if (options.injectLayout) injectSearchLayoutStyles(host.shadowRoot!);
      hideMatchingElements(host.shadowRoot!);
    });
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

export default function TravelpayoutsWidgetBadgeHider() {
  useEffect(() => {
    const stopSearch = watchForShadowRoot("tpwl-search", { injectLayout: true });
    const stopTickets = watchForShadowRoot("tpwl-tickets");
    return () => {
      stopSearch();
      stopTickets();
    };
  }, []);

  return null;
}
