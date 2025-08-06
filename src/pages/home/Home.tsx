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
      <h1 className="text-4xl">Countries by AmensGood</h1>
      <Button
        variant="main"
        onClick={() => {
          setIsError(true);
        }}
      >
        error
      </Button>
      <SearchForm />

      <Pagination
        limit={limit}
        total={data?.total || 0}
        next={Boolean(data?.next)}
        prev={Boolean(data?.prev)}
        page={page}
      />

      <div className={clsx('grid gap-2', Boolean(country) && 'md:grid-cols-2')}>
        <ul
          className={clsx(
            'relative order-1 grid grid-cols-1 gap-2 rounded-2xl border-2 md:order-0',
            country ? '' : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {error && (
            <h2 className="col-span-full p-4 text-center">{error?.message}</h2>
          )}
          {data && (
            <CountryList countries={data.countries} activeCountry={country} />
          )}

          {isLoading && <SkeletonList amount={limit} />}
        </ul>

        <Outlet />
      </div>
      <Flyout />
    </section>
  );
};

export default Home;
