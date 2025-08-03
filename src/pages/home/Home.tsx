import clsx from 'clsx';
import { useState } from 'react';
import { Outlet, useLoaderData, useParams } from 'react-router';

import {
  Button,
  CountryList,
  Flyout,
  Pagination,
  SearchForm,
} from '@/components';

import type { ICountry } from '@/interfaces';

interface LoaderData {
  countries: ICountry[] | [];
  search: string;
  page: number;
  next: boolean;
  prev: boolean;
  limit: number;
  total: number;
  error: string | undefined;
}
const Home = () => {
  const [isError, setIsError] = useState(false);
  const { country } = useParams();
  const { countries, limit, total, page, next, prev, search, error } =
    useLoaderData<LoaderData>();

  if (isError) {
    throw new Error('test error');
  }
  return (
    <section>
      <h2>{error}</h2>
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
      {total > 0 && (
        <Pagination
          limit={limit}
          total={total}
          next={next}
          prev={prev}
          page={page}
        />
      )}

      <div className={clsx('grid gap-2', Boolean(country) && 'md:grid-cols-2')}>
        <CountryList
          countries={countries}
          activeCountry={country}
          limit={limit}
        />
        <div>
          <Outlet />
        </div>
        <Flyout />
      </div>
    </section>
  );
};

export default Home;
