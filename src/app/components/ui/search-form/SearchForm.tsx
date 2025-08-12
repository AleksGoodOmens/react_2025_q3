'use client';

import { Button } from '../../../../components/ui/Button';
import { SearchInput } from './SearchInput';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent } from 'react';

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchValue = searchParams.get('search');

  const { storageValue, clearStorage } = useLocalStorage('search');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const newSearchValue = formData.get('search')?.toString() || null;

    if (!newSearchValue) {
      clearStorage();
    }
    const params = new URLSearchParams(searchParams);
    if (newSearchValue) params.set('search', newSearchValue);

    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="my-2 grid gap-2 sm:grid-cols-6 sm:justify-center"
    >
      <SearchInput
        name="search"
        id="search"
        storageValue={searchValue || storageValue}
      />
      <Button variant="ghost" type="submit">
        search
      </Button>
    </form>
  );
};
