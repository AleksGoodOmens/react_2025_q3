'use client';

import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, type ChangeEvent } from 'react';

interface Props {
  limit: number;
  total: number | undefined;
  page: number;
  next: boolean;
  prev: boolean;
}

export const Pagination = ({ limit, total = 0, page, next, prev }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations('pagination');
  const searchParams = useSearchParams();
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [limit, total]);

  const visiblePages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    navigate('limit', newLimit);
  };

  const handlePageChange = (newPage: number) => {
    navigate('page', newPage.toString());
  };

  const navigate = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);

    router.push(`${path}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4">
        <div className="flex items-center gap-2">
          <h4>{t('select')}</h4>
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
            {t('totalItems')}: <span>{total}</span>
          </h4>
          <h4 className="rounded-2xl border-2 bg-amber-600 p-2 text-white">
            {t('totalPages')}: <span>{Math.ceil(total / limit)}</span>
          </h4>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 p-2 sm:flex-row">
        <Button
          variant="main"
          disabled={!prev}
          onClick={() => handlePageChange(page - 1)}
        >
          {t('prev')}
        </Button>
        <div className="flex gap-2 self-center">
          {visiblePages.map((_, pageNumber) => {
            return (
              <Button
                variant="minor"
                className={clsx(
                  'w-14',
                  page === pageNumber + 1 && 'bg-amber-800 dark:bg-amber-600',
                  page - (pageNumber + 1) > 2 && 'hidden',
                  page - (pageNumber + 1) < -2 && 'hidden'
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
          onClick={() => handlePageChange(page + 1)}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
};
