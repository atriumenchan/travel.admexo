"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Client-side tweaks for the Travelpayouts White Label widget (open shadow
// DOM). Match class prefixes (not full hashes) so this survives widget updates.
//
// 1) Hide: "Powered by", "Show hotels", "Create multi-city".
// 2) Layout only (no color changes): compact two-row grid
//      Row 1 — Origin | Destination   (full width)
//      Row 2 — Depart | Return | Passengers | Search  (4 equal columns)
// ---------------------------------------------------------------------------

const HIDE_PATTERNS = [/powered\s*by/i, /show\s*hotels/i, /multi-?\s*city/i];

const SEARCH_LAYOUT_CSS = `
  [class*="DefaultSearch-module__root"] {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 0.375rem !important;
    align-items: stretch !important;
    width: 100% !important;
  }

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
    max-width: none !important;
    width: 100% !important;
  }

  /* Row 1 — airports only (NOT the date picker's mergedInputs) */
  [data-skylerb-slot="places"] {
    grid-column: 1 / -1 !important;
    display: flex !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }

  [data-skylerb-slot="places"] [class*="Input-module__root"],
  [data-skylerb-slot="places"] [class*="mergedInputLeft"],
  [data-skylerb-slot="places"] [class*="mergedInputRight"] {
    flex: 1 1 0 !important;
    width: 50% !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow: hidden !important;
  }

  /* Row 2 — explicit columns so nothing collapses left */
  [data-skylerb-slot="dates"] {
    grid-column: 1 / span 2 !important;
    min-width: 0 !important;
    width: auto !important;
    max-width: none !important;
  }

  [data-skylerb-slot="dates"] [class*="DateRangePicker-module__mergedInputs"],
  [data-skylerb-slot="dates"] [class*="mergedInputs"] {
    display: flex !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
  }

  [data-skylerb-slot="dates"] [class*="Input-module__root"],
  [data-skylerb-slot="dates"] [class*="mergedInputLeft"],
  [data-skylerb-slot="dates"] [class*="mergedInputRight"] {
    flex: 1 1 0 !important;
    min-width: 0 !important;
    width: 50% !important;
  }

  [data-skylerb-slot="passengers"] {
    grid-column: 3 / span 1 !important;
    min-width: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }

  [data-skylerb-slot="submit"] {
    grid-column: 4 / span 1 !important;
    display: flex !important;
    min-width: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }

  [data-skylerb-slot="submit"] [class*="Button-module__root"],
  [data-skylerb-slot="submit"] button {
    width: 100% !important;
    max-width: none !important;
    height: 100% !important;
    flex: 1 1 auto !important;
  }

  [class*="DefaultSearch-module__flex1"],
  [class*="DefaultSearch-module__flex2"] {
    min-width: 0 !important;
  }

  [class*="SearchEdit-module__form"],
  [class*="SearchEdit-module__root"] {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* Tablet: airports + dates full width; pax + search side by side */
  @container (width <= 640px) {
    [class*="DefaultSearch-module__root"] {
      grid-template-columns: 1fr 1fr !important;
    }

    [data-skylerb-slot="places"],
    [data-skylerb-slot="dates"] {
      grid-column: 1 / -1 !important;
    }

    [data-skylerb-slot="passengers"] {
      grid-column: 1 / span 1 !important;
    }

    [data-skylerb-slot="submit"] {
      grid-column: 2 / span 1 !important;
    }
  }

  /* Phone: stack everything */
  @container (width <= 420px) {
    [class*="DefaultSearch-module__root"] {
      grid-template-columns: 1fr !important;
    }

    [data-skylerb-slot="places"],
    [data-skylerb-slot="dates"],
    [data-skylerb-slot="passengers"],
    [data-skylerb-slot="submit"] {
      grid-column: 1 / -1 !important;
    }

    [data-skylerb-slot="places"] {
      flex-direction: column !important;
    }

    [data-skylerb-slot="places"] [class*="Input-module__root"] {
      width: 100% !important;
    }
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

  // IMPORTANT: check dates BEFORE places. The date picker also contains a
  // [class*=mergedInputs] node — an earlier version tagged dates as
  // "places", forcing them full-width and leaving pax/search crammed left.
  for (const el of Array.from(root.children) as HTMLElement[]) {
    const cls = el.className?.toString?.() ?? "";

    if (el.querySelector('[class*="DateRangePicker"], [class*="DatePicker"], [class*="FlightsDate"]')) {
      el.dataset.skylerbSlot = "dates";
    } else if (
      cls.includes("passengersPicker") ||
      el.querySelector('[class*="PassengersPicker"], [class*="TripClass"], [class*="Passengers"]')
    ) {
      el.dataset.skylerbSlot = "passengers";
    } else if (cls.includes("submitBtn") || el.matches("button") || el.querySelector(":scope > button, :scope > a")) {
      el.dataset.skylerbSlot = "submit";
    } else if (
      cls.includes("DefaultSearch-module__mergedInputs") ||
      cls.includes("flex2") ||
      (cls.includes("mergedInputs") && !cls.includes("DateRange"))
    ) {
      el.dataset.skylerbSlot = "places";
    }
  }

  // Inline grid placement as a belt-and-suspenders backup against widget CSS
  const width = root.clientWidth || 0;
  root.style.setProperty("display", "grid", "important");
  root.style.setProperty("align-items", "stretch", "important");
  root.style.setProperty("width", "100%", "important");
  root.style.setProperty("gap", "0.375rem", "important");

  if (width > 0 && width <= 420) {
    root.style.setProperty("grid-template-columns", "1fr", "important");
  } else if (width > 0 && width <= 640) {
    root.style.setProperty("grid-template-columns", "1fr 1fr", "important");
  } else {
    root.style.setProperty("grid-template-columns", "repeat(4, minmax(0, 1fr))", "important");
  }

  for (const el of Array.from(root.children) as HTMLElement[]) {
    const slot = el.dataset.skylerbSlot;
    el.style.minWidth = "0";
    el.style.maxWidth = "none";

    if (width > 0 && width <= 420) {
      el.style.setProperty("grid-column", "1 / -1", "important");
      el.style.width = "100%";
      continue;
    }

    if (width > 0 && width <= 640) {
      if (slot === "places" || slot === "dates") {
        el.style.setProperty("grid-column", "1 / -1", "important");
        el.style.width = "100%";
      } else if (slot === "passengers") {
        el.style.setProperty("grid-column", "1 / span 1", "important");
        el.style.width = "100%";
      } else if (slot === "submit") {
        el.style.setProperty("grid-column", "2 / span 1", "important");
        el.style.width = "100%";
      }
      continue;
    }

    if (slot === "places") {
      el.style.setProperty("grid-column", "1 / -1", "important");
      el.style.width = "100%";
    } else if (slot === "dates") {
      el.style.setProperty("grid-column", "1 / span 2", "important");
      el.style.width = "auto";
    } else if (slot === "passengers") {
      el.style.setProperty("grid-column", "3 / span 1", "important");
      el.style.width = "100%";
    } else if (slot === "submit") {
      el.style.setProperty("grid-column", "4 / span 1", "important");
      el.style.width = "100%";
      el.style.display = "flex";
      const btn = el.querySelector<HTMLElement>("button, [class*='Button-module__root']");
      if (btn) {
        btn.style.setProperty("width", "100%", "important");
        btn.style.setProperty("max-width", "none", "important");
        btn.style.setProperty("height", "100%", "important");
      }
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
  let resizeObserver: ResizeObserver | null = null;

  const attach = (host: Element) => {
    if (!host.shadowRoot || observer) return;
    if (options.injectLayout) {
      injectSearchLayoutStyles(host.shadowRoot);
      const root = host.shadowRoot.querySelector('[class*="DefaultSearch-module__root"]');
      if (root && typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (host.shadowRoot) applySearchLayoutHints(host.shadowRoot);
        });
        resizeObserver.observe(root);
      }
    }
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
    resizeObserver?.disconnect();
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
