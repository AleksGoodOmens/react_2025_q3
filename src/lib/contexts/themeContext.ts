import { ThemeContextType } from 'interfaces/index';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
