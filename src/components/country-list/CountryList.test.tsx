import { CountryList } from './CountryList';
import { mockCountries, server } from '@/__test__';
import { http, HttpResponse } from 'msw';
import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

describe('CountryList', () => {
  describe('check for change state to loading and back', () => {
    let consoleSpy: MockInstance;
    server.resetHandlers();
    cleanup();
    localStorage.clear();
    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      server.use(
        http.get('https://restcountries.com/v3.1/all', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
      render(<CountryList />);
    });

    it('should show error state when loading fails', async () => {
      expect(screen.getAllByRole('status')).toHaveLength(20);

      await waitFor(
        () => {
          expect(consoleSpy).toHaveBeenCalledTimes(2);
        },
        { timeout: 200 }
      );
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });
  });
  describe('initial render', () => {
    it('should render 20 skeletons', () => {
      render(<CountryList />);
      expect(screen.getAllByRole('status')).toHaveLength(20);
    });
  });

  describe('data loading', () => {
    it('should display countries', async () => {
      render(<CountryList />);
      expect(await screen.findAllByRole('status')).toHaveLength(20);

      expect(await screen.findAllByRole('listitem')).toHaveLength(3);
    });
    it('should show skeletons during search and then results', async () => {
      server.use(
        http.get('https://restcountries.com/v3.1/all', async () => {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Задержка
          return HttpResponse.json(mockCountries);
        }),
        http.get('https://restcountries.com/v3.1/translation*', async () => {
          await new Promise((resolve) => setTimeout(resolve, 300)); // Задержка
          return HttpResponse.json([mockCountries[0]]);
        })
      );

      render(<CountryList />);

      expect(screen.getAllByRole('status', { busy: true })).toHaveLength(20);

      await waitFor(() => {
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
      });

      window.history.pushState({}, '', '?search=test');
      window.dispatchEvent(new CustomEvent('searchUpdated'));
      expect(await screen.findAllByRole('status', { busy: true })).toHaveLength(
        20
      );

      await waitFor(() => {
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
      });
    });
  });

  describe('empty state', () => {
    it('should show "No countries found"', async () => {
      server.use(
        http.get('https://restcountries.com/v3.1/translation/*', () => {
          return HttpResponse.json([]);
        })
      );

      window.history.pushState({}, '', '?search=empty');
      render(<CountryList />);

      await waitFor(
        () => {
          expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
        },
        { timeout: 200 }
      );
    });
  });

  describe('search', () => {
    it('should filter by URL param', async () => {
      server.use(
        http.get('https://restcountries.com/v3.1/translation/test', () => {
          return HttpResponse.json([mockCountries[0]]);
        })
      );

      window.history.pushState({}, '', '?search=test');
      render(<CountryList />);

      await waitFor(
        () => {
          expect(screen.getAllByRole('listitem')).toHaveLength(1);
        },
        { timeout: 200 }
      );
    });
  });
});
