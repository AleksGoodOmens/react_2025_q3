import { dataSorter } from './dataSorter';

import type { FilteredCountries } from '@/interfaces';
import { CountriesDataSchema } from '@/interfaces/schemas';

const dataPath = import.meta.env.VITE_DATA_URL as string;

export const getData = async (): Promise<FilteredCountries> => {
  const response = await fetch(dataPath);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawData = await response.json();
  const data = CountriesDataSchema.parse(rawData);

  return dataSorter(data);
};
