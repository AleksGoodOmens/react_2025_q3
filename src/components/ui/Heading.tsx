import clsx from 'clsx';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

const variantStyles = {
  error: 'col-span-full p-4 text-center text-rose-600',
  main: 'text-4xl',
};

interface Props extends HTMLAttributes<HTMLHeadingElement>, PropsWithChildren {
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant: 'error' | 'main';
}

export const Heading = ({
  Tag = 'h2',
  className,
  variant,
  children,
  ...rest
}: Props) => {
  return (
    <Tag
      className={clsx(
        className && className,
        variant === 'error' && variantStyles.error,
        variant === 'main' && variantStyles.main
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
