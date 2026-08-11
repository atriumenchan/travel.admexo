import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Skylerb — Find the Cheapest Flights",
    template: "%s | Skylerb",
  },
  description:
    "Compare flights from hundreds of airlines and booking sites to find the cheapest prices. Skylerb is your metasearch engine for affordable air travel.",
  keywords: ["cheap flights", "flight search", "airline tickets", "flight deals", "compare flights"],
  openGraph: {
    type: "website",
    siteName: "Skylerb",
    title: "Skylerb — Find the Cheapest Flights",
    description: "Compare flights from hundreds of airlines and booking sites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skylerb — Find the Cheapest Flights",
    description: "Compare flights from hundreds of airlines and booking sites.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="tp-drive"
          src="https://tp-em.com/NTU1NDY5.js?t=555469"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
