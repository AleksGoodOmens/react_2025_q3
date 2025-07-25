import { getCountries } from './CountryAPI';
import { server } from '@/__test__';
import { BASE_API_URL } from '@/constants';
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
import z from 'zod';

describe.skip('CountryAPI', () => {
  let consoleSpy: MockInstance;
  beforeAll(() => {
    localStorage.clear();
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });
  it('should handle errors for', async () => {
    const url = new URL('all', BASE_API_URL);

    server.use(
      http.get(url.href, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );

    await expect(getCountries()).rejects.toThrow('Internal Server Error');
    expect(consoleSpy).toHaveBeenCalledWith(
      'CountryService failed:',
      expect.any(Error)
    );
  });
  it('should handle errors for incorrect data object', async () => {
    const url = new URL('all', BASE_API_URL);

    server.use(
      http.get(url.href, () => {
        return new HttpResponse([], {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );

    await expect(getCountries()).rejects.toThrow('Internal Server Error');
    expect(consoleSpy).toHaveBeenCalledWith(
      'CountryService failed:',
      expect.any(Error)
    );
  });
  it('should throw "Invalid data format" when data fails Zod validation', async () => {
    const invalidData = {
      name: { common: 123 },
      flags: { png: true },
      area: 'not a number',
    };

    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return HttpResponse.json([invalidData]);
      })
    );

    await expect(getCountries()).rejects.toThrow('Invalid data format');

    const consoleSpy = vi.spyOn(console, 'error');
    await expect(getCountries()).rejects.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Validation error:',
      expect.any(z.ZodError)
    );
    consoleSpy.mockRestore();
  });
});
