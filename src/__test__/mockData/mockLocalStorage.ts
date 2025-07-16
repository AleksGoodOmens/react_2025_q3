import { cleanup } from '@testing-library/react';
import { beforeEach } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: () => {
      delete store['search'];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Мок для API стран
// vi.mock('@/service/CountryAPI', () => ({
//   getAllCountries: vi.fn(() => Promise.resolve(mockCountries)),
//   getCountriesByName: vi.fn((search) =>
//     Promise.resolve(
//       mockCountries.filter((c) =>
//         c.name.common.toLowerCase().includes(search.toLowerCase())
//       )
//     )
//   ),
// }));

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, '', '/');
  // vi.clearAllMocks();
  cleanup();

  // Сбрасываем все моки к исходному состоянию
  // vi.mocked(getAllCountries).mockImplementation(() =>
  //   Promise.resolve(mockCountries)
  // );
  // vi.mocked(getCountriesByName).mockImplementation((search) =>
  //   Promise.resolve(
  //     mockCountries.filter((c) =>
  //       c.name.common.toLowerCase().includes(search.toLowerCase())
  //     )
  //   )
  // );
});
