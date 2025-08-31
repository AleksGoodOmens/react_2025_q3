import { Suspense } from 'react';

import {
  CountriesList,
  ErrorBoundary,
  Heading,
  ListControls,
  OverlayUpdate,
  ThemeChanger,
} from '@/components';

export const HomePage = () => {
  return (
    <section className="container mx-auto">
      <Heading className="p-4 text-center">
        CO2 and Greenhouse Gas Emissions by AmensGood <ThemeChanger />
      </Heading>
      <ErrorBoundary fallback={<div>error accrued </div>}>
        <Suspense fallback={<OverlayUpdate message="loading..." />}>
          <ListControls />
          <CountriesList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
