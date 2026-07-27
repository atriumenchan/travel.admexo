"use client";

import Script from "next/script";

export default function SearchWidget() {
  return (
    <div className="w-full">
      <Script
        src="https://tpwdgt.com/content?currency=usd&trs=555469&shmarker=756745&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111"
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </div>
  );
}
