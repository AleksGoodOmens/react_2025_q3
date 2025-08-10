import type { FormEvent } from 'react';
import { Form, useSearchParams } from 'react-router';

import { useLocalStorage } from '@/hooks';

import { Button, SearchInput } from '@/components';

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search');

  const { storageValue, updateStorage, clearStorage } =
    useLocalStorage('search');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const newSearchValue = formData.get('search')?.toString() || null;

    if (!newSearchValue) {
      clearStorage();
      searchParams.delete('search');
    }

    if (newSearchValue) {
      updateStorage(newSearchValue);
      searchParams.set('search', newSearchValue);
    }

    setSearchParams(searchParams);
  };

  return (
    <Form
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
    </Form>
  );
};
