'use client';

import { NavLink } from 'components/ui/NavLink';
import { useLocale } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';

interface ILinks {
  links: { path: string; name: string }[];
}

export const NavigationClient = ({ links }: ILinks) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const checkPath = (path: string): boolean => {
    const pathArray = pathname.split('/');
    const clean = pathArray.filter((item) => item !== locale);
    let checkPath = path;
    if (path.length === 1) checkPath = '';
    return checkPath === clean.join('/');
  };

  return (
    <nav className="flex gap-2">
      {links.map((link) => (
        <NavLink
          key={link.name}
          path={`${link.path}?${searchParams.toString()}`}
          name={link.name}
          isActive={checkPath(link.path)}
        />
      ))}
    </nav>
  );
};
