import { useLocalStorage } from './useLocalStorage';
import { getCountries } from '@/service/CountryAPI';
import { useCallback, useEffect, useState } from 'react';

import type { ICountry } from '@/interfaces';

export const useCountries = () => {
  const [countries, setCountries] = useState<ICountry[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const { storageValue } = useLocalStorage('search');

  const loadCountries = useCallback(async (search?: string): Promise<void> => {
    setIsLoading(true);

    const { error, countries } = search
      ? await getCountries(`translation/${search}`)
      : await getCountries('all');

    if (error) setError(error);
    setCountries(countries);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    loadCountries(searchParams.get('search') || storageValue);
  }, [storageValue, loadCountries]);

  return { countries, isLoading, error };
};
