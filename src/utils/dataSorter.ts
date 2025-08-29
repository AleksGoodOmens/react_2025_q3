import type { CountriesData } from '@/interfaces/schemas';

export const dataSorter = (object: CountriesData) => {
  const data = [];
  for (const [key, value] of Object.entries(object)) {
    data.push({
      name: key,
      ...value,
    });
  }
  return data;
};
