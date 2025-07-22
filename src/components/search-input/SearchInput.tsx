import { memo, useCallback, useState, type ChangeEvent } from 'react';

interface Props {
  label?: string;
}

export const SearchInput = memo(function SearchInput({ label }: Props) {
  const [value, setValue] = useState(localStorage.getItem('search') || '');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  }, []);

  return (
    <label className="flex w-full items-center gap-2 rounded-xl border-2 px-4 py-2 sm:col-span-5">
      <h5 className="uppercase">{label || 'search'}</h5>
      <input
        className="w-full rounded-xl bg-amber-200 px-2 py-1"
        type="search"
        name={label || 'search'}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
});
