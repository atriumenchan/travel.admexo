"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Hide a few bits of the widget's own UI we don't want: the "Powered by
// Travelpayouts" badge, the "Show hotels" toggle, and the "Create
// multi-city route" link (this site only supports simple origin/destination
// search, so these controls have no page for them to link to).
//
// The widget renders into an *open* shadow root (confirmed via devtools:
// document.querySelector('#tpwl-search').shadowRoot is accessible), so we
// can safely reach in and hide these — this doesn't touch anything
// Travelpayouts itself serves, it just adjusts presentation in our own page.
// Travelpayouts also exposes official toggles for some of this in the White
// Label dashboard (Content/Design tab), which is the more durable place to
// control it long term; this is a client-side belt-and-suspenders fix.
//
// The widget's internal class names are auto-generated/hashed (e.g.
// "TripClassList-module__root__4xZiP") and can change on their next release,
// so instead of hardcoding selectors we walk the shadow DOM for whichever
// element's text matches one of these patterns and hide its smallest
// self-contained container (walking up while the parent's only text is the
// same match — this naturally also captures a sibling checkbox input, which
// has no text of its own). A MutationObserver keeps re-checking as the
// widget re-renders (e.g. after a search), since these can be removed and
// re-added.
//
// Split into its own client component (separate from TravelpayoutsWidget,
// which is a server component) so hydrating this small bit of JS never
// delays the actual widget <script> tag, which needs to start loading the
// instant the page's HTML is parsed, not after React hydrates.
// ---------------------------------------------------------------------------

const HIDE_PATTERNS = [/powered\s*by/i, /show\s*hotels/i, /multi-?\s*city/i];

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
    const stopSearch = watchForShadowRoot("tpwl-search");
    const stopTickets = watchForShadowRoot("tpwl-tickets");
    return () => {
      stopSearch();
      stopTickets();
    };
  }, []);

  return null;
}
