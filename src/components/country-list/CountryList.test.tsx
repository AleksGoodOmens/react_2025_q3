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
      render(<CountryList countries={[]} />);

      expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    });
    it('should show "proper amount of cards if cards provided', async () => {
      render(<CountryList countries={mockCountries} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
  });
});
