import { getCountry } from '../api/CountryAPI';
import { useQuery } from '@tanstack/react-query';

export function useCountry(name: string) {
  return useQuery({
    queryKey: ['details', name],
    queryFn: () => getCountry(name),
    enabled: Boolean(name),
    staleTime: 3000,
  });
}
