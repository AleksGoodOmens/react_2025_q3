import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  storageValue: string;
}

export const SearchInput = memo(function SearchInput({
  label,
  name,
  storageValue,
  ...rest
}: Props) {
  const [value, setValue] = useState(storageValue);

  const handleOnChange = useCallback(
    ({ target: { value: inputValue } }: ChangeEvent<HTMLInputElement>) => {
      setValue((prev) => (inputValue !== prev ? inputValue : prev));
    },
    []
  );

  return (
    <label className="flex w-full items-center gap-2 rounded-xl border-2 px-4 py-2 sm:col-span-5">
      <h5 className="uppercase">{label || 'search'}</h5>
      <input
        className="w-full rounded-xl bg-amber-200 px-2 py-1"
        type="search"
        value={value}
        onChange={handleOnChange}
        name={name || 'search'}
        {...rest}
      />
    </label>
  );
});
