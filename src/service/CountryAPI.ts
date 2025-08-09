import type { ICountry } from '@/interfaces';

const urlAllCountries =
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,area,borders,';

const urlCountriesByName = 'https://restcountries.com/v3.1/translation';

async function getAllCountries(): Promise<ICountry[]> {
  try {
    const response = await fetch(urlAllCountries);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ICountry[] = await response.json();
    return data;
  } catch (error) {
    console.error('CountryService failed:', error);
    throw error;
  }
}

async function getCountriesByName(searchValue: string): Promise<ICountry[]> {
  try {
    const response = await fetch(`${urlCountriesByName}/${searchValue}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ICountry[] = await response.json();
    return data;
  } catch (error) {
    console.error('CountryService failed:', error);
    throw error;
  }
}

export { getAllCountries, getCountriesByName };
