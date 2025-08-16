'use client';

import { SearchInput } from './SearchInput';
import { Button } from 'components/ui/Button';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent } from 'react';

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const t = useTranslations('search');

  const path = usePathname();
  const router = useRouter();
  const searchValue = searchParams.get('search');

  const { storageValue, clearStorage } = useLocalStorage('search');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearchValue = formData.get('search')?.toString() || null;

    if (!newSearchValue) {
      clearStorage();
    }
    const params = new URLSearchParams(searchParams);
    if (newSearchValue) {
      params.set('search', newSearchValue);
      params.set('page', '1');
    }

    router.push(`${path}?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="my-2 grid gap-2 sm:grid-cols-6 sm:justify-center"
    >
      <SearchInput
        name={t('label')}
        id="search"
        storageValue={searchValue || storageValue}
        placeholder={t('placeholder')}
      />
      <Button variant="ghost" type="submit">
        {t('btn')}
      </Button>
    </form>
  );
};
