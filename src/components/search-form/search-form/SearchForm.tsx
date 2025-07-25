import { useLocalStorage } from '@/hooks';
import type { FormEvent } from 'react';
import { Form, useSearchParams, useSubmit } from 'react-router';

import { Button, SearchInput } from '@/components';

interface Props {
  searchValue: string;
}

export const SearchForm = ({ searchValue }: Props) => {
  const submit = useSubmit();
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

    submit(currentParams);
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
      <Button
        type="submit"
        className="cursor-pointer rounded-xl border-2 p-2 uppercase duration-300 hover:bg-amber-800 hover:text-white"
      >
        search
      </Button>
    </Form>
  );
};
