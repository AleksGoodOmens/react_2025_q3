import { CountryItem } from './CountryItem';
import {
  mockCountry,
  mockCountryWithoutCapital,
} from '@/__test__/mockData/countries.mock';
import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('CountryItem component tests', () => {
  describe('Basic rendering tests with complete data', () => {
    beforeEach(() => {
      cleanup();
      render(
        <MemoryRouter>
          <CountryItem countryData={mockCountry} />
        </MemoryRouter>
      );
    });

    it('should render as a list item with proper "li" tag', () => {
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('should display country flag image with correct alt text and src attributes', () => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', mockCountry.flags.alt);
      expect(image).toHaveAttribute('src', mockCountry.flags.svg);
    });

    it('should display capital name when capital data is provided', async () => {
      expect(await screen.findByText('testograd')).toBeInTheDocument();
    });
    it('should render only two paragraphs when capital data is missing', () => {
      cleanup();
      render(
        <MemoryRouter>
          <CountryItem countryData={mockCountryWithoutCapital} />
        </MemoryRouter>
      );
      expect(screen.getAllByRole('paragraph').length).toBe(2);
    });
  });
});
