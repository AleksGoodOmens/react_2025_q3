'use client';

import { DetailsSkeleton } from './skeletons/DetailsSkeleton';
import { CountryDetails } from './ui/country-details';
import { DetailsControls } from './ui/details-controls';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { Heading } from 'components/ui/Heading';
import { OverlayUpdate } from 'components/ui/OverlayUpdate';
import { useCountry } from 'hooks/useCountry';

interface Props {
  countryName: string;
  dehydratedState: DehydratedState;
}

const DetailsClient = ({ countryName, dehydratedState }: Props) => {
  const {
    data: updatedCountry,
    isLoading,
    isFetching,
    refetch,
    error,
    isStale,
  } = useCountry(countryName);

  const handleRefetch = () => {
    refetch();
  };
  return (
    <HydrationBoundary state={dehydratedState}>
      <section className="animate-fadeIn top-0 h-fit rounded-2xl border-2 border-black bg-amber-800 p-6 text-white shadow-md md:sticky">
        <DetailsControls handleRefetch={handleRefetch} isStale={isStale} />
        {isFetching && (
          <OverlayUpdate
            message={isLoading ? 'Loading details' : 'Update details'}
          />
        )}
        {isLoading && <DetailsSkeleton />}
        {updatedCountry && (
          <CountryDetails
            country={updatedCountry}
            handleRefetch={handleRefetch}
          />
        )}
        {error && <Heading variant="error">No info about this country</Heading>}
      </section>
    </HydrationBoundary>
  );
};

export default DetailsClient;
