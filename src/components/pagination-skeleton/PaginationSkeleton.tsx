export const PaginationSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 rounded-full bg-amber-50/30"></div>
          <div className="h-10 w-20 rounded-2xl bg-amber-50/30"></div>
        </div>

        <div className="grid gap-1">
          <div className="h-10 w-40 rounded-2xl bg-amber-50/30"></div>
          <div className="h-10 w-40 rounded-2xl bg-amber-50/30"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 p-2 sm:flex-row">
        <div className="h-10 w-20 rounded-xl bg-amber-50/30"></div>

        <div className="flex gap-2 self-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-14 rounded-xl bg-amber-50/30"></div>
          ))}
        </div>

        <div className="h-10 w-20 rounded-xl bg-amber-50/30"></div>
      </div>
    </div>
  );
};
