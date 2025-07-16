// src/service/CountryAPI.test.ts

import { server } from '@/__test__';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { getAllCountries } from './CountryAPI';

describe('CountryAPI', () => {
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
  });
});
