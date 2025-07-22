import { useCallback, type FormEvent } from 'react';

import { Button, SearchInput } from '@/components';

export const SearchForm = () => {
  const handleSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get('search');
    if (!formData) {
      localStorage.removeItem('search');
      window.history.pushState({}, '', '?');
      window.dispatchEvent(new CustomEvent('searchUpdated'));

      return;
    }
    const searchValue = formData.toString().trim();
    localStorage.setItem('search', searchValue);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('search', searchValue);
    window.history.pushState({}, '', `?${searchParams.toString()}`);

    window.dispatchEvent(new Event('searchUpdated'));
  }, []);

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className="my-2 grid gap-2 sm:grid-cols-6 sm:justify-center"
    >
      <SearchInput name="search" id="search" />
      <Button
        type="submit"
        className="cursor-pointer rounded-xl border-2 p-2 uppercase duration-300 hover:bg-amber-800 hover:text-white"
      >
        search
      </Button>
    </form>
  );
};
