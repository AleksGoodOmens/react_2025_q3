'use client';

import { Button } from 'components/ui/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Locale = 'en' | 'ru';

export const LocaleChanger = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currLocale = pathname.split('/')[1] as Locale;

  const changeLocale = () => {
    const segments = pathname.split('/');
    segments[1] = currLocale === 'en' ? 'ru' : 'en';
    const newPath = segments.join('/');
    router.push(`${newPath}?${searchParams.toString()}`);
  };

  return (
    <Button variant="ghost" onClick={changeLocale}>
      {currLocale}
    </Button>
  );
};
