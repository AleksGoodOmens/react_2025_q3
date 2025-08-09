import clsx from 'clsx';
import type { ICountry } from '@/interfaces';

import { useCountryStore } from '@/hooks';

import { CountryItem, Heading, OverlayUpdate } from '@/components';

interface Props {
  countries: ICountry[] | [] | undefined;
  activeCountry?: string;
  error: string | undefined;
  isFetching: boolean;
}

export const CountryList = ({
  countries,
  activeCountry,
  error,
  isFetching,
}: Props) => {
  const favorite = useCountryStore((state) => state.favorite);
  return (
    <ul
      className={clsx(
        'relative order-1 grid grid-cols-1 gap-2 overflow-hidden rounded-2xl border-2 md:order-0',
        !activeCountry && 'md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {error && <Heading variant="error">{error}</Heading>}

      {countries?.length === 0 && (
        <li className="text-center">No countries found</li>
      )}

      {countries?.map((item) => (
        <CountryItem
          key={`${item.name.official}`}
          isFavorite={favorite.some(
            ({ name }) => name.official === item.name.official
          )}
          isActive={activeCountry === item.name.common}
          countryData={item}
        />
      ))}
      {isFetching && <OverlayUpdate />}
    </ul>
  );
};
