import type { ICountry, IDetailedCountry } from '@/interfaces';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

import {
  Button,
  CountryList,
  Details,
  Pagination,
  SearchForm,
} from '@/components';

interface LoaderData {
  countries: ICountry[] | [];
  search: string;
  page: number;
  next: boolean;
  prev: boolean;
  limit: number;
  total: number;
  error: string | undefined;
  details: IDetailedCountry | null;
}
const Home = () => {
  const [isError, setIsError] = useState(false);
  const { countries, limit, total, page, next, prev, search, details } =
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
      {total > limit && (
        <Pagination
          limit={limit}
          total={total}
          next={next}
          prev={prev}
          page={page}
        />
      )}

      <div className="flex flex-col-reverse gap-2 md:flex-row">
        <CountryList
          className={`${details ? 'flex-col md:shrink-0 md:basis-2/6 lg:basis-1/3' : 'w-full'} `}
          countries={countries}
        />
        {details && <Details country={details} />}
      </div>
    </section>
  );
};

export default Home;
