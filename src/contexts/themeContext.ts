import { createContext } from 'react';
import type { ThemeContextType } from '@/interfaces';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
