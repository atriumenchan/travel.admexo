import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SkyDeal — Find the Cheapest Flights",
    template: "%s | SkyDeal",
  },
  description:
    "Compare flights from hundreds of airlines and booking sites to find the cheapest prices. SkyDeal is your metasearch engine for affordable air travel.",
  keywords: ["cheap flights", "flight search", "airline tickets", "flight deals", "compare flights"],
  openGraph: {
    type: "website",
    siteName: "SkyDeal",
    title: "SkyDeal — Find the Cheapest Flights",
    description: "Compare flights from hundreds of airlines and booking sites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyDeal — Find the Cheapest Flights",
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
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
