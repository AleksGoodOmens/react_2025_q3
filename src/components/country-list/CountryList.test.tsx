import { CountryList } from './CountryList';
import { server } from '@/__test__';
import { BASE_API_URL } from '@/constants';
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

describe.skip('CountryList', () => {
  describe('check for change state to loading and back', () => {
    let consoleSpy: MockInstance;
    server.resetHandlers();
    cleanup();
    localStorage.clear();
    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      server.use(
        http.get(`${BASE_API_URL}all`, () => {
          return HttpResponse.json([], { status: 500 });
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

      expect(await screen.findAllByRole('listitem')).toHaveLength(3);
    });
    it('should show skeletons during search and then results', async () => {
      render(<CountryList />);

      expect(screen.getAllByRole('status', { busy: true })).toHaveLength(20);

      expect(await screen.findAllByRole('listitem')).toHaveLength(3);

      window.history.pushState({}, '', '?search=test');
      window.dispatchEvent(new CustomEvent('searchUpdated'));
      expect(await screen.findAllByRole('status', { busy: true })).toHaveLength(
        20
      );

      expect(await screen.findAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('empty state', () => {
    it('should show "No countries found"', async () => {
      window.history.pushState({}, '', '?search=non_existent_country');
      render(<CountryList />);

      expect(
        await screen.findByText(/no countries found/i)
      ).toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('should filter by URL param', async () => {
      window.history.pushState({}, '', '?search=test');
      render(<CountryList />);

      expect(await screen.findAllByRole('listitem')).toHaveLength(1);
    });
  });
});
