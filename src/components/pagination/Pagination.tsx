import { Button } from '../button/Button';
import { useMemo } from 'react';

interface Props {
  limit: number;
  total: number;
  page: number;
  next: boolean;
  prev: boolean;
}

export const Pagination = ({ limit, total, page, next, prev }: Props) => {
  const totalPages = useMemo(() => {
    return Math.round(total / limit);
  }, [limit, total]);

  const currentPage = useMemo(() => page + 1, [page]);
  return (
    <div>
      <select name="limit" id="limit" defaultValue={limit}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <div>{total}</div>
      <div className="flex gap-4">
        <Button disabled={prev}>prev</Button>
        {...Array.from({ length: totalPages }).map((_, pageNumber) => {
          return (
            <Button
              className={currentPage === pageNumber + 1 ? 'bg-amber-800' : ''}
              key={pageNumber}
            >
              {pageNumber + 1}
            </Button>
          );
        })}
        <Button disabled={next}>next</Button>
      </div>
    </div>
  );
};
