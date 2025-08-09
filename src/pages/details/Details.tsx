import { useLoaderData, useNavigate, useSearchParams } from 'react-router';

import { useCountry } from '@/hooks';

import {
  Button,
  DetailsCountry,
  DetailsCountrySkeleton,
  Heading,
  OverlayUpdate,
} from '@/components';

interface loaderData {
  countryName: string;
}

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { countryName } = useLoaderData<loaderData>();
  const {
    data: updatedCountry,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useCountry(countryName);

  const handleClose = () => {
    navigate({ pathname: '/', search: searchParams.toString() });
  };
  const handleRefetch = () => {
    refetch();
  };

  return (
    <section className="animate-fadeIn sticky top-0 h-fit rounded-2xl border-2 border-black bg-amber-800 p-6 text-white shadow-md">
      <div className="flex justify-between">
        <Button variant="main" onClick={handleRefetch}>
          update details
        </Button>
        <Button className="self-start" variant="ghost" onClick={handleClose}>
          X
        </Button>
      </div>
      {isFetching && (
        <OverlayUpdate
          message={isLoading ? 'Loading details' : 'Update details'}
        />
      )}
      {isLoading && <DetailsCountrySkeleton />}
      {updatedCountry && (
        <DetailsCountry
          country={updatedCountry}
          handleRefetch={handleRefetch}
        />
      )}
      {error && <Heading variant="error">No info about this country</Heading>}
    </section>
  );
};

export default Details;
