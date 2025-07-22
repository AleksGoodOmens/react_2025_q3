import { BASE_API_URL } from '@/constants';
import { CountrySchema, type IGetCountriesResponse } from '@/interfaces';
import z from 'zod';

export async function getCountry(
  params: string = 'all'
): Promise<IGetCountriesResponse> {
  const url = new URL(params, BASE_API_URL);
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
        error: `${error.message}`,
        countries: [],
      };
    return {
      error: `unknown error`,
      countries: [],
    };
  }
}
