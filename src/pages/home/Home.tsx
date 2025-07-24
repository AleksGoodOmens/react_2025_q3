import type { ICountry } from '@/interfaces';
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router';

import { Button, CountryList, Pagination, SearchForm } from '@/components';

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
  const { countries, limit, total, page, next, prev, search } =
    useLoaderData<LoaderData>();

  if (isError) {
    throw new Error('test error');
  }
  return (
    <section>
      <h1 className="text-4xl">Countries by AmensGood</h1>
      <Button
        className="cursor-pointer rounded-xl border-2 bg-amber-800 px-4 py-2 text-white hover:bg-white"
        onClick={() => {
          setIsError(true);
        }}
      >
        error
      </Button>
      <SearchForm searchValue={search} />
      <Pagination
        limit={limit}
        total={total}
        next={next}
        prev={prev}
        page={page}
      />

      <CountryList countries={countries} />
      <Outlet />
    </section>
  );
};

export default Home;
