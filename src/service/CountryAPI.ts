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
  try {
    const response: Response = await fetch(url);

    if (!response.ok) throw new Error(response.statusText);
    const data: unknown = await response.json();

    const result = z.array(DetailedCountriesSchema).safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((err) => {
        console.warn(`Problem with field: ${err.path.join('.')}`);
        console.warn(`Expected: ${err.message}`);
        console.warn(`Received: ${err.path}`);
      });
      return null;
    }
    return result.data[0];
  } catch {
    return null;
  }
}
