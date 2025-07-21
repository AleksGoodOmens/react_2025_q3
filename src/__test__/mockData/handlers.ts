import { mockCountries } from './countries.mock';
import { BASE_API_URL } from '@/constants';
import { http, HttpResponse } from 'msw';

const NETWORK_DELAY = 10;
export const test_base_url = `${BASE_API_URL}all`;
export const test_url_by_name = `${BASE_API_URL}translation/test`;
export const test_url_by_non_existed = `${BASE_API_URL}translation/non_existent_country`;
export const handlers = [
  http.get(test_base_url, async () => {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

    return HttpResponse.json(mockCountries);
  }),

  http.get(test_url_by_name, async () => {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

    return HttpResponse.json([mockCountries[0]]);
  }),
  http.get(test_url_by_non_existed, async () => {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

    return HttpResponse.json([]);
  }),
];
