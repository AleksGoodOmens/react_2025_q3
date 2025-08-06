import { BASE_API_URL } from '@/constants';
import z from 'zod';

import {
  CountrySchema,
  DetailedCountriesSchema,
  type ICountriesData,
  type IHomePageProps,
} from '@/interfaces';

export async function getCountries({
  limit,
  page,
  search,
}: IHomePageProps): Promise<ICountriesData> {
  const url =
    search === 'all'
      ? new URL(`v3.1/${search}`, BASE_API_URL)
      : new URL(`v3.1/translation/${search}`, BASE_API_URL);

  if (search === 'all') {
    url.searchParams.set('fields', 'name,flags,capital,area,borders');
  }
  const response: Response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`no country with provided name "${search}" found`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: unknown = await response.json();
  const result = z.array(CountrySchema).safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid data format ${result.error.message}`);
  }
  const offset = (page - 1) * limit;
  const end = offset + limit;

  const filteredCountries = result.data.slice(offset, end);
  return {
    countries: filteredCountries,
    prev: page > 1,
    next: page < Math.ceil(result.data.length / limit),
    page: page,
    limit: limit,
    total: result.data.length,
  };
}
export async function getCountry(countryName: string = '') {
  const url = new URL(`v3.1/name/${countryName}`, BASE_API_URL);
  const response: Response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Country "${countryName}" not found`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: unknown = await response.json();

  const result = z.array(DetailedCountriesSchema).safeParse(data);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `Field ${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid data format: ${errorDetails}`);
  }

  if (result.data.length === 0) {
    throw new Error('No country data received');
  }

  return result.data[0];
}
