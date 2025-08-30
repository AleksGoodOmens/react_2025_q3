import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import { getActiveKeys } from '@/utils/getActiveKeys';

import type { TopLevelDataType } from '@/interfaces';

import { useStore } from '@/hooks';

import { Button, CountryYearlyList, ListItem } from '@/components';

interface CountryItemProps {
  country: TopLevelDataType[0];
}

export const CountryItem = memo(({ country }: CountryItemProps) => {
  const { name, ISO, population } = country;
  const [open, setOpen] = useState(false);
  const activeColumns = useStore((state) => state.activeColumns);
  const rawData = useStore((state) => state.rawData);

  const yearsDetails = useMemo(() => rawData[name], [rawData, name]);
  const cols = [name, ISO, population];

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem className={clsx('relative', open && 'bg-amber-500')}>
        {cols.map((col, i) => (
          <div
            key={`${col}-${i}`}
            className="once animate-fadeIn font-bold transition-all duration-200 not-last:border-r-2"
          >
            {col}
          </div>
        ))}
        <Button className="absolute right-0 py-0" onClick={handleOpen}>
          more
        </Button>
      </ListItem>

      {open && (
        <CountryYearlyList
          data={yearsDetails.data}
          activeColumns={getActiveKeys(activeColumns)}
        />
      )}
    </>
  );
});

CountryItem.displayName = 'CountryItem';
