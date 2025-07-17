import { CountryItem } from './CountryItem';
import {
  mockCountry,
  mockCountryWithoutCapital,
} from '@/__test__/mockData/countries.mock';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('CountryItem', () => {
  beforeEach(() => {
    render(<CountryItem {...mockCountry} />);
  });
  it('render proper tag "li"', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
  it('have an image with proper attributes', () => {
    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockCountry.flags.alt);
    expect(image).toHaveAttribute('src', mockCountry.flags.svg);
  });
  it('it render render capital name if exist', async () => {
    expect(await screen.findByText('testograd')).toBeInTheDocument();
  });
});

describe('non capital in props', () => {
  it('it do not render capital name if not exist', () => {
    render(<CountryItem {...mockCountryWithoutCapital} />);
    expect(screen.getAllByRole('paragraph').length).toBe(2);
  });
});
