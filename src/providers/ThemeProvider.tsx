import { useEffect, useState, type PropsWithChildren } from 'react';

import type { Theme } from '@/interfaces';

import { useLocalStorage } from '@/hooks';

import { ThemeContext } from '@/components/theme-changer/themeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { storageValue, updateStorage } = useLocalStorage('theme');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = storageValue as Theme | null;
    if (savedTheme) return savedTheme;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    updateStorage(theme);
  }, [theme, updateStorage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
