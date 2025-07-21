import { getCountry } from './CountryAPI';
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

describe('CountryAPI', () => {
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
        return new HttpResponse([], {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );

    await expect(getCountry()).rejects.toThrow('Internal Server Error');
    expect(consoleSpy).toHaveBeenCalledWith(
      'CountryService failed:',
      expect.any(Error)
    );
  });
});
