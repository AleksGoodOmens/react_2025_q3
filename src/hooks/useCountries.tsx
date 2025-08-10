import { getCountries } from '@/service/CountryAPI';
import { useQuery } from '@tanstack/react-query';
import type { IHomePageProps } from '@/interfaces';

export function useCountries(props: IHomePageProps) {
  return useQuery({
    queryKey: ['countries', props],
    queryFn: () => getCountries(props),
    staleTime: 1 * 60 * 1000,
  });
}
