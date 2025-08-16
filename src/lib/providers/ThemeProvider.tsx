'use client';

import { ThemeContext } from 'context/themeContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Theme } from 'interfaces/index';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const searchParams = (useSearchParams().get('theme') as Theme) || null;
  const { storageValue, updateStorage } = useLocalStorage('theme');
  const [theme, setTheme] = useState<Theme>(searchParams || 'light');

  useEffect(() => {
    if (searchParams) {
      setTheme(searchParams as Theme);
      return;
    } else if (storageValue) {
      setTheme(storageValue as Theme);
      return;
    } else if (window.matchMedia) {
      setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    }
  }, [storageValue, searchParams]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      updateStorage(nextTheme);

      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
