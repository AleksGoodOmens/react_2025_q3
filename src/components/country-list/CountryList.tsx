import { CountryItem } from '../country-item/CountryItem';
import { SkeletonListItem } from '../skeleton-list-item/SkeletonListItem';
import { useCountries } from '@/hooks';

export const CountryList = () => {
  const { countries, isLoading } = useCountries();
  return (
    <ul className="relative grid gap-2 rounded-xl border-2 p-2 md:grid-cols-2 lg:grid-cols-3">
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
