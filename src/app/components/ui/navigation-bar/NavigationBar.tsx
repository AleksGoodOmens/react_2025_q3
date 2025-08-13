import { NavLink } from 'components/ui/NavLink';
import { ThemeChanger } from 'src/app/components/ui/theme-changer/ThemeChanger';

export const NavigationBar = () => {
  const links = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
  ];

  return (
    <header className="flex items-center justify-between gap-2 rounded-2xl bg-amber-700 px-4">
      <nav className="flex gap-2">
        {links.map((link) => (
          <NavLink key={link.name} path={link.path} name={link.name} />
        ))}
      </nav>
      <ThemeChanger />
    </header>
  );
};
