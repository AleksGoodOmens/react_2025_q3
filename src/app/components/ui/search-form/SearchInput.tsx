import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  storageValue: string;
  placeholder: string;
}

export const SearchInput = memo(function SearchInput({
  name,
  storageValue,
  placeholder,
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
      <h5 className="uppercase">{name || 'search'}</h5>
      <input
        className="w-full rounded-xl bg-amber-200 px-2 py-1 dark:bg-amber-600"
        type="search"
        value={value}
        onChange={handleOnChange}
        name={name || 'search'}
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
});
