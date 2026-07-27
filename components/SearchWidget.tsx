"use client";

import { useEffect, useRef } from "react";

export default function SearchWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const existing = document.getElementById("tp-widget-script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "tp-widget-script";
    script.async = true;
    script.src =
      "https://tpwdgt.com/content?currency=usd&trs=555469&shmarker=756745&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
    script.setAttribute("charset", "utf-8");

    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="w-full min-h-[80px]" />;
}
