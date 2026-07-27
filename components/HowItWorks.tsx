import { Search, ArrowRight, CreditCard } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    description: "Enter your origin, destination, and dates. We search hundreds of airlines and booking sites instantly.",
    color: "bg-brand-100 text-brand-600",
  },
  {
    icon: ArrowRight,
    title: "Compare",
    description: "See all available flights sorted by price, speed, or best value. Filter by stops, airline, or time.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: CreditCard,
    title: "Book",
    description: "Click any result to go straight to the airline or OTA site and complete your booking at the best price.",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {STEPS.map((step, idx) => (
        <div key={step.title} className="flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-4`}>
            <step.icon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {idx + 1}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
