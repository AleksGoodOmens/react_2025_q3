import { mockCountries } from './countries.mock';
import { http, HttpResponse } from 'msw';

const url = 'https://restcountries.com/v3.1/all';
const urlByName = 'https://restcountries.com/v3.1/translation/test';
const urlByNonExisted =
  'https://restcountries.com/v3.1/translation/non_existent_country';
export const handlers = [
  http.get(url, () => {
    return HttpResponse.json(mockCountries);
  }),

  http.get(urlByName, () => {
    return HttpResponse.json(mockCountries[0]);
  }),
  http.get(urlByNonExisted, () => {
    return HttpResponse.json([]);
  }),
];
