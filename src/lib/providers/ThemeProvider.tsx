'use client';

import { ThemeContext } from 'context/themeContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Theme } from 'interfaces/index';
import { useEffect, useState, type PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { storageValue, updateStorage } = useLocalStorage('theme');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (storageValue) {
      setTheme(storageValue as Theme);
    } else if (window.matchMedia) {
      setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    }
  }, [storageValue]);

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
