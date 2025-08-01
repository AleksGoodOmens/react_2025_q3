import type { ICountry } from '@/interfaces';
import { useCountryStore } from '@/store/useCountryStore';
import clsx from 'clsx';
import { memo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

interface Props {
  countryData: ICountry;
  isFavorite: boolean;
}

export const CountryItem = memo(function CountryItem({
  countryData,
  isFavorite,
}: Props) {
  const { addToFavorite, removeFromFavorite } = useCountryStore(
    (state) => state
  );
  const { country } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { area, capital, flags, name } = countryData;

  const isActive = country === name.common;

  const handleOpenDetails = () => {
    const prevParams = new URLSearchParams(searchParams);

    navigate({
      pathname: `details/${name.common}`,
      search: prevParams.toString(),
    });
  };

  const handleCloseDetails = () => {
    const prevParams = new URLSearchParams(searchParams);
    navigate({ pathname: '/', search: prevParams.toString() });
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite(name.official);
      return;
    }
    addToFavorite(name.official);
  };

  return (
    <li
      className={clsx(
        'grow basis-xs',
        'animate-fadeIn',
        isActive && 'rounded-3xl bg-amber-800 text-white'
      )}
    >
      <input
        type="checkbox"
        checked={isFavorite}
        onChange={handleToggleFavorite}
      />
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
