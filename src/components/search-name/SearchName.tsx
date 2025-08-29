import { useRef, useState, type ChangeEvent } from 'react';

import { useStore } from '@/hooks';

export const SearchNameInput = () => {
  const { searchValue, searchByName } = useStore();
  const [value, setValue] = useState(searchValue);
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchByName(newValue);
    }, 300);
  };

  return (
    <input
      className="border-2 bg-amber-400 px-4"
      value={value}
      name="search"
      onChange={handleChange}
    />
  );
};
