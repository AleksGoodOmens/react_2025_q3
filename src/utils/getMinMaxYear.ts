import type { dataSorter } from './dataSorter';

export const getMinMaxYear = (data: ReturnType<typeof dataSorter>) => {
  const year = data.flatMap((item) => {
    return item.data.map((it) => {
      return it.year;
    });
  });
  const min = Math.min(...year);
  const max = Math.max(...year);

  return {
    min,
    max,
  };
};
