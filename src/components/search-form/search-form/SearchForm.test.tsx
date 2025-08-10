import { SearchForm } from './SearchForm';
import { user } from '@/__test__';
import { localStorageMock } from '@/__test__/mockData/mockLocalStorage';
import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('SearchForm', () => {
  let originalLocalStorage: Storage;
  let originalHistory: History;

  vi.mock('react-router', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router')>();
    return {
      ...actual,
      useSearchParams: () => [new URLSearchParams(), vi.fn()],
      useNavigate: () => vi.fn(),
    };
  });

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    originalHistory = window.history;

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    window.history.pushState = vi.fn();
  });

  describe('Rendering Tests:', () => {
    beforeEach(() => {
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <SearchForm />,
          },
        ],
        {
          initialEntries: ['/'],
        }
      );

      // 2. Рендерим через RouterProvider
      render(<RouterProvider router={router} />);
    });

    afterEach(() => {
      localStorage.clear();
      cleanup();
    });
    it('Renders search input and search button', async () => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
    it('Shows empty input when no saved term exists', async () => {
      const savedValue = localStorage.getItem('search');
      expect(savedValue).toBeNull();
      expect(screen.getByRole('searchbox')).toHaveValue('');
    });
    it('Displays previously saved search term from localStorage on mount', async () => {
      cleanup();
      const testValue = 'test';
      localStorage.setItem('search', testValue);
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <SearchForm />,
          },
        ],
        {
          initialEntries: ['/'],
        }
      );

      render(<RouterProvider router={router} />);
      expect(screen.getByRole('searchbox')).toHaveValue(testValue);
    });
  });
  describe('User Interaction Tests:', () => {
    beforeEach(() => {
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <SearchForm />,
          },
        ],
        {
          initialEntries: ['/'],
        }
      );

      render(<RouterProvider router={router} />);
    });
    afterEach(() => {
      localStorage.clear();
      cleanup();
    });

    it('Updates input value when user types', async () => {
      const testValue = 'test';
      const input = screen.getByRole('searchbox');
      expect(input).toHaveValue('');
      await user.type(input, testValue);
      expect(input).toHaveValue(testValue);
    });
    it('Saves search term to localStorage when search button is clicked', async () => {
      const testValue = 'test';
      const input = screen.getByRole('searchbox');
      const btn = screen.getByRole('button', { name: 'search' });

      expect(localStorage.getItem('search')).toBeNull();
      await user.type(input, testValue);
      await user.click(btn);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(localStorage.getItem('search')).toBe(testValue);
    });
    it('Trims whitespace from search input before saving', async () => {
      const testValue = ' test test ';
      const properValue = 'test test';
      const input = screen.getByRole('searchbox');
      const btn = screen.getByRole('button', { name: 'search' });

      expect(localStorage.getItem('search')).toBe(null);
      await user.type(input, testValue);
      await user.click(btn);
      expect(localStorage.getItem('search')).toBe(properValue);
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'history', {
      value: originalHistory,
    });
  });
});
