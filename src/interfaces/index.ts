import type { dataSorter } from '@/utils/dataSorter';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export type FilteredCountries = ReturnType<typeof dataSorter>;
