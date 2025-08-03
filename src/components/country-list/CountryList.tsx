import clsx from 'clsx';
import { useNavigation } from 'react-router';

import { CountryItem, SkeletonListItem } from '@/components';

import type { ICountry } from '@/interfaces';

import { useCountryStore } from '@/hooks';

interface Props {
  countries: ICountry[] | [];
  className?: string;
  isActive: boolean;
  limit: number;
}

export const CountryList = ({
  countries,
  className,
  isActive,
  limit,
}: Props) => {
  const favorite = useCountryStore((state) => state.favorite);
  const { state } = useNavigation();
  return (
    <ul
      className={clsx(
        'relative order-1 grid grid-cols-1 gap-2 rounded-2xl border-2 md:order-0',
        isActive ? '' : 'md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {countries.length === 0 && (
        <li className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          No countries found
        </li>
      )}

      {countries.length > 0 &&
        state !== 'loading' &&
        countries.map((item) => (
          <CountryItem
            key={`${item.name.official}`}
            isFavorite={favorite.some(
              ({ name }) => name.official === item.name.official
            )}
            countryData={item}
          />
        ))}

      {state === 'loading' &&
        [...Array(limit)].map((_, i) => (
          <SkeletonListItem key={`skeleton-${i}`} />
        ))}
    </ul>
  );
};
