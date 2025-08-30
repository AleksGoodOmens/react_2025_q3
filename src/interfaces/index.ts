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
export type CountryType = z.infer<typeof CountrySchema>;
export type CountriesData = z.infer<typeof CountriesDataSchema>;
export type CountryYearlyData = z.infer<typeof DataSchema>;
export type TopLevelDataType = ReturnType<typeof getTopLevelData>;
