import { Link, NavLink, Outlet } from 'react-router';

export const GeneralLayout = () => {
  return (
    <div className="container mx-auto flex min-h-dvh flex-col p-2">
      <header className="flex gap-2">
        <Link to={'/'}>AmensGood</Link>
        <NavLink to={'/about'}>About</NavLink>
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
