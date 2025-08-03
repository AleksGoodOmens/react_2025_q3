import type { FormEvent } from 'react';
import { Form, useSearchParams } from 'react-router';

import { Button, SearchInput } from '@/components';

import { useLocalStorage } from '@/hooks';

interface Props {
  searchValue: string;
}

export const SearchForm = ({ searchValue }: Props) => {
  const [searchParams] = useSearchParams();

  const { storageValue, updateStorage, clearStorage } =
    useLocalStorage('search');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const currentParams = new URLSearchParams(searchParams);

    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('search')?.toString() || '';
    if (!searchValue) clearStorage();
    updateStorage(searchValue);
    currentParams.set('search', searchValue);
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
