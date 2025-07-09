import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

const Button = ({ children, ...props }: IButton) => {
  return <button {...props}>{children}</button>;
};

export default Button;
