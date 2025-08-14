'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  path: string;
  name: string;
  isActive: boolean;
}
export const NavLink = ({ path, name, isActive }: Props) => {
  return (
    <Link
      className={clsx('uppercase', isActive && 'text-white dark:text-black')}
      key={name}
      href={path}
    >
      {name}
    </Link>
  );
};
