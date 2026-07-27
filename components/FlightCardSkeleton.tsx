export default function FlightCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-40 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-slate-200" />
          <div className="space-y-1.5">
            <div className="h-3.5 bg-slate-200 rounded w-24" />
            <div className="h-3 bg-slate-200 rounded w-16" />
          </div>
        </div>

        <div className="flex-1 flex items-center gap-6">
          <div className="text-center space-y-1.5">
            <div className="h-7 bg-slate-200 rounded w-14 mx-auto" />
            <div className="h-3 bg-slate-200 rounded w-10 mx-auto" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-slate-200 rounded w-20 mx-auto" />
            <div className="h-px bg-slate-200 w-full" />
            <div className="h-3 bg-slate-200 rounded w-16 mx-auto" />
          </div>
          <div className="text-center space-y-1.5">
            <div className="h-7 bg-slate-200 rounded w-14 mx-auto" />
            <div className="h-3 bg-slate-200 rounded w-10 mx-auto" />
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto">
          <div className="space-y-1.5">
            <div className="h-8 bg-slate-200 rounded w-20" />
            <div className="h-3 bg-slate-200 rounded w-16" />
          </div>
          <div className="h-10 bg-slate-200 rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
}
