import type { ThemeContextType } from '@/interfaces';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
