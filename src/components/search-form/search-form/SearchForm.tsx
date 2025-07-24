import { useLocalStorage } from '@/hooks';
import { useCallback, type FormEvent } from 'react';

import { Button, SearchInput } from '@/components';

interface Props {
  searchValue: string;
}

export const SearchForm = ({ searchValue }: Props) => {
  const { storageValue, updateStorage, clearStorage } =
    useLocalStorage('search');
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget).get('search');
      if (!formData) {
        clearStorage();
        window.history.pushState({}, '', window.location.pathname);
        return;
      }
      const searchValue = formData.toString().trim();
      updateStorage(searchValue);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('search', searchValue);
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    },
    [clearStorage, updateStorage]
  );

  return (
    <form
      role="search"
      onSubmit={handleSearch}
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
    </form>
  );
};
