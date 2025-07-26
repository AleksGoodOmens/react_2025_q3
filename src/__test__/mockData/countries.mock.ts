import type { ICountry, IDetailedCountry } from '@/interfaces';

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
export const mockCountry: ICountry = {
  area: 1000,
  capital: ['testograd'],
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};
export const mockCountryWithoutCapital: ICountry = {
  area: 1000,
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};

export const MockDetailedCountry: IDetailedCountry = {
  name: {
    common: 'Test Country',
    official: 'Official Test Country',
    nativeName: {
      eng: {
        official: 'Official Test Country',
        common: 'Test Country',
      },
    },
  },
  flag: '',
  capital: ['Test Capital'],
  region: 'Test Region',
  subregion: 'Test Subregion',
  flags: {
    png: 'https://test.flag.png',
    svg: 'https://test.flag.svg',
    alt: 'Test flag description',
  },
  coatOfArms: {
    png: 'https://test.coat.png',
    svg: 'https://test.coat.svg',
  },
  area: 123456,
  population: 9876543,
  languages: {
    eng: 'English',
    test: 'Test Language',
  },
  currencies: {
    TEST: {
      name: 'Test Currency',
      symbol: '₺',
    },
  },
  timezones: ['UTC+0'],
  borders: ['TST', 'TST2'],
  idd: {
    root: '+1',
    suffixes: ['23', '45'],
  },
  postalCode: {
    format: 'TEST ###',
    regex: '^[A-Z]{4}$',
  },
  maps: {
    googleMaps: 'https://google.maps/test',
    openStreetMaps: 'https://osm.org/test',
  },
  independent: true,
  status: 'officially-assigned',
  altSpellings: ['TC', 'Test C.'],
};
