import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

import { ErrorMessage, PasswordStrength } from '@/components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  message?: string;
  type?: 'text' | 'number' | 'password' | 'radio' | 'file' | 'checkbox';
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
    <label
      className={clsx(
        'relative w-full rounded-2xl border bg-amber-400 p-2',
        type !== 'radio' && 'pb-8'
      )}
    >
      <div className={clsx(type === 'radio' && 'flex')}>
        <h3
          className={clsx(
            'rounded-t-xl bg-amber-600 p-2 capitalize',
            type === 'radio' && 'grow'
          )}
        >
          {label}
        </h3>
        <input
          type={type}
          className={clsx(
            'rounded-b-xl bg-amber-800 px-4 py-2',
            type === 'radio' ? 'w-fit' : 'w-full'
          )}
          {...rest}
        />
      </div>
      {type === 'password' && textValue && (
        <PasswordStrength text={textValue} />
      )}
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </label>
  );
};
