import type { ICountry } from '@/interfaces';
import clsx from 'clsx';
import { memo } from 'react';
import { useSearchParams } from 'react-router';

interface Props {
  countryData: ICountry;
}

export const CountryItem = memo(function CountryItem({ countryData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { area, capital, flags, name } = countryData;
  const isOpened = searchParams.get('details');
  const isActive = isOpened === name.common;

  const handleOpenDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', name.common);
    setSearchParams(newParams);
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return (
    <li
      className={clsx(
        !isOpened && 'grow basis-xs',
        'animate-fadeIn',
        isActive && 'rounded-3xl bg-amber-800 text-white'
      )}
    >
      <button
        className="block h-full w-full border-b-2 p-1"
        onClick={isActive ? handleCloseDetails : handleOpenDetails}
      >
        <p className="mb-2 text-center font-bold">{name.official}</p>

        <div className="flex gap-2">
          <div className="aspect-video h-15 w-20">
            <img
              width={80}
              height={60}
              className="rounded-md object-cover"
              src={flags.svg}
              alt={flags.alt || name.official}
            />
          </div>
          <div>
            {capital ? (
              <p className="font-bold">
                Capital:
                {capital.map((cap) => (
                  <span className="font-normal" key={cap}>
                    {cap}
                  </span>
                ))}
              </p>
            ) : null}
            <p className="font-bold">
              Area: <span className="font-normal">{area} km²</span>
            </p>
          </div>
        </div>
      </button>
    </li>
  );
});
