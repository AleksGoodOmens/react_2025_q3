import {
  longListOfMockCountries,
  mockCountries,
  MockDetailedCountry,
} from './countries.mock';
import { BASE_API_URL } from '@/constants';
import { http, HttpResponse } from 'msw';

import type { ICountry, IDetailedCountry } from '@/interfaces';

const NETWORK_DELAY = 10;

const simulateNetworkDelay = () =>
  new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

const createEndpointHandler = (config: {
  path: string;
  response: ICountry | [] | ICountry[] | IDetailedCountry[];
  errorResponse?: unknown;
  exactMatch?: boolean;
}) => {
  const url = new URL(config.path, BASE_API_URL);

  return http.get(url.href, async () => {
    await simulateNetworkDelay();

    return HttpResponse.json(config.response);
  });
};

export const handlers = [
  createEndpointHandler({
    path: 'v3.1/all',
    response: longListOfMockCountries,
  }),

  createEndpointHandler({
    path: 'v3.1/translation/test',
    response: [mockCountries[0]],
  }),
  createEndpointHandler({
    path: 'v3.1/name/Moldova',
    response: [MockDetailedCountry],
  }),

  createEndpointHandler({
    path: 'v3.1/translation/non_existent_country',
    response: [],
  }),
];
