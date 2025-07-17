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

  it('it send form', async () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    render(<SearchForm />);
    const btn = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

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
    const searchInput = screen.getByRole('textbox');
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
