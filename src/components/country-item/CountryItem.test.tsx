import { CountryItem } from './CountryItem';
import { user } from '@/__test__';
import {
  mockCountry,
  mockCountryWithoutCapital,
} from '@/__test__/mockData/countries.mock';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CountryItem component tests', () => {
  describe('Basic rendering tests with complete data', async () => {
    const mockNavigate = vi.fn();
    vi.spyOn(await import('react-router'), 'useNavigate').mockReturnValue(
      mockNavigate
    );
    beforeEach(() => {
      cleanup();

      render(
        <MemoryRouter>
          <CountryItem
            isActive={false}
            countryData={mockCountry}
            isFavorite={false}
          />
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
          <CountryItem
            isActive={false}
            countryData={mockCountryWithoutCapital}
            isFavorite={false}
          />
        </MemoryRouter>
      );
      expect(screen.getAllByRole('paragraph').length).toBe(2);
    });
    it('user can navigate to details page by click on item', async () => {
      const liBtn = screen.getByRole('button', {
        name: /official-test-country-name/i,
      });
      expect(liBtn).toBeInTheDocument();

      await user.click(liBtn);

      expect(mockNavigate).toBeCalledWith({
        pathname: 'details/common-test-country-name',
        search: '',
      });
    });

    it('user can navigate to home page by click on item', async () => {
      const mockParams = { country: 'common-test-country-name' };
      vi.spyOn(await import('react-router'), 'useParams').mockReturnValue(
        mockParams
      );
      cleanup();

      render(
        <MemoryRouter>
          <CountryItem
            countryData={mockCountry}
            isFavorite={false}
            isActive={true}
          />
        </MemoryRouter>
      );
      const liBtn = screen.getByRole('button', {
        name: /official-test-country-name/i,
      });
      expect(liBtn).toBeInTheDocument();

      await user.click(liBtn);

      expect(mockNavigate).toBeCalledWith({
        pathname: '/',
        search: '',
      });
    });
  });
});
