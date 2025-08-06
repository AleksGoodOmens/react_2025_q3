import { getCountry } from '@/service/CountryAPI';
import { countryKeys } from '@/utils/countryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCountry(name: string) {
  return useQuery({
    queryKey: countryKeys.detail(name),
    queryFn: () => getCountry(name),
    enabled: Boolean(name),
  });
}
