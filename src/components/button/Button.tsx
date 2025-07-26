import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant: 'main' | 'ghost' | 'minor';
}
const mainClasses = ' bg-amber-800  text-white hover:bg-white duration-300';
const ghostClasses = 'hover:bg-amber-800 hover:text-white duration-300';
const minorClasses = 'text-white';

export const Button = ({ children, className, variant, ...props }: IButton) => {
  return (
    <button
      className={clsx(
        'rounded-xl border-2 px-4 py-2 uppercase',
        className,
        variant === 'ghost' && ghostClasses,
        variant === 'main' && mainClasses,
        variant === 'minor' && minorClasses
      )}
      {...props}
    >
      {children}
    </button>
  );
};
