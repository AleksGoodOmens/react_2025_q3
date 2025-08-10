import clsx from 'clsx';
import { useState } from 'react';
import { Outlet, useLoaderData, useParams } from 'react-router';
import type { IHomePageProps } from '@/interfaces';

import { useCountries } from '@/hooks';

import {
  Button,
  CountryList,
  Flyout,
  Heading,
  Pagination,
  PaginationSkeleton,
  SearchForm,
  SearchFormSkeleton,
  SkeletonList,
} from '@/components';

const Home = () => {
  const { country } = useParams();
  const [isError, setIsError] = useState(false);
  const { limit, page, search } = useLoaderData<IHomePageProps>();
  const { data, error, isLoading, isFetching, refetch } = useCountries({
    limit,
    page,
    search,
  });

  if (isError) {
    throw new Error('test error');
  }

  return (
    <section>
      <Heading variant="main" Tag="h1">
        Countries by AmensGood
      </Heading>
      <Button
        variant="main"
        onClick={() => {
          setIsError(true);
        }}
      >
        error
      </Button>
      {isLoading && (
        <>
          <SearchFormSkeleton />
          <PaginationSkeleton />
        </>
      )}
      {!isLoading && (
        <>
          <SearchForm />
          <Pagination
            limit={limit}
            total={data?.total}
            next={Boolean(data?.next)}
            prev={Boolean(data?.prev)}
            page={page}
          />
        </>
      )}
      <Button variant="main" className="mb-2" onClick={() => refetch()}>
        fresh reload
      </Button>
      <div
        className={clsx(
          'relative grid gap-2',
          Boolean(country) && 'md:grid-cols-2'
        )}
      >
        {isLoading && <SkeletonList active={Boolean(country)} amount={limit} />}
        {!isLoading && (
          <CountryList
            isFetching={isFetching}
            error={error?.message}
            countries={data?.countries}
            activeCountry={country}
          />
        )}

        <Outlet />
      </div>
      <Flyout />
    </section>
  );
};

export default Home;
