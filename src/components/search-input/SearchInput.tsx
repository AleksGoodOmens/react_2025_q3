import { memo, type ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  defaultValue?: string;
}

export const SearchInput = memo(function SearchInput({
  label,
  name,
  defaultValue,
  ...rest
}: Props) {
  return (
    <label className="flex w-full items-center gap-2 rounded-xl border-2 px-4 py-2 sm:col-span-5">
      <h5 className="uppercase">{label || 'search'}</h5>
      <input
        className="w-full rounded-xl bg-amber-200 px-2 py-1"
        type="search"
        defaultValue={defaultValue}
        name={name || 'search'}
        {...rest}
      />
    </label>
  );
});
