export const SkeletonListItem = () => {
  return (
    <li
      role="status"
      aria-busy="true"
      className="flex grow basis-xs animate-pulse gap-2"
    >
      <div className="aspect-video h-full w-[75] rounded-lg bg-amber-50/30"></div>
      <div className="mt-3 w-full space-y-2">
        <div className="h-4 w-full rounded bg-amber-50/30"></div>
        <div className="h-4 w-[60%] rounded bg-amber-50/30"></div>
        <div className="h-4 w-[40%] rounded bg-amber-50/30"></div>
      </div>
    </li>
  );
};
