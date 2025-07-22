import { CountryItem } from '../country-item/CountryItem';
import { SkeletonListItem } from '../skeleton-list-item/SkeletonListItem';
import type { ICountry } from '@/interfaces';
import { getCountry } from '@/service/CountryAPI';
import { useCallback, useEffect, useState } from 'react';

export const CountryList = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSearchValue = useCallback((): string => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('search') || localStorage.getItem('search') || '';
  }, []);

  const loadCountries = useCallback(async (): Promise<void> => {
    const searchValue = getSearchValue();

    try {
      const countryList = searchValue
        ? await getCountry(`translation/${searchValue}`)
        : await getCountry('all');

      setCountries(countryList);
    } catch (error) {
      console.error('Failed to load countries:', error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, [getSearchValue]);

  const handleUrlChange = useCallback(() => {
    setLoading(true);
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    window.addEventListener('searchUpdated', () => handleUrlChange());
    loadCountries();

    return () => {
      window.removeEventListener('searchUpdated', () => handleUrlChange());
    };
  }, [loadCountries, handleUrlChange]);

  return (
    <ul className="relative grid gap-2 rounded-xl border-2 p-2 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
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
