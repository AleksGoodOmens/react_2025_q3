import clsx from 'clsx';
import { useState } from 'react';
import { Outlet, useLoaderData, useParams } from 'react-router';

import type { IHomePageProps } from '@/interfaces';

import { useCountries } from '@/hooks/useCountries';

import {
  Button,
  CountryList,
  Flyout,
  Pagination,
  SearchForm,
  SkeletonList,
} from '@/components';

const Home = () => {
  const { country } = useParams();
  const [isError, setIsError] = useState(false);
  const { limit, page, search } = useLoaderData<IHomePageProps>();
  const { data, error, isLoading } = useCountries({ limit, page, search });

  if (isError) {
    throw new Error('test error');
  }
  return (
    <section>
      {error && <h2>{error?.message}</h2>}
      <h1 className="text-4xl">Countries by AmensGood</h1>
      <Button
        variant="main"
        onClick={() => {
          setIsError(true);
        }}
      >
        error
      </Button>
      <SearchForm searchValue={search} />

      <Pagination
        limit={limit}
        total={data?.total || 0}
        next={data?.next || false}
        prev={data?.prev || false}
        page={page}
      />

      <div className={clsx('grid gap-2', Boolean(country) && 'md:grid-cols-2')}>
        {data && (
          <CountryList countries={data.countries} activeCountry={country} />
        )}
        {isLoading && (
          <SkeletonList isActive={Boolean(search)} amount={limit} />
        )}

        <div>
          <Outlet />
        </div>
        <Flyout />
      </div>
    </section>
  );
};

export default Home;
