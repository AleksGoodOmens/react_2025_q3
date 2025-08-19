import { CountryList } from './CountryList';
import { mockCountries } from '@/__test__';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

describe('CountryList', () => {
  vi.mock('react-router', () => ({
    useParams: () => ({ country: '' }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    useNavigate: () => vi.fn(),
    useLocation: () => vi.fn(),
    useNavigation: () => vi.fn().mockReturnValue({ state: '' }),
  }));
  beforeEach(() => {
    cleanup();
  });
  describe('empty state', () => {
    it('should show "No countries found" if list is empty', async () => {
      render(<CountryList countries={[]} limit={20} />);

      expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    });
    it('should show "proper amount of cards if cards provided', async () => {
      render(<CountryList countries={mockCountries} limit={20} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
    it('component should have proper classname if it is`t active', async () => {
      render(<CountryList countries={mockCountries} limit={20} />);

      expect(screen.getByRole('list')).toHaveClass(
        'md:grid-cols-2 lg:grid-cols-3'
      );
    });
    it('component should have proper classname if it is active', async () => {
      render(
        <CountryList
          countries={mockCountries}
          activeCountry={'Test Country'}
          limit={20}
        />
      );

      expect(screen.getByRole('list')).not.toHaveClass(
        'md:grid-cols-2 lg:grid-cols-3'
      );
    });
  });
});
