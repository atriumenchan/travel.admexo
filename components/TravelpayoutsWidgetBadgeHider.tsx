"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Client-side tweaks for the Travelpayouts White Label widget (open shadow
// DOM). We intentionally avoid hardcoding full hashed class names — those
// change across Travelpayouts releases — and instead match stable prefixes
// like "DefaultSearch-module__mergedInputs".
//
// 1) Hide UI we don't want: "Powered by", "Show hotels", "Create multi-city".
// 2) Layout only (no color changes): compact two-row grid that stays readable
//    without dominating the page:
//      Row 1 — Origin | Destination
//      Row 2 — Depart | Return | Passengers | Search
//    The host caps the search bar at ~960px; these rules keep fields shorter
//    and responsive across phone / tablet / desktop.
// ---------------------------------------------------------------------------

const HIDE_PATTERNS = [/powered\s*by/i, /show\s*hotels/i, /multi-?\s*city/i];

const SEARCH_LAYOUT_CSS = `
  /* ---- Compact 2-row grid (layout only — no color overrides) ----------- */
  [class*="DefaultSearch-module__root"] {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 0.375rem !important;
    align-items: stretch !important;
    width: 100% !important;
  }

  /* Slightly shorter fields so the form doesn't dominate the hero */
  [class*="Input-module__input"],
  [class*="Input-module__button"] {
    padding-top: 0.8rem !important;
    padding-bottom: 0.8rem !important;
    font-size: 0.9rem !important;
  }

  [class*="Input-module__withSubvalue"] {
    padding-top: 0.45rem !important;
    padding-bottom: 0.45rem !important;
  }

  [class*="Button-module__root"] {
    padding-block: 0.8rem !important;
    font-size: 1rem !important;
  }

  /* Row 1: origin + destination span all 4 columns */
  [class*="DefaultSearch-module__mergedInputs"],
  [data-skylerb-slot="places"] {
    grid-column: 1 / -1 !important;
    display: flex !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }

  [class*="DefaultSearch-module__mergedInputs"] [class*="Input-module__root"],
  [class*="DefaultSearch-module__mergedInputLeft"],
  [class*="DefaultSearch-module__mergedInputRight"],
  [data-skylerb-slot="places"] [class*="Input-module__root"] {
    flex: 1 1 0 !important;
    width: 50% !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow: hidden !important;
  }

  [class*="DefaultSearch-module__mergedInputs"] [class*="Input-module__input"],
  [data-skylerb-slot="places"] [class*="Input-module__input"] {
    text-overflow: ellipsis !important;
  }

  /* Row 2: dates take 2 of 4 columns (Depart | Return inside) */
  [data-skylerb-slot="dates"],
  [class*="DefaultSearch-module__flex1"]:has([class*="DateRangePicker"]),
  [class*="DefaultSearch-module__flex1"]:has([class*="DatePicker"]) {
    grid-column: span 2 !important;
    min-width: 0 !important;
    width: auto !important;
    max-width: none !important;
  }

  [class*="DateRangePicker-module__mergedInputs"] {
    display: flex !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
  }

  [class*="DateRangePicker-module__mergedInputs"] [class*="Input-module__root"],
  [class*="DateRangePicker-module__mergedInputLeft"],
  [class*="DateRangePicker-module__mergedInputRight"] {
    flex: 1 1 0 !important;
    min-width: 0 !important;
    width: 50% !important;
  }

  [data-skylerb-slot="passengers"],
  [class*="DefaultSearch-module__flex1"]:has([class*="PassengersPicker"]),
  [class*="DefaultSearch-module__passengersPicker"] {
    grid-column: span 1 !important;
    min-width: 0 !important;
    width: auto !important;
    max-width: none !important;
  }

  [data-skylerb-slot="submit"],
  [class*="DefaultSearch-module__submitBtn"] {
    grid-column: span 1 !important;
    display: flex !important;
    min-width: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }

  [data-skylerb-slot="submit"] [class*="Button-module__root"],
  [data-skylerb-slot="submit"] button,
  [class*="DefaultSearch-module__submitBtn"] [class*="Button-module__root"],
  [class*="DefaultSearch-module__submitBtn"] button {
    width: 100% !important;
    max-width: none !important;
    height: 100% !important;
  }

  [class*="DefaultSearch-module__flex1"] {
    min-width: 0 !important;
  }
  [class*="DefaultSearch-module__flex2"] {
    grid-column: 1 / -1 !important;
    min-width: 0 !important;
  }

  [class*="SearchEdit-module__form"],
  [class*="SearchEdit-module__root"] {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* ---- Tablet / small desktop ------------------------------------------- */
  @container (width <= 700px) {
    [class*="DefaultSearch-module__root"] {
      grid-template-columns: 1fr 1fr !important;
      gap: 0.375rem !important;
    }

    [class*="DefaultSearch-module__mergedInputs"],
    [data-skylerb-slot="places"],
    [data-skylerb-slot="dates"] {
      grid-column: 1 / -1 !important;
    }

    [data-skylerb-slot="passengers"],
    [data-skylerb-slot="submit"],
    [class*="DefaultSearch-module__submitBtn"] {
      grid-column: span 1 !important;
    }
  }

  /* ---- Phones ---------------------------------------------------------- */
  @container (width <= 480px) {
    [class*="DefaultSearch-module__root"] {
      grid-template-columns: 1fr !important;
    }

    [class*="DefaultSearch-module__mergedInputs"],
    [class*="DefaultSearch-module__flex1"],
    [class*="DefaultSearch-module__passengersPicker"],
    [class*="DefaultSearch-module__submitBtn"],
    [data-skylerb-slot="places"],
    [data-skylerb-slot="dates"],
    [data-skylerb-slot="passengers"],
    [data-skylerb-slot="submit"] {
      grid-column: 1 / -1 !important;
    }

    [class*="DefaultSearch-module__mergedInputs"],
    [data-skylerb-slot="places"] {
      flex-direction: column !important;
    }

    [class*="DefaultSearch-module__mergedInputs"] [class*="Input-module__root"],
    [class*="DefaultSearch-module__mergedInputLeft"],
    [class*="DefaultSearch-module__mergedInputRight"],
    [data-skylerb-slot="places"] [class*="Input-module__root"] {
      width: 100% !important;
    }

    [class*="Input-module__input"],
    [class*="Input-module__button"],
    [class*="Button-module__root"] {
      padding-block: 0.75rem !important;
    }
  }

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
    if (el.children.length > 0) continue;
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

function applySearchLayoutHints(shadowRoot: ShadowRoot) {
  const root = shadowRoot.querySelector<HTMLElement>('[class*="DefaultSearch-module__root"]');
  if (!root) return;

  for (const el of Array.from(root.children) as HTMLElement[]) {
    const cls = el.className?.toString?.() ?? "";
    if (cls.includes("mergedInputs") || cls.includes("flex2") || el.querySelector('[class*="mergedInputs"]')) {
      el.dataset.skylerbSlot = "places";
    } else if (el.querySelector('[class*="DateRangePicker"], [class*="DatePicker"], [class*="FlightsDate"]')) {
      el.dataset.skylerbSlot = "dates";
    } else if (
      cls.includes("passengersPicker") ||
      el.querySelector('[class*="PassengersPicker"], [class*="TripClass"]')
    ) {
      el.dataset.skylerbSlot = "passengers";
    } else if (cls.includes("submitBtn") || el.tagName === "BUTTON" || el.querySelector("button")) {
      el.dataset.skylerbSlot = "submit";
    }
  }
}

function injectSearchLayoutStyles(shadowRoot: ShadowRoot) {
  applySearchLayoutHints(shadowRoot);

  const existing = shadowRoot.querySelector("style[data-skylerb-search-layout]") as HTMLStyleElement | null;
  if (existing) {
    if (existing.textContent !== SEARCH_LAYOUT_CSS) existing.textContent = SEARCH_LAYOUT_CSS;
    return;
  }
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
      clearInterval(poll);
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
