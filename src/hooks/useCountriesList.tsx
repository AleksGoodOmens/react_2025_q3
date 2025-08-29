import { useStore } from './store/useStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getData } from '@/utils';

export const useCountriesList = () => {
  const { data: rawData } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: getData,
  });

  const { setRawData, topLevelData } = useStore();

  useEffect(() => {
    setRawData(rawData);
  }, [rawData, setRawData]);

  return {
    topLevelData,
  };
};
