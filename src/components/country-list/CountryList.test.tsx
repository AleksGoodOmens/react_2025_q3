import { CountryList } from './CountryList';
import { mockCountries, server } from '@/__test__';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

describe('CountryList', () => {
  describe('positive scenario', () => {
    beforeEach(() => {
      render(<CountryList />);
    });
    it('should render 20 skeletons at initial render', () => {
      expect(screen.getAllByTestId('skeleton-item')).toHaveLength(20);
    });

    it('should load and display countries', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(3);
      });
    });
    it('render empty list', async () => {
      cleanup();
      server.use(
        http.get('https://restcountries.com/v3.1/translation', () => {
          return HttpResponse.json([]);
        })
      );
      const searchParams = new URLSearchParams();
      searchParams.set('search', 'non_existent_country');
      window.history.pushState({}, '', `?${searchParams.toString()}`);
      render(<CountryList />);
      await waitFor(() => {
        expect(screen.getByRole('listitem')).toHaveTextContent(
          /No countries found/gi
        );
      });
    });

    it('should trigger load on searchUpdated event', async () => {
      cleanup();
      const loadMock = vi.fn();

      const instance = new CountryList({});
      instance.loadCountries = loadMock;

      instance.componentDidMount();

      window.dispatchEvent(new CustomEvent('searchUpdated'));

      await waitFor(() => {
        expect(loadMock).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('search parameters check', () => {
    it('should handle search from URL', async () => {
      server.use(
        http.get('https://restcountries.com/v3.1/translation/test', () => {
          return HttpResponse.json([mockCountries[0]]);
        })
      );
      const searchParams = new URLSearchParams();
      searchParams.set('search', 'test');
      window.history.pushState({}, '', `?${searchParams.toString()}`);
      render(<CountryList />);
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(1);
      });
    });
  });
});
