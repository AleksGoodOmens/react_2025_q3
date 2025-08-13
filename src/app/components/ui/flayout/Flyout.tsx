'use client';

import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { useCountryStore, useCSV } from 'hooks/index';

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
  const { favorite, clearFavorite } = useCountryStore();
  const { create, isLoading, url, clear } = useCSV();

  const handleRestore = async () => {
    if (url) await clear();
    clearFavorite();
  };

  const handleDownload = () => {
    create(favorite);
  };

  return (
    <div
      role="dialog"
      className={clsx(container, favorite.length ? show : hide)}
      style={browserHints}
    >
      <p>
        You have <span className={highlight}>{favorite.length}</span> countr
        {favorite.length > 1 ? 'ies' : 'y'}
      </p>
      <div className="space-x-2">
        <Button
          disabled={!favorite.length || isLoading}
          onClick={url ? clear : handleRestore}
          variant="main"
        >
          {url ? 'cancel' : 'unselect all'}
        </Button>
        {url ? (
          <a
            href={url}
            className="inline-block px-2 py-2"
            download={`${favorite.length}-items`}
            onClick={handleRestore}
          >
            download - {favorite.length}
          </a>
        ) : (
          <Button
            variant="main"
            disabled={!favorite.length || isLoading}
            onClick={handleDownload}
          >
            {isLoading ? 'wait...' : 'create CSV'}
          </Button>
        )}
      </div>
    </div>
  );
};
