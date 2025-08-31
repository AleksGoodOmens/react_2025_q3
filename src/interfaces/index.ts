import type { CountriesDataSchema, CountrySchema, DataSchema } from './schemas';
import type z from 'zod';
import type { getTopLevelData } from '@/utils/getTopLevelData';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface SortType {
  order: 'asc' | 'desc';
  by: 'name' | 'population';
}

export interface SortConfig {
  by: keyof CountryYearlyData | null;
  order: 'asc' | 'desc';
}

export const COLUMNS = [
  'year',
  'population',
  'co2',
  'co2 per capita',
  'methane',
  'oil co2',
  'temperature change from co2',
] as const;

export type CountryType = z.infer<typeof CountrySchema>;
export type CountriesData = z.infer<typeof CountriesDataSchema>;
export type CountryYearlyData = z.infer<typeof DataSchema>;
export type ActiveColumn = keyof CountryYearlyData;
export type ActiveColumnState = Record<keyof CountryYearlyData, boolean>;
export type TopLevelDataType = ReturnType<typeof getTopLevelData>;
