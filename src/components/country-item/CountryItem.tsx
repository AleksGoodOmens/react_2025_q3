import type { ICountry } from '@/interfaces';
import { memo } from 'react';

interface Props {
  countryData: ICountry;
}

export const CountryItem = memo(function CountryItem({ countryData }: Props) {
  const { area, capital, flags, name } = countryData;

  return (
    <li className="border-b-2 p-1">
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
    </li>
  );
});
