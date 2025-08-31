import clsx from 'clsx';
import { memo, type HTMLAttributes, type PropsWithChildren } from 'react';

const variantStyles = {
  error: 'col-span-full p-4 text-center text-rose-600',
  tableHeading:
    'bg-amber-700 text-center text-2xl font-bold capitalize not-last:border-r-2',
  main: 'text-4xl',
  small: 'text-md text-center font-bold capitalize',
};

interface Props extends HTMLAttributes<HTMLHeadingElement>, PropsWithChildren {
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'error' | 'main' | 'tableHeading' | 'small';
}

export const Heading = memo(
  ({ Tag = 'h2', className, variant = 'main', children, ...rest }: Props) => {
    return (
      <Tag
        className={clsx(className && className, variantStyles[variant])}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = 'Heading';
