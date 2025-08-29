import type { CountriesData } from '@/interfaces';

export const getMinMaxYear = (data: CountriesData) => {
  const arr = Object.values(data);
  const year = arr.flatMap((item) => {
    return item.data.map((it) => {
      return it.year;
    });
  });
  const min = Math.min(...year);
  const max = Math.max(...year);

  return {
    min,
    max,
  };
};
