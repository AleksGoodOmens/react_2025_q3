'use client';

import { NavLink } from 'components/ui/NavLink';
import { usePathname, useSearchParams } from 'next/navigation';

interface ILinks {
  links: { path: string; name: string }[];
}

export const NavigationClient = ({ links }: ILinks) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {links.map((link) => (
        <NavLink
          key={link.name}
          path={`${link.path}?${searchParams.toString()}`}
          name={link.name}
          isActive={pathname === link.path}
        />
      ))}
    </nav>
  );
};
