import { useCallback, useRef, useState, type ChangeEvent } from 'react';

import { useStore } from '@/hooks';

export const SearchNameInput = () => {
  const searchByName = useStore((state) => state.searchByName);
  const searchValue = useStore((state) => state.searchValue);
  const [value, setValue] = useState(searchValue);
  const timeoutRef = useRef<number | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        searchByName(newValue);
      }, 300);
    },
    [searchByName]
  );

  return (
    <input
      className="w-full rounded-2xl border-2 bg-amber-400 px-4 py-2"
      value={value}
      name="search"
      placeholder="Type country name"
      onChange={handleChange}
    />
  );
};

SearchNameInput.displayName = 'SearchNameInput';
