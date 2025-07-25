import { CountryItem } from '../country-item/CountryItem';
import { SkeletonListItem } from '../skeleton-list-item/SkeletonListItem';
import type { ICountry } from '@/interfaces';
import clsx from 'clsx';
import { useNavigation, useParams } from 'react-router';

interface Props {
  countries: ICountry[] | [];
  className?: string;
}

export const CountryList = ({ countries, className }: Props) => {
  const { state } = useNavigation();
  const { country } = useParams();

  const isLoading = state === 'loading';

  return (
    <ul
      className={clsx(
        'flex flex-wrap rounded-2xl border-2',
        country && 'flex-2/6',
        className
      )}
    >
      {isLoading ? (
        Array.from({ length: 20 }).map((_, i) => <SkeletonListItem key={i} />)
      ) : countries.length > 0 ? (
        countries.map((item) => (
          <CountryItem key={`${item.name.official}`} countryData={item} />
        ))
      ) : (
        <li className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          No countries found
        </li>
      )}
    </ul>
  );
};
