// src/components/ThemeToggle.tsx

import { ThemeContext } from './themeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import type { ThemeContextType } from '@/interfaces';

export const ThemeChanger = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 transition-colors hover:bg-amber-600/20 dark:hover:bg-gray-700/50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-amber-900 dark:text-amber-100" />
      ) : (
        <SunIcon className="h-6 w-6 text-amber-100 dark:text-amber-300" />
      )}
    </button>
  );
};
