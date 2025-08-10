export const SearchFormSkeleton = () => {
  return (
    <div
      role="status"
      className="my-2 grid animate-pulse gap-2 sm:grid-cols-6 sm:justify-center"
    >
      <div className="flex w-full items-center gap-2 rounded-xl border-2 bg-amber-50/10 px-4 py-2 sm:col-span-5">
        <div className="h-6 w-16 rounded-full bg-amber-50/30"></div>
        <div className="h-8 w-full rounded-xl bg-amber-50/30"></div>
      </div>

      <div className="h-12 rounded-xl bg-amber-50/30"></div>
    </div>
  );
};
