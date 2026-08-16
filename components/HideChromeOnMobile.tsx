"use client";

import { useEffect } from "react";

/** Hides global navbar/footer on mobile for full-bleed landing pages. */
export default function HideChromeOnMobile() {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      document.documentElement.classList.toggle("mobile-landing", mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      document.documentElement.classList.remove("mobile-landing");
      mq.removeEventListener("change", apply);
    };
  }, []);

  return null;
}
