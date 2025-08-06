import clsx from 'clsx';
import { NavLink, Outlet, useSearchParams } from 'react-router';

import { ThemeChanger } from '@/components';

const links = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
];

export const GeneralLayout = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="container mx-auto flex min-h-dvh flex-col p-2">
      <header className="flex items-center justify-between gap-2 rounded-2xl bg-amber-700 px-4">
        <nav className="flex gap-2">
          {links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                clsx('uppercase', isActive && 'text-white dark:text-black')
              }
              key={link.name}
              to={{ pathname: link.path, search: searchParams.toString() }}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <ThemeChanger />
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
