'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Link } from 'src/i18n/navigation';

interface Props {
  path: string;
  name: string;
  isActive: boolean;
}
export const NavLink = ({ path, name, isActive }: Props) => {
  const t = useTranslations('navigation');
  return (
    <Link
      className={clsx('uppercase', isActive && 'text-white dark:text-black')}
      key={name}
      href={path}
    >
      {t(name)}
    </Link>
  );
};
