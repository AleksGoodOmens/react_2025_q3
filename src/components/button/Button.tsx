import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export const Button = ({ children, ...props }: IButton) => {
  return <button {...props}>{children}</button>;
};
