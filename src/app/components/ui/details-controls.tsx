'use client';

import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  handleRefetch: () => void;
  isStale: boolean;
}

export const DetailsControls = ({ handleRefetch, isStale }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('detailsControls');

  const handleClose = () => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.delete('details');
    router.push(`?${newUrlSearchParams.toString()}`);
  };
  return (
    <div className="flex justify-between">
      <Button variant="main" onClick={handleRefetch}>
        {t('updateBtn')}
      </Button>
      <div
        className={clsx(
          'w-fit rounded-2xl p-2',
          isStale ? 'bg-red-500' : 'bg-green-500'
        )}
      >
        {isStale ? t('oldData') : t('freshData')}
      </div>
      <Button className="self-start" variant="ghost" onClick={handleClose}>
        X
      </Button>
    </div>
  );
};
