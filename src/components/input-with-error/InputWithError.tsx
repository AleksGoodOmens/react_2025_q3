import type { InputHTMLAttributes } from 'react';

import { ErrorMessage, PasswordStrength } from '@/components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  message?: string;
  type?: 'text' | 'number' | 'password' | 'radio' | 'file';
  textValue?: string;
}

export const InputWithError = ({
  message,
  type = 'text',
  textValue,
  label,
  ...rest
}: Props) => {
  return (
    <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
      <h3 className="rounded-t-xl bg-amber-600 p-2 capitalize">{label}</h3>
      <input
        type={type}
        className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
        {...rest}
      />
      {type === 'password' && textValue && (
        <PasswordStrength text={textValue} />
      )}
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </label>
  );
};
