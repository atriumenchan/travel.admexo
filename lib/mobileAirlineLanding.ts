import type { LucideIcon } from "lucide-react";
import {
  Ticket,
  ArrowLeftRight,
  XCircle,
  DollarSign,
  Luggage,
  Headset,
  Clock,
  Users,
  Tag,
  Zap,
  Phone,
  Plane,
  ShieldCheck,
} from "lucide-react";

export type AirlineSlug = "southwest" | "united";

export type ServiceItem = {
  icon: LucideIcon;
  label: string;
};

export type HelpCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

export type ListItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

export type MobileAirlineLandingConfig = {
  slug: AirlineSlug;
  airlineName: string;
  shortName: string;
  variant: "southwest" | "united";
  primary: string;
  primaryDark: string;
  accent: string;
  headline: string;
  subheadline: string;
  intro: string;
  ctaLabel: string;
  serviceGrid: ServiceItem[];
  helpCards: HelpCard[];
  listItems?: ListItem[];
  trustStrip: { icon: LucideIcon; label: string }[];
};

export const MOBILE_AIRLINE_LANDINGS: Record<AirlineSlug, MobileAirlineLandingConfig> = {
  southwest: {
    slug: "southwest",
    airlineName: "Southwest Airlines",
    shortName: "Southwest",
    variant: "southwest",
    primary: "#1c4ed8",
    primaryDark: "#1e3a8a",
    accent: "#facc15",
    headline: "Southwest Airlines Fare Comparison",
    subheadline: "Fast. Friendly. Here for you.",
    intro:
      "Compare Southwest routes and fares on Skylerb — an independent metasearch platform. We are not Southwest Airlines and do not issue tickets.",
    ctaLabel: "Speak to a Skylerb Agent",
    serviceGrid: [
      { icon: Ticket, label: "Compare Fares" },
      { icon: ArrowLeftRight, label: "Route Search" },
      { icon: XCircle, label: "Policy Info" },
      { icon: DollarSign, label: "Price Alerts" },
      { icon: Luggage, label: "Baggage Info" },
      { icon: Headset, label: "24/7 Support" },
    ],
    helpCards: [
      {
        title: "Search Southwest flights",
        description: "Find routes and compare estimated fares from travel partners.",
        icon: Plane,
        tone: "border-slate-100",
      },
      {
        title: "Understand your options",
        description: "Get help reading results before you book on the provider site.",
        icon: ArrowLeftRight,
        tone: "border-slate-100",
      },
      {
        title: "Existing booking help",
        description: "For changes or refunds, contact the airline or agency on your confirmation.",
        icon: DollarSign,
        tone: "border-slate-100",
      },
    ],
    trustStrip: [
      { icon: Clock, label: "24/7 Available" },
      { icon: Zap, label: "Fast Answers" },
    ],
  },
  united: {
    slug: "united",
    airlineName: "United Airlines",
    shortName: "United",
    variant: "united",
    primary: "#002244",
    primaryDark: "#0a1628",
    accent: "#facc15",
    headline: "United Airlines Flight Search & Comparison",
    subheadline: "Low-Cost, Easy, Reliable Booking",
    intro:
      "Ready to compare United Airlines flights? Skylerb helps you search routes and fares in one place. We are independent — not United Airlines — and tickets are booked on partner sites.",
    ctaLabel: "Get United Fare Assistance",
    serviceGrid: [
      { icon: Clock, label: "24/7 Available" },
      { icon: Users, label: "Live Agents" },
      { icon: Tag, label: "No Hidden Fees" },
      { icon: Zap, label: "Fast Comparison" },
    ],
    helpCards: [
      {
        title: "New booking",
        description: "Speak to a Skylerb agent to compare United flight options.",
        icon: Phone,
        tone: "bg-emerald-50 border-emerald-100 text-emerald-800",
      },
      {
        title: "Change or modify",
        description: "Questions about results or redirects before you book elsewhere.",
        icon: Phone,
        tone: "bg-blue-50 border-blue-100 text-blue-800",
      },
      {
        title: "Cancellation info",
        description: "For existing tickets, contact the provider shown on your confirmation.",
        icon: Phone,
        tone: "bg-red-50 border-red-100 text-red-800",
      },
    ],
    listItems: [
      {
        title: "Compare United fares",
        description: "Live agents help you search routes and view partner pricing on Skylerb.",
        icon: Plane,
        tone: "bg-emerald-500",
      },
      {
        title: "Change or modify",
        description: "Understand options before completing changes on the airline or agency site.",
        icon: ArrowLeftRight,
        tone: "bg-blue-600",
      },
      {
        title: "Cancellation guidance",
        description: "We can explain comparison results — refunds are handled by your ticket provider.",
        icon: XCircle,
        tone: "bg-red-500",
      },
    ],
    trustStrip: [
      { icon: Headset, label: "24/7 Available" },
      { icon: Clock, label: "No Hold Time" },
      { icon: ShieldCheck, label: "Secure & Reliable" },
    ],
  },
};
