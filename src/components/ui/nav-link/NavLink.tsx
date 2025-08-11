'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  path: string;
  name: string;
}
export const NavLink = ({ path, name }: Props) => {
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <Link
      className={clsx(
        'uppercase',
        pathname === path && 'text-white dark:text-black'
      )}
      key={name}
      href={{ pathname: path, search: params.toString() }}
    >
      {name}
    </Link>
  );
};
