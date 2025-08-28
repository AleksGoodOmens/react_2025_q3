import { Suspense } from 'react';

import { CountriesList, ErrorBoundary } from '@/components';

export const HomePage = () => {
  return (
    <section>
      <h1>Home page</h1>
      <ErrorBoundary fallback={<div>error accrued </div>}>
        <Suspense fallback={<div>loading...</div>}>
          <CountriesList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
