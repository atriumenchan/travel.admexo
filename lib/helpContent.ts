/** Shared help-center copy — imported by /help and referenced from /contact. */

export const SEARCH_TIPS = [
  "Use the official airport code when you know it (JFK, LAX, ORD) — results are more accurate than city names with multiple airports.",
  "If your city has several airports, search each one or pick the closest — fares can differ significantly between airports in the same metro area.",
  "For international trips, confirm whether results show the full itinerary including connections — nonstop vs one-stop can change price and travel time.",
  "Traveling with infants or children? Set the correct passenger count before searching so per-person pricing is closer to what you will pay at checkout.",
  "Basic economy fares often restrict seat selection, carry-on bags, and changes — compare total trip cost including bags before choosing the cheapest row.",
  "Red-eye and mid-week departures are often cheaper than Friday afternoon or Sunday evening peaks.",
  "Searching twice a few hours apart can surface different prices — airlines adjust inventory frequently.",
  "Clear your search and start fresh if you change dates or passengers — leftover fields sometimes cause confusing results.",
];

export const FARE_GLOSSARY = [
  {
    term: "Metasearch",
    definition:
      "A comparison site like SkyLerb that shows offers from many sellers. You compare here; you pay on the airline or agency site.",
  },
  {
    term: "OTA (Online Travel Agency)",
    definition:
      "A website that sells tickets from multiple airlines (Expedia-style). Your confirmation comes from the OTA even if the flight is operated by an airline.",
  },
  {
    term: "PNR / Record locator",
    definition:
      "The 6-character booking reference on your confirmation. Airlines use it to find your reservation — keep it handy.",
  },
  {
    term: "Codeshare",
    definition:
      "A flight marketed by one airline but operated by another. Check which airline operates the flight for check-in and baggage rules.",
  },
  {
    term: "Basic economy",
    definition:
      "A lower fare class with more restrictions — often limited or no free carry-on, no changes, and back-of-plane seat assignment.",
  },
  {
    term: "Layover / connection",
    definition:
      "A stop between origin and destination. Allow enough connection time — especially for international arrivals that require immigration.",
  },
  {
    term: "Fare rules",
    definition:
      "The contract for your ticket — change fees, refundability, and no-show policies. Read these on the booking site before you pay.",
  },
  {
    term: "Travel credit / voucher",
    definition:
      "Airline-issued credit from a canceled or changed trip. Usually has an expiration date and may only work on that airline.",
  },
];

export const BOOKING_SCENARIOS = [
  {
    title: "Price went up after I clicked",
    problem: "SkyLerb showed one price, but checkout on the partner site was higher.",
    steps: [
      "This is common — inventory and taxes refresh between search and checkout.",
      "Compare the final total on the partner page, not only the headline fare.",
      "Try the same flight on the airline's own site to see if pricing matches.",
      "If the jump is extreme, go back and run a new search or pick the next-best option.",
    ],
  },
  {
    title: "Payment went through but no email",
    problem: "You were charged but did not receive a confirmation within an hour.",
    steps: [
      "Check spam, promotions, and all email inboxes tied to the address you used.",
      "Log in to the airline or OTA website with the same email — the booking may be in your account.",
      "Find the merchant name on your card statement and call that company's support with the charge date and amount.",
      "Do not book again until you confirm whether the first purchase completed — duplicate bookings are hard to unwind.",
    ],
  },
  {
    title: "Wrong name on the ticket",
    problem: "A passenger name was misspelled or does not match the passport.",
    steps: [
      "Contact the airline or agency that issued the ticket immediately — not SkyLerb.",
      "Minor typos are sometimes fixable for free; legal name changes may require reissue fees.",
      "Have your PNR, passport copy, and the exact spelling ready.",
      "Airlines can deny boarding if names do not match travel documents — fix this before travel day.",
    ],
  },
  {
    title: "Need to cancel or change dates",
    problem: "Your plans changed after you bought a ticket.",
    steps: [
      "Open your confirmation and read the fare rules — refundable vs non-refundable matters.",
      "Use the manage-booking tool on the issuer's website or call their support line.",
      "Airline credits and refunds follow the seller's policy, not SkyLerb's.",
      "If you bought through an OTA, changes often must go through the OTA first.",
    ],
  },
  {
    title: "Missed a flight or connection",
    problem: "You arrived late or a delay caused you to miss a leg.",
    steps: [
      "Go to the airline's airport desk or call their operations line immediately.",
      "The operating carrier decides rebooking options — standby, fees, and hotel vouchers vary by cause and fare type.",
      "Keep boarding passes and delay notices — they help if you claim compensation later.",
    ],
  },
  {
    title: "Baggage was lost or damaged",
    problem: "Your checked bag did not arrive or arrived broken.",
    steps: [
      "Report it at the airline's baggage office in the arrival airport before you leave — do not skip this step.",
      "Keep bag tags, boarding passes, and photos of damage.",
      "Track the claim through the airline's baggage portal; compensation rules differ by carrier and route.",
    ],
  },
  {
    title: "Duplicate charge on my card",
    problem: "You see two similar charges for one trip.",
    steps: [
      "Check whether one charge is a temporary authorization that will drop off in a few days.",
      "Compare merchant names — sometimes the airline and the OTA both appear during processing.",
      "If two confirmed bookings exist, contact the seller listed on each confirmation to cancel the duplicate.",
      "Your bank can help with disputes only after you have tried the merchant's support channel.",
    ],
  },
  {
    title: "Special assistance (wheelchair, medical)",
    problem: "You need mobility help, oxygen, or other accommodations.",
    steps: [
      "Request special assistance directly with the operating airline — ideally at booking or at least 48 hours before departure.",
      "Arrive early on travel day and confirm the request at the check-in desk.",
      "SkyLerb cannot add medical notes to airline systems after you book elsewhere.",
    ],
  },
];
