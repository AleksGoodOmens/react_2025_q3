import { LocaleChanger } from '../locale-changer/locale-changer';
import { ThemeChanger } from '../theme-changer/ThemeChanger';
import { NavigationClient } from './navigation-client';
import { NavigationServer } from './navigation-server';
import { Suspense } from 'react';

export const NavigationBar = () => {
  const links = [
    { path: `/`, name: 'home' },
    { path: `/about`, name: 'about' },
  ];

  return (
    <header className="flex items-center justify-between gap-2 rounded-2xl bg-amber-700 px-4">
      <nav className="flex gap-2">
        <Suspense fallback={<NavigationServer links={links} />}>
          <NavigationClient links={links} />
        </Suspense>
      </nav>
      <LocaleChanger />
      <ThemeChanger />
    </header>
  );
};
