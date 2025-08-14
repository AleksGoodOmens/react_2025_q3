import DetailsClient from './components/details-client';
import HomeClient from './components/home-client';
import { SearchForm } from './components/ui/search-form/SearchForm';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { IHomePageSearchParams } from 'interfaces/index';
import { getCountries, getCountry } from 'src/lib/api/CountryAPI';
import { normalizeParams } from 'src/lib/utils/normalizeParams';

import './globals.css';

interface PageProps {
  searchParams: Promise<IHomePageSearchParams>;
}

export default async function page({ searchParams }: PageProps) {
  const params = normalizeParams(await searchParams);
  const { limit, page, search, details } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['countries', { limit, page, search }],
    queryFn: () => getCountries({ limit, page, search }),
  });

  if (details) {
    await queryClient.prefetchQuery({
      queryKey: ['details', { details }],
      queryFn: () => getCountry(details),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <section>
      <SearchForm />
      <div
        className={clsx(
          'relative grid gap-2',
          Boolean(details) && 'md:grid-cols-2'
        )}
      >
        <HomeClient
          limit={limit}
          page={page}
          search={search}
          dehydratedState={dehydratedState}
        />
        {details && (
          <DetailsClient
            countryName={details}
            dehydratedState={dehydratedState}
          />
        )}
      </div>
    </section>
  );
}
