import type { CountryYearlyData } from '@/interfaces';

import { ListItem } from '@/components';

interface CountryYearlyListProps {
  data: CountryYearlyData[];
}

export const CountryYearlyList = ({ data }: CountryYearlyListProps) => {
  const items = data.map((item, i) => {
    const {
      year,
      population = 'N/A',
      co2 = 'N/A',
      co2_per_capita = 'N/A',
      methane = 'N/A',
      oil_co2 = 'N/A',
      temperature_change_from_co2 = 'N/A',
    } = item;

    return (
      <ListItem key={`${year}-${i}`}>
        <div>{year}</div>
        <div>{population}</div>
        <div>{co2}</div>
        <div>{co2_per_capita}</div>
        <div>{oil_co2}</div>
        <div>{methane}</div>
        <div>{temperature_change_from_co2}</div>
      </ListItem>
    );
  });

  return <ul>{items}</ul>;
};
