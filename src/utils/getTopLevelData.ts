import type { CountriesData } from '@/interfaces';

export const getTopLevelData = (
  object: CountriesData,
  countryName: string[],
  currentYear: number
) => {
  return countryName.map((country) => {
    const info = object[country];
    let population: number | string = 'N/A';
    const ISO = info?.iso_code || 'N/A';

    const dataForCurrentYear = info.data.find(
      (item) => item.year === currentYear
    );
    const rawNumber = dataForCurrentYear?.population;
    if (rawNumber) population = rawNumber.toLocaleString('ru-RU');

    return {
      name: country,
      ISO,
      population,
    };
  });
};
