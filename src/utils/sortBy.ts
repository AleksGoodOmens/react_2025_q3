import type { SortType, TopLevelDataType } from '@/interfaces';

export const sortBy = (data: TopLevelDataType, newOrder: SortType) => {
  const res = [...data];
  if (newOrder.by === 'name') {
    res.sort((a, b) => {
      if (newOrder.order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  } else if (newOrder.by === 'population') {
    res.sort((a, b) => {
      const parseNumber = (str: string | number) => {
        if (typeof str !== 'string' && typeof str !== 'number') return 0;

        const stringValue = String(str);

        const cleaned = stringValue.replace(/[\s,]/g, '');

        const num = Number(cleaned);

        return isNaN(num) ? 0 : num;
      };

      const popA = parseNumber(a.population);
      const popB = parseNumber(b.population);

      return newOrder.order === 'asc' ? popA - popB : popB - popA;
    });
  }
  return res;
};
