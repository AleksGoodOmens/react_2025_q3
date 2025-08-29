import { Suspense } from 'react';

import { CountriesList, ErrorBoundary, Heading } from '@/components';

export const HomePage = () => {
  return (
    <section className="container mx-auto">
      <Heading className="p-4 text-center">
        CO2 and Greenhouse Gas Emissions by AmensGood
      </Heading>
      <ErrorBoundary fallback={<div>error accrued </div>}>
        <Suspense fallback={<div>loading...</div>}>
          <CountriesList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
