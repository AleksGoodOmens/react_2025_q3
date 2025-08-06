import clsx from 'clsx';

interface Props {
  amount: number;
  isActive: boolean;
  className?: string;
}

export const SkeletonList = ({ amount, isActive, className }: Props) => {
  return (
    <ul
      className={clsx(
        'relative order-1 grid grid-cols-1 gap-2 rounded-2xl border-2 md:order-0',
        isActive ? '' : 'md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {[...Array(amount)].map((_, i) => (
        <SkeletonListItem key={`skeleton-${i}`} />
      ))}
    </ul>
  );
};

const SkeletonListItem = () => {
  return (
    <li
      role="status"
      aria-busy="true"
      className="grow basis-xs animate-pulse p-2"
    >
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
