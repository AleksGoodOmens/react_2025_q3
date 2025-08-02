import { ThemeChanger } from '../theme-changer/ThemeChanger';
import { Link, NavLink, Outlet } from 'react-router';

export const GeneralLayout = () => {
  return (
    <div className="container mx-auto flex min-h-dvh flex-col p-2">
      <header className="flex items-center justify-between gap-2">
        <nav className="flex gap-2">
          <Link to={'/'}>AmensGood</Link>
          <NavLink to={'/about'}>About</NavLink>
        </nav>
        <ThemeChanger />
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
