import { memo } from 'react';

import { type CountryYearlyData } from '@/interfaces';

import { ListItem } from '@/components';

interface CountryYearlyListProps {
  data: CountryYearlyData[];
  activeColumns: Array<keyof CountryYearlyData>;
}

export const CountryYearlyList = memo(
  ({ data, activeColumns }: CountryYearlyListProps) => {
    const items = data.map((item, i) => {
      const content = activeColumns.map((col) => {
        return <div key={col}>{item[col] || 'N/A'}</div>;
      });

      return <ListItem key={`${item.year}-${i}`}>{content}</ListItem>;
    });

    return <ul>{items}</ul>;
  }
);
CountryYearlyList.displayName = 'CountryYearlyList';
