"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Hide a few bits of the Travelpayouts White Label widget UI we don't want:
// "Powered by", "Show hotels", and "Create multi-city route".
//
// The search *form* layout is no longer overridden here — we render our own
// SimpleSearchBar and keep the widget for results (#tpwl-tickets) only.
// ---------------------------------------------------------------------------

const HIDE_PATTERNS = [/powered\s*by/i, /show\s*hotels/i, /multi-?\s*city/i];

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

function watchForShadowRoot(hostId: string) {
  let stopped = false;
  let observer: MutationObserver | null = null;

  const attach = (host: Element) => {
    if (!host.shadowRoot || observer) return;
    hideMatchingElements(host.shadowRoot);
    observer = new MutationObserver(() => hideMatchingElements(host.shadowRoot!));
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
    const stopSearch = watchForShadowRoot("tpwl-search");
    const stopTickets = watchForShadowRoot("tpwl-tickets");
    return () => {
      stopSearch();
      stopTickets();
    };
  }, []);

  return null;
}
