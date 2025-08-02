import { Button } from '../button/Button';
import { useCountryStore } from '@/store/useCountryStore';
import clsx from 'clsx';

const styles = {
  container:
    'fixed right-5 bottom-5 space-y-4 rounded-2xl border-2 bg-amber-800 p-4 text-white shadow-2xl transition-opacity duration-300 ease-in-out',
  hide: 'pointer-events-none opacity-0',
  show: 'opacity-100 delay-100',
  browserHints: {
    transitionProperty: 'opacity, pointer-events',
    willChange: 'opacity',
  },
  highlight: 'text-xl font-extrabold text-black',
};

export const Flyout = () => {
  const { favorite, clearFavorite } = useCountryStore((state) => state);
  const { container, show, hide, browserHints, highlight } = styles;
  return (
    <div
      className={clsx(container, favorite.length ? show : hide)}
      style={browserHints}
    >
      <p>
        You have <span className={highlight}>{favorite.length}</span> countr
        {favorite.length > 1 ? 'ies' : 'y'}
      </p>
      <div className="space-x-2">
        <Button
          disabled={!favorite.length}
          onClick={clearFavorite}
          variant="main"
        >
          unselect all
        </Button>
        <Button variant="main" disabled={!favorite.length}>
          download
        </Button>
      </div>
    </div>
  );
};
