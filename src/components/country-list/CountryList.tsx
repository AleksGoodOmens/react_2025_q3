import { CountryItem } from '../country-item/CountryItem';
import type { ICountry } from '@/interfaces';
import { useCountryStore } from '@/store/useCountryStore';
import clsx from 'clsx';

interface Props {
  countries: ICountry[] | [];
  className?: string;
  isActive: boolean;
}

export const CountryList = ({ countries, className, isActive }: Props) => {
  const favorite = useCountryStore((state) => state.favorite);
  return (
    <ul
      className={clsx(
        'relative flex min-h-32 basis-full flex-wrap rounded-2xl border-2',
        isActive && 'flex-1/2',
        className
      )}
    >
      {countries.length > 0 ? (
        countries.map((item) => (
          <CountryItem
            key={`${item.name.official}`}
            isFavorite={favorite.includes(item.name.official)}
            countryData={item}
          />
        ))
      ) : (
        <li className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          No countries found
        </li>
      )}
    </ul>
  );
};
