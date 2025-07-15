import type { ICountry } from '@/interfaces';

export const mockCountries: ICountry[] = [
  {
    name: {
      common: 'Test Country',
      official: 'Official Test Country',
      nativeName: {
        spa: {
          common: 'common-spa-name',
          official: 'official-spa-name',
        },
      },
    },
    flags: { png: 'test-flag.png', alt: 'Test flag', svg: 'test-flag.png' },
    capital: ['Test Capital'],
    area: 100000,
  },
  {
    name: {
      common: 'Test Country 2',
      official: 'Official Test Country 2',
      nativeName: {
        spa: {
          common: 'common-spa-name 2',
          official: 'official-spa-name 2',
        },
      },
    },
    flags: {
      png: 'test-flag-2.png',
      alt: 'Test flag 2',
      svg: 'test-flag-2.png',
    },
    capital: ['Test Capital 2'],
    area: 100000,
  },
  {
    name: {
      common: 'Test Country 3',
      official: 'Official Test Country 3',
      nativeName: {
        spa: {
          common: 'common-spa-name-3',
          official: 'official-spa-name-3',
        },
      },
    },
    flags: {
      png: 'test-flag-3.png',
      alt: 'Test flag 3',
      svg: 'test-flag-3.png',
    },
    capital: ['Test Capital 3'],
    area: 100000,
  },
];
