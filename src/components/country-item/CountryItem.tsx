import type { ICountry } from '@/interfaces';

interface Props {
  countryData: ICountry;
}

export const CountryItem = ({ countryData }: Props) => {
  const { area, capital, flags, name } = countryData;

  return (
    <li className="flex items-center gap-2 border-b-2 p-1">
      <img
        width={75}
        height={'100%'}
        className="rounded-md object-cover"
        src={flags.svg}
        alt={flags.alt}
      />
      <div>
        <p className="font-bold">{name.official}</p>
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
    </li>
  );
};
