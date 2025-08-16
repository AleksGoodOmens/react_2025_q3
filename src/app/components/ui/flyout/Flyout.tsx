'use client';

import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { useHydratedCountryStore } from 'hooks/store/useCountryStore';
import { useTranslations } from 'next-intl';

const styles = {
  container:
    'fixed right-5 bottom-5 space-y-4 rounded-2xl border-2 bg-amber-800 p-4 text-white shadow-2xl transition-opacity  duration-300 ease-in-out z-100',
  hide: 'pointer-events-none opacity-0',
  show: 'opacity-100 delay-100 pointer-events-auto',
  browserHints: {
    transitionProperty: 'opacity, pointer-events',
    willChange: 'opacity',
  },
  highlight: 'text-xl font-extrabold text-black',
};

const { container, show, hide, browserHints, highlight } = styles;

export const Flyout = () => {
  const { favorite, clearFavorite } = useHydratedCountryStore();
  const t = useTranslations('flyout');

  const handleDownload = async () => {
    const res = await fetch('/api/csv', {
      method: 'POST',
      body: JSON.stringify(favorite),
      headers: { 'Content-Type': 'application/json' },
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${favorite.length}-items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    clearFavorite();
  };

  return (
    <div
      role="dialog"
      className={clsx(container, favorite.length ? show : hide)}
      style={browserHints}
    >
      <p>
        {t.rich('counter', {
          count: favorite.length,
          span: (chunks) => <span className={highlight}>{chunks}</span>,
        })}
      </p>
      <div className="space-x-2">
        <Button
          disabled={!favorite.length}
          onClick={clearFavorite}
          variant="main"
        >
          {t('unselect')}
        </Button>

        <Button
          variant="main"
          disabled={!favorite.length}
          onClick={handleDownload}
        >
          {t('download')} - {favorite.length}
        </Button>
      </div>
    </div>
  );
};
