import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant?: 'main' | 'ghost' | 'minor';
}

const styles = {
  main: 'bg-amber-800 dark:bg-amber-400 text-white hover:bg-amber-300 dark:hover:bg-amber-500 ',
  ghost: 'hover:bg-amber-800 bg-amber-600 dark:bg-amber-400 ',
  minor: 'hover:bg-amber-800 dark:hover:bg-amber-600 text-white',
};

export const Button = ({
  children,
  className,
  variant = 'main',
  ...props
}: IButton) => {
  return (
    <button
      className={clsx(
        'rounded-xl border-2 px-4 py-2 uppercase disabled:cursor-not-allowed disabled:bg-amber-300',
        className,
        styles[variant]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
