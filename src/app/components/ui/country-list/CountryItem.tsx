'use client';

import clsx from 'clsx';
import { useHydratedCountryStore } from 'hooks/store/useCountryStore';
import { ICountry } from 'interfaces/index';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  countryData: ICountry;
  isFavorite: boolean;
  isActive: boolean;
  className?: string | undefined;
}

export const CountryItem = ({
  countryData,
  isFavorite,
  isActive,
  className,
}: Props) => {
  const { addToFavorite, removeFromFavorite } = useHydratedCountryStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const { area, capital, flags, name } = countryData;

  const handleOpenDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.set('details', name.common);

    router.push(`?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details', name.common);

    router.push(`?${params.toString()}`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite(name.official);
      return;
    }
    addToFavorite(countryData);
  };

  return (
    <li
      className={clsx(
        'animate-fadeIn flex items-center rounded-2xl border-b-2 bg-amber-600 px-4 py-1',
        isActive && 'sticky top-0 -order-1 bg-amber-800 text-white',
        isFavorite && 'bg-amber-700',
        className
      )}
    >
      <button
        className="block h-full w-full"
        onClick={isActive ? handleCloseDetails : handleOpenDetails}
      >
        <p className="mb-2 text-center font-bold">{name.official}</p>

        <div className="flex gap-2">
          <div className="aspect-video h-15 w-20">
            <Image
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
      <label className="relative block h-6 w-6">
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={handleToggleFavorite}
          className="absolute top-0 left-0 h-full w-full cursor-pointer appearance-none"
        />
        <div
          className={clsx(
            'h-6 w-6 rounded-full border-2 transition-all duration-300',
            'flex items-center justify-center',
            isFavorite
              ? 'border-amber-500 bg-amber-500 text-white'
              : 'border-gray-300 bg-white text-transparent'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={clsx(
              'h-4 w-4 transition-transform duration-200',
              isFavorite ? 'scale-100' : 'scale-0'
            )}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </label>
    </li>
  );
};
