import { ThemeChanger } from '../theme-changer/ThemeChanger';
import clsx from 'clsx';
import { NavLink, Outlet } from 'react-router';

const links = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
];

export const GeneralLayout = () => {
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
              to={link.path}
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
