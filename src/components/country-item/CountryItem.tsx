import type { ICountry } from '@/interfaces';
import { PureComponent, type ReactNode } from 'react';

class CountryItem extends PureComponent<ICountry> {
  render(): ReactNode {
    const { area, capital, flags, name } = this.props;

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
  }
}

export default CountryItem;
