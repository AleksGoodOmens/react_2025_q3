import { useLocalStorage } from './useLocalStorage';
import type { ICountry } from '@/interfaces';
import { getCountry } from '@/service/CountryAPI';
import { useCallback, useEffect, useState } from 'react';

export const useCountries = () => {
  const [countries, setCountries] = useState<ICountry[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const { storageValue } = useLocalStorage('search');

  const loadCountries = useCallback(async (search?: string): Promise<void> => {
    setIsLoading(true);

    const { error, countries } = search
      ? await getCountry(`translation/${search}`)
      : await getCountry('all');

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
