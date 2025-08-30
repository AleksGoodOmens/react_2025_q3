import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { formatValue } from '@/utils/FormatValues';
import { getSortedData } from '@/utils/getSortedData';

import { type CountryYearlyData, type SortConfig } from '@/interfaces';

import { Button, Heading, ListItem } from '@/components';

interface CountryYearlyListProps {
  data: CountryYearlyData[];
  activeColumns: Array<keyof CountryYearlyData>;
}

export const CountryYearlyList = ({
  data,
  activeColumns,
}: CountryYearlyListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    by: null,
    order: 'asc',
  });

  const sortedData = getSortedData(data, sortConfig);

  const handleSort = (column: keyof CountryYearlyData) => {
    setSortConfig((prev) => {
      if (prev.by === column) {
        return {
          by: column,
          order: prev.order === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        by: column,
        order: 'asc',
      };
    });
  };

  const headers = activeColumns.map((col) => {
    const isSorted = sortConfig.by === col;
    const Icon =
      isSorted && sortConfig.order === 'desc' ? ArrowDownIcon : ArrowUpIcon;

    return (
      <Heading
        Tag="h4"
        variant="small"
        className="relative h-full px-2 text-center"
        key={col}
      >
        {col.split('_').join(' ')}
        <Button
          className="absolute right-0 bottom-0 p-0"
          onClick={() => handleSort(col)}
        >
          <Icon className="size-4" />
        </Button>
      </Heading>
    );
  });

  const items = sortedData.map((item, i) => {
    const content = activeColumns.map((col) => {
      const value = formatValue(col, item[col]);
      return (
        <div className="px-2" key={col}>
          {value || 'N/A'}
        </div>
      );
    });

    return <ListItem key={`${item.year}-${i}`}>{content}</ListItem>;
  });

  return (
    <ul className="bg-amber-500 text-black">
      <ListItem>{headers}</ListItem>
      {items}
    </ul>
  );
};

CountryYearlyList.displayName = 'CountryYearlyList';
