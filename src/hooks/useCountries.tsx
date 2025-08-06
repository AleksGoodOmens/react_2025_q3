import { getCountries } from '@/service/CountryAPI';
import { countryKeys } from '@/utils/countryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCountries(name: string) {
  return useQuery({
    queryKey: countryKeys.detail(name),
    queryFn: () => getCountries(name),
    enabled: Boolean(name),
  });
}
