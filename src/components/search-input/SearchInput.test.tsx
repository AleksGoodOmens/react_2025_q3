import { SearchInput } from './SearchInput';
import { user } from '@/__test__';
import { localStorageMock } from '@/__test__/mockData/mockLocalStorage';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

describe('SearchInput', () => {
  describe('render with local storage', () => {
    const originalLocalStorage: Storage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });
    beforeEach(() => {
      cleanup();
      localStorage.clear();
    });

    afterAll(() => {
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
      });
    });
    it('render empty search input when local storage is empty', () => {
      expect(localStorage.getItem('search')).toBeNull();
      render(<SearchInput />);
      expect(screen.getByRole('searchbox')).toHaveValue('');
    });
  });
  describe('check label', () => {
    beforeEach(() => {
      cleanup();
    });
    it('render label with h5 and input', () => {
      render(<SearchInput />);
      const searchbox = screen.getByRole('searchbox', { name: /search/i });
      const h5 = screen.getByRole('heading', { level: 5 });

      expect(h5).toBeInTheDocument();
      expect(searchbox).toBeInTheDocument();
      expect(searchbox).toHaveAttribute('type', 'search');
    });
    it('render default label empty props', () => {
      render(<SearchInput />);
      expect(screen.getByRole('heading', { name: 'search' }));
      expect(screen.getByRole('searchbox', { name: /search/i }));
    });
  });

  describe('input check', () => {
    beforeEach(() => {
      cleanup();
      render(<SearchInput />);
    });

    it('user can type the text', async () => {
      const searchbox = screen.getByRole('searchbox', { name: /search/i });
      expect(searchbox).toHaveValue('');
      await user.type(searchbox, 'test');
      expect(searchbox).toHaveValue('test');
    });
  });
});
