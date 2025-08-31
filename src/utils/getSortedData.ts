import type { CountryYearlyData, SortConfig } from '@/interfaces';

export const getSortedData = (
  data: CountryYearlyData[],
  sortConfig: SortConfig
) => {
  if (!sortConfig.by) return data;

  return [...data].sort((a, b) => {
    if (!sortConfig.by) return 0;

    const aValue = a[sortConfig.by];
    const bValue = b[sortConfig.by];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue !== null && bValue !== null) {
      const aString = String(aValue);
      const bString = String(bValue);
      return sortConfig.order === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    }

    return 0;
  });
};
