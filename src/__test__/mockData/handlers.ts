import { http, HttpResponse } from 'msw';

import { mockCountries } from './countries.mock';

const url = 'https://restcountries.com/v3.1/all';
const urlByName = 'https://restcountries.com/v3.1/translation';
export const handlers = [
  http.get(url, () => {
    return HttpResponse.json(mockCountries);
  }),

  http.get(urlByName, () => {
    return HttpResponse.json(mockCountries[0]);
  }),
];
