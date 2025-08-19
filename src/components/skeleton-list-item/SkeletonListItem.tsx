export const SkeletonListItem = () => {
  return (
    <li role="status" aria-busy="true" className="grow basis-xs animate-pulse">
      <div className="mx-auto h-4 w-1/2 rounded bg-amber-50/30"></div>
      <div className="flex gap-2">
        <div className="aspect-video h-15 w-20 rounded-lg bg-amber-50/30"></div>
        <div className="mt-3 w-full space-y-2">
          <div className="h-4 w-full rounded bg-amber-50/30"></div>
          <div className="h-4 w-[60%] rounded bg-amber-50/30"></div>
          <div className="h-4 w-[40%] rounded bg-amber-50/30"></div>
        </div>
      </div>
    </li>
  );
};
