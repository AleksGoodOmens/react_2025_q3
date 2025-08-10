import clsx from 'clsx';
import { useCallback, useMemo, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';

import { Button } from '@/components';

interface Props {
  limit: number;
  total: number | undefined;
  page: number;
  next: boolean;
  prev: boolean;
}

export const Pagination = ({ limit, total = 0, page, next, prev }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [limit, total]);

  const currentPage = useMemo(() => page, [page]);

  const visiblePages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    searchParams.set('limit', newLimit);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4">
        <div className="flex items-center gap-2">
          <h4>limit per page</h4>
          <select
            name="limit"
            id="limit"
            defaultValue={limit}
            onChange={handleChangeLimit}
            className="rounded-2xl border-2 bg-amber-800 p-2 text-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="grid gap-1">
          <h4 className="rounded-2xl border-2 bg-amber-600 p-2 text-white">
            Total items: <span>{total}</span>
          </h4>
          <h4 className="rounded-2xl border-2 bg-amber-600 p-2 text-white">
            Total pages: <span>{Math.ceil(total / limit)}</span>
          </h4>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 p-2 sm:flex-row">
        <Button
          variant="main"
          disabled={!prev}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          prev
        </Button>
        <div className="flex gap-2 self-center">
          {visiblePages.map((_, pageNumber) => {
            return (
              <Button
                variant="minor"
                className={clsx(
                  'w-14',
                  currentPage === pageNumber + 1 &&
                    'bg-amber-800 dark:bg-amber-600',
                  currentPage - (pageNumber + 1) > 2 && 'hidden',
                  currentPage - (pageNumber + 1) < -2 && 'hidden'
                )}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Button>
            );
          })}
        </div>
        <Button
          variant="main"
          disabled={!next}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          next
        </Button>
      </div>
    </div>
  );
};
