import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getData } from '@/utils';

import { useStore } from '@/hooks';

import { CountryItem, TopTableHeader } from '@/components';

export const CountriesList = () => {
  const { data: rawData } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: getData,
  });

  const setRawData = useStore((state) => state.setRawData);
  const topLevelData = useStore((state) => state.topLevelData);

  useEffect(() => {
    setRawData(rawData);
  }, [rawData, setRawData]);

  return (
    <ul className="grid">
      <TopTableHeader />
      {topLevelData.map((country) => (
        <CountryItem key={country.name} country={country} />
      ))}
    </ul>
  );
};
