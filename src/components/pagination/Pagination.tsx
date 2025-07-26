import { Button } from '../button/Button';
import clsx from 'clsx';
import { useCallback, useMemo, type ChangeEvent } from 'react';
import { useSearchParams, useSubmit } from 'react-router';

interface Props {
  limit: number;
  total: number;
  page: number;
  next: boolean;
  prev: boolean;
}

export const Pagination = ({ limit, total, page, next, prev }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [limit, total]);

  const currentPage = useMemo(() => page, [page]);

  const visiblePages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleChangeLimit = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newLimit = e.target.value;
      searchParams.set('limit', newLimit);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
      submit(searchParams);
    },
    [searchParams, submit, setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      submit(searchParams);
    },
    [searchParams, setSearchParams, submit]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded-2xl border-2 p-4">
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
        <h4 className="rounded-2xl border-2 bg-amber-600 p-2 text-white">
          Total: <span>{total}</span>
        </h4>
      </div>

      <div className="flex justify-center gap-4 p-2">
        <Button
          variant="main"
          disabled={prev}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          prev
        </Button>
        <div className="flex gap-2">
          {visiblePages.map((_, pageNumber) => {
            return (
              <Button
                variant="minor"
                className={clsx(
                  currentPage === pageNumber + 1 && 'bg-amber-800',
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
