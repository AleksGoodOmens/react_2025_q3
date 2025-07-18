import { BASE_API_URL } from '@/constants';
import type { ICountry } from '@/interfaces';

export async function getCountry(params: string = 'all') {
  const url = new URL(params, BASE_API_URL);
  if (params === 'all') {
    url.searchParams.set('fields', 'name,flags,capital,area,borders,');
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data: ICountry[] = await response.json();
    return data;
  } catch (error) {
    console.error('CountryService failed:', error);
    throw error;
  }
}
