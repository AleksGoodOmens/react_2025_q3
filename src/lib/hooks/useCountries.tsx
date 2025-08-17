import { getCountries } from '../api/CountryAPI';
import { useQuery } from '@tanstack/react-query';
import { IHomePageProps } from 'interfaces/index';

export function useCountries(props: IHomePageProps) {
  return useQuery({
    queryKey: ['countries', props],
    queryFn: () => getCountries(props),
    staleTime: 1 * 60 * 1000,
  });
}
