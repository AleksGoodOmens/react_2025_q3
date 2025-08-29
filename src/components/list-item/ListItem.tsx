import clsx from 'clsx';
import { memo, type PropsWithChildren } from 'react';

interface ListItemProps extends PropsWithChildren {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const styles = {
  primary: 'grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1 border-2',
  secondary: '',
};

export const ListItem = memo(
  ({ children, className, variant = 'primary' }: ListItemProps) => {
    return <li className={clsx(className, styles[variant])}>{children}</li>;
  }
);

ListItem.displayName = 'listItem';
