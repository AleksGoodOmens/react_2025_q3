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
      const popA = Number(a.population) || 0;
      const popB = Number(b.population) || 0;

      if (newOrder.order === 'asc') {
        return popA - popB;
      } else {
        return popB - popA;
      }
    });
  }
  return res;
};
