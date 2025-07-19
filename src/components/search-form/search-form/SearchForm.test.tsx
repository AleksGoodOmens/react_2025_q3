import { SearchForm } from './SearchForm';
import { user } from '@/__test__';
import { localStorageMock } from '@/__test__/mockData/mockLocalStorage';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

describe('SearchForm', () => {
  let originalLocalStorage: Storage;
  let originalHistory: History;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    originalHistory = window.history;

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    window.history.pushState = vi.fn();
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'history', {
      value: originalHistory,
    });
  });

  describe('Rendering Tests:', () => {
    beforeEach(() => {
      render(<SearchForm />);
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
      render(<SearchForm />);
      expect(screen.getByRole('searchbox')).toHaveValue(testValue);
    });
  });
  describe('User Interaction Tests:', () => {
    beforeEach(() => {
      render(<SearchForm />);
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

      expect(localStorage.getItem('search')).toBe(null);
      await user.type(input, testValue);
      await user.click(btn);
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
    it('Triggers search callback with correct parameters', async () => {
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
      const testValue = ' test test ';
      const input = screen.getByRole('searchbox');
      const btn = screen.getByRole('button', { name: 'search' });

      await user.type(input, testValue);
      await user.click(btn);

      expect(dispatchEventSpy).toHaveBeenCalledOnce();
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        '?search=test+test'
      );
    });
  });
  describe('LocalStorage Integration:', () => {
    beforeEach(() => {
      render(<SearchForm />);
    });

    afterEach(() => {
      localStorage.clear();
      cleanup();
    });
    it('Retrieves saved search term on component mount', async () => {
      cleanup();
      const testValue = 'test';
      localStorage.setItem('search', testValue);
      render(<SearchForm />);
      expect(screen.getByRole('searchbox')).toHaveValue(testValue);
    });
  });

  describe('User can send the form:', async () => {
    it('it send form', async () => {
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
      render(<SearchForm />);
      const btn = screen.getByRole('button');
      const searchInput = screen.getByRole('searchbox');

      expect(searchInput.textContent).toBe('');
      await user.click(btn);

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '?');
      expect(dispatchEventSpy).toHaveBeenCalled();
    });

    it('it send proper test after user input', async () => {
      cleanup();
      const testInputValue = 'test user type';
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
      render(<SearchForm />);
      const btn = screen.getByRole('button');
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toHaveValue('');
      await user.type(searchInput, testInputValue);
      expect(searchInput).toHaveValue(testInputValue);
      await user.click(btn);
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        `?search=${testInputValue.split(' ').join('+')}`
      );
      expect(dispatchEventSpy).toHaveBeenCalled();
    });
  });
});
