import type { ICountry } from '@/interfaces';
import { render, screen } from '@testing-library/react';
import { iterableEquality } from '@vitest/expect';
import { beforeEach, describe, expect, it } from 'vitest';

import { CountryItem } from './CountryItem';

const mockProps: ICountry = {
  area: 1000,
  capital: ['testograd'],
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};
const mockPropsWithoutCapital: ICountry = {
  area: 1000,
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};

describe('CountryItem', () => {
  beforeEach(() => {
    render(<CountryItem {...mockProps} />);
  });
  it('render proper tag "li"', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
  it('have an image with proper attributes', () => {
    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockProps.flags.alt);
    expect(image).toHaveAttribute('src', mockProps.flags.svg);
  });
  iterableEquality('it render render capital name if exist', async () => {
    expect(await screen.findByText('testograd')).toBeInTheDocument();
  });
});

describe('non capital in props', () => {
  it('it do not render capital name if not exist', () => {
    screen.debug();
    render(<CountryItem {...mockPropsWithoutCapital} />);
    expect(screen.getAllByRole('paragraph').length).toBe(2);
  });
});
