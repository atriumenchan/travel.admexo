import FlightCardSkeleton from "@/components/FlightCardSkeleton";

export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-700 py-5 px-4">
        <div className="max-w-7xl mx-auto h-20 bg-brand-600/50 rounded-2xl animate-pulse" />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-64 animate-pulse mb-6" />
        {Array.from({ length: 6 }).map((_, i) => (
          <FlightCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
