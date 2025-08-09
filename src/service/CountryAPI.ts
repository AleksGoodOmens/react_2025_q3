import { BASE_API_URL } from '@/constants';
import { CountrySchema, type ICountry } from '@/interfaces';
import z from 'zod';

export async function getCountry(params: string = 'all'): Promise<ICountry[]> {
  const url = new URL(params, BASE_API_URL);
  if (params === 'all') {
    url.searchParams.set('fields', 'name, flags, capital, area, borders');
  }
  try {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data: unknown = await response.json();

    const result = z.array(CountrySchema).safeParse(data);
    if (!result.success) {
      console.error('Validation error:', result.error);
      throw new Error('Invalid data format');
    }
    return result.data;
  } catch (error) {
    console.error('CountryService failed:', error);
    throw error;
  }
}
