import Home from './Home';
import { user } from '@/__test__';
import { longListOfMockCountries } from '@/__test__/mockData/countries.mock';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

const mockRouter = createMemoryRouter([
  {
    path: '/',
    errorElement: <div>Main error</div>,
    hydrateFallbackElement: <div>loading...</div>,
    Component: Home,
    loader: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 50);
      });
      return {
        countries: longListOfMockCountries,
        search: 'ru',
        prev: false,
        next: true,
        page: 1,
        limit: 20,
        total: longListOfMockCountries.length,
        error: undefined,
      };
    },
  },
]);

describe('home page', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    cleanup();
  });

  it('render home page heading', async () => {
    render(<RouterProvider router={mockRouter} />);

    expect(
      await screen.findByRole('heading', { level: 1 })
    ).toBeInTheDocument();
  });

  it('trigger error', async () => {
    render(<RouterProvider router={mockRouter} />);

    const errorBtn = await screen.findByRole('button', { name: 'error' });
    expect(errorBtn).toBeInTheDocument();
    await user.click(errorBtn);
    expect(consoleSpy).toHaveBeenCalled();
  });

  afterAll(() => {
    cleanup();
    vi.restoreAllMocks();
  });
});
