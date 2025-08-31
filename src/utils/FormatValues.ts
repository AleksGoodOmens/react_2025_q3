import type { CountryYearlyData } from '@/interfaces';

export const formatValue = (
  key: keyof CountryYearlyData,
  value: number | undefined
): string => {
  if (value === undefined || value === null) return 'N/A';

  switch (key) {
    case 'year':
      return value.toString();

    case 'population':
      if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
      } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
      } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K`;
      }
      return value.toLocaleString('en-US');

    case 'co2':
    case 'oil_co2':
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M tons`;
      } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K tons`;
      }
      return `${value.toFixed(2)} tons`;

    case 'co2_per_capita':
      return `${value.toFixed(2)} tons`;

    case 'temperature_change_from_co2':
      if (Math.abs(value) < 0.001) {
        return value.toExponential(2);
      }
      return value.toFixed(4) + '°C';

    case 'methane':
      if (value >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K tons`;
      }
      return `${value.toFixed(2)} tons`;

    default:
      return value.toLocaleString('en-US');
  }
};
