import { CountryList } from './CountryList';
import { mockCountries } from '@/__test__';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('CountryList', () => {
  vi.mock('react-router', () => ({
    useParams: () => ({ country: '' }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    useNavigate: () => vi.fn(),
    useLocation: () => vi.fn(),
  }));
  describe('empty state', () => {
    it('should show "No countries found" if list is empty', async () => {
      render(<CountryList countries={[]} isActive={false} />);

      expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    });
    it('should show "proper amount of cards if cards provided', async () => {
      render(<CountryList countries={mockCountries} isActive={false} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
    it('component should have proper classname if it is`t active', async () => {
      render(<CountryList countries={mockCountries} isActive={false} />);

      expect(screen.getByRole('list')).not.toHaveClass('flex-1/2');
    });
    it('component should have proper classname if it is active', async () => {
      render(<CountryList countries={mockCountries} isActive={true} />);

      expect(screen.getByRole('list')).toHaveClass('flex-1/2');
    });
  });
});
