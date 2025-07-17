// src/service/CountryAPI.test.ts

import { getAllCountries } from './CountryAPI';
import { server } from '@/__test__';
import { http, HttpResponse } from 'msw';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';

describe('CountryAPI', () => {
  let consoleSpy: MockInstance;
  beforeAll(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });
  it('should handle errors for getAllCountries', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );

    await expect(getAllCountries()).rejects.toThrow('HTTP error! status: 500');
    expect(consoleSpy).toHaveBeenCalledWith(
      'CountryService failed:',
      expect.any(Error)
    );
  });
});
