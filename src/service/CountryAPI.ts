import { BASE_API_URL } from '@/constants';
import z from 'zod';

import {
  CountrySchema,
  DetailedCountriesSchema,
  type IGetCountriesResponse,
} from '@/interfaces';

export async function getCountries(
  params: string = 'all'
): Promise<IGetCountriesResponse> {
  const url = new URL(`v3.1/${params}`, BASE_API_URL);

  if (params === 'all') {
    url.searchParams.set('fields', 'name,flags,capital,area,borders');
  }
  try {
    const response: Response = await fetch(url);

    if (!response.ok) throw new Error(response.statusText);
    const data: unknown = await response.json();
    const result = z.array(CountrySchema).safeParse(data);
    if (response.status === 404) {
      return {
        countries: [],
      };
    }
    if (!result.success) {
      return {
        error: `Invalid data format ${result.error.message}`,
        countries: [],
      };
    }
    return {
      countries: result.data,
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        error: error.message,
        countries: [],
      };
    return {
      error: `unknown error`,
      countries: [],
    };
  }
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
