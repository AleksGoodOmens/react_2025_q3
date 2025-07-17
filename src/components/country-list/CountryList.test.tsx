import { CountryList } from './CountryList';
import { mockCountries, server } from '@/__test__';
import { http, HttpResponse } from 'msw';
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

describe('CountryList', () => {
  beforeAll(() => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return HttpResponse.json(mockCountries);
      })
    );
  });

  describe('initial render', () => {
    it('should render 20 skeletons', () => {
      render(<CountryList />);
      expect(screen.getAllByTestId('skeleton-item')).toHaveLength(20);
    });
  });

  describe('data loading', () => {
    it('should display countries', async () => {
      render(<CountryList />);
      await waitFor(
        () => {
          expect(screen.getAllByRole('listitem')).toHaveLength(3);
        },
        { timeout: 200 }
      );
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
