'use client';

import { PaginationSkeleton } from './skeletons/PaginationSkeleton';
import { SkeletonList } from './skeletons/SkeletonList';
import { CountryList } from './ui/country-list/CountryList';
import { Flyout } from './ui/flyout/Flyout';
import { Pagination } from './ui/pagination/Pagination';
import {
  DehydratedState,
  HydrationBoundary,
  useQueryClient,
} from '@tanstack/react-query';
import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { useCountries } from 'hooks/useCountries';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function HomeClient({
  limit,
  page,
  search,
  dehydratedState,
}: {
  limit: number;
  page: number;
  search: string;
  dehydratedState: DehydratedState;
}) {
  const country = useSearchParams().get('details');
  const t = useTranslations('pagination');

  const qc = useQueryClient();
  const [isError, setIsError] = useState(false);

  const { data, error, isLoading, isFetching, isStale, refetch } = useCountries(
    { limit, page, search }
  );

  const handleInvalidate = () => {
    qc.invalidateQueries({ queryKey: ['countries'], exact: false });
    qc.invalidateQueries({ queryKey: ['details'], exact: false });
  };

  if (isError) {
    throw new Error('test error');
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <section>
        <Button variant="main" onClick={() => setIsError(true)}>
          {t('errorBtn')}
        </Button>
        <Button variant="main" onClick={handleInvalidate}>
          {t('invalidateButton')}
        </Button>

        {isLoading && (
          <>
            <PaginationSkeleton />
          </>
        )}
        {!isLoading && (
          <>
            <Pagination
              active={Boolean(country)}
              limit={limit}
              total={data?.total}
              next={Boolean(data?.next)}
              prev={Boolean(data?.prev)}
              page={page}
            />
          </>
        )}

        <div className="flex items-center gap-2">
          <Button variant="main" className="mb-2" onClick={() => refetch()}>
            {t('reloadBtn')}
          </Button>
          <div
            className={clsx(
              'w-fit rounded-2xl p-2',
              isStale ? 'bg-red-500' : 'bg-green-500'
            )}
          >
            {isStale ? t('oldData') : t('freshData')}
          </div>
        </div>

        {isLoading && <SkeletonList active={Boolean(country)} amount={limit} />}
        {!isLoading && (
          <CountryList
            isFetching={isFetching}
            error={error?.message}
            countries={data?.countries}
            activeCountry={country}
          />
        )}
        <Flyout />
      </section>
    </HydrationBoundary>
  );
}
