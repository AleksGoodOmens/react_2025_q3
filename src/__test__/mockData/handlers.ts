import { mockCountries } from './countries.mock';
import { BASE_API_URL } from '@/constants';
import { http, HttpResponse } from 'msw';

const url = new URL('all', BASE_API_URL);

export const test_base_url = url.href;
export const test_url_by_name =
  'https://restcountries.com/v3.1/translation/test';
export const test_url_by_non_existed =
  'https://restcountries.com/v3.1/translation/non_existent_country';
export const handlers = [
  http.get(test_base_url, () => {
    return HttpResponse.json(mockCountries);
  }),

  http.get(test_url_by_name, () => {
    return HttpResponse.json(mockCountries[0]);
  }),
  http.get(test_url_by_non_existed, () => {
    return HttpResponse.json([]);
  }),
];
