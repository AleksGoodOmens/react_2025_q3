import { memo } from 'react';

import type { TopLevelDataType } from '@/interfaces';

import { ListItem } from '@/components';

interface CountryItemProps {
  country: TopLevelDataType[0];
}

export const CountryItem = memo(({ country }: CountryItemProps) => {
  const { name, ISO, population } = country;

  const cols = [name, ISO, population];

  return (
    <ListItem>
      {cols.map((col, i) => (
        <div
          key={`${col}-${i}`}
          className="once animate-fadeIn font-bold transition-all duration-200 not-last:border-r-2"
        >
          {col}
        </div>
      ))}
    </ListItem>
  );
});

CountryItem.displayName = 'CountryItem';
