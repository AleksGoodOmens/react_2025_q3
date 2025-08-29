import { CountriesDataSchema, type CountriesData } from '@/interfaces/schemas';

const dataPath = import.meta.env.VITE_DATA_URL as string;

export const getData = async (): Promise<CountriesData> => {
  const response = await fetch(dataPath);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawData = await response.json();
  const data = CountriesDataSchema.parse(rawData);

  return data;
};
