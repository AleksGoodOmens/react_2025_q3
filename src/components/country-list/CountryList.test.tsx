import { getAllCountries, getCountriesByName } from '@/service/CountryAPI';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CountryList from './CountryList';

describe('CountryList', () => {
  it('should load and display countries', async () => {
    render(<CountryList />);

    expect(screen.getAllByTestId('skeleton-item')).toHaveLength(20);

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled();
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });
  });

  it('should handle search from URL', async () => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', 'test');
    window.history.pushState({}, '', `?${searchParams.toString()}`);

    render(<CountryList />);

    await waitFor(() => {
      expect(getCountriesByName).toHaveBeenCalledWith('test');
    });
  });

  it('should handle search from localStorage', async () => {
    window.localStorage.setItem('search', 'local');
    render(<CountryList />);
    await waitFor(() => {
      expect(getCountriesByName).toHaveBeenCalledWith('local');
    });
  });

  it('should respond to search events', async () => {
    render(<CountryList />);

    // Имитируем кастомное событие
    window.localStorage.setItem('search', 'event');
    window.dispatchEvent(new CustomEvent('searchUpdated'));

    await waitFor(() => {
      expect(getCountriesByName).toHaveBeenCalledWith('event');
    });
  });

  it('should show error state', async () => {
    vi.mocked(getAllCountries).mockRejectedValueOnce(new Error('API failed'));
    render(<CountryList />);

    await waitFor(() => {
      expect(screen.getByText('No countries found')).toBeInTheDocument();
    });
  });
});
