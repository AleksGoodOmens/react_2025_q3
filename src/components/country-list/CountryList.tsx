import type { ICountry } from '@/interfaces';

import { useCountryStore } from '@/hooks';

import { CountryItem } from '@/components';

interface Props {
  countries: ICountry[] | [];
  activeCountry?: string;
}

export const CountryList = ({ countries, activeCountry }: Props) => {
  const favorite = useCountryStore((state) => state.favorite);
  return (
    <>
      {countries.length === 0 && (
        <li className="text-center">No countries found</li>
      )}

      {countries.map((item) => (
        <CountryItem
          key={`${item.name.official}`}
          isFavorite={favorite.some(
            ({ name }) => name.official === item.name.official
          )}
          isActive={activeCountry === item.name.common}
          countryData={item}
        />
      ))}
    </>
  );
};
