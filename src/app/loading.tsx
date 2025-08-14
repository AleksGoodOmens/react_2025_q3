import { DetailsSkeleton } from './components/skeletons/DetailsSkeleton';
import { PaginationSkeleton } from './components/skeletons/PaginationSkeleton';
import { SearchFormSkeleton } from './components/skeletons/SearchFromSkeleton';
import { SkeletonList } from './components/skeletons/SkeletonList';
import clsx from 'clsx';
import { IHomePageSearchParams } from 'interfaces/index';

interface PageProps {
  searchParams: IHomePageSearchParams;
}
export default async function Loading({ searchParams }: PageProps) {
  const params = searchParams;

  return (
    <section>
      <SearchFormSkeleton />
      <PaginationSkeleton />
      <div
        className={clsx(
          'relative grid gap-2',
          Boolean(params?.details) && 'md:grid-cols-2'
        )}
      >
        <SkeletonList
          amount={Number(params?.limit) || 20}
          active={Boolean(params?.details)}
        />
        <DetailsSkeleton />
      </div>
    </section>
  );
}
