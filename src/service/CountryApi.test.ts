import { getCountries, getCountry } from './CountryAPI';
import { server } from '@/__test__';
import { MockDetailedCountry } from '@/__test__/mockData/countries.mock';
import { BASE_API_URL } from '@/constants';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

describe('API functions with MSW', () => {
  it('getCountries returns paginated list', async () => {
    const result = await getCountries({ limit: 2, page: 1, search: 'all' });

    expect(result.countries).toHaveLength(2);
    expect(result.page).toBe(1);
    expect(result.prev).toBe(false);
    expect(result.next).toBe(true);

    expect(result.countries[0].name).toBeDefined();
  });

  it('getCountries handles 404 error', async () => {
    server.use(
      http.get(
        new URL('v3.1/translation/unknown', BASE_API_URL).href,
        async () => {
          return HttpResponse.json({ message: 'not found' }, { status: 404 });
        }
      )
    );

    await expect(
      getCountries({ limit: 5, page: 1, search: 'unknown' })
    ).rejects.toThrow('no country with provided name "unknown" found');
  });

  it('getCountry returns detailed info', async () => {
    const result = await getCountry('test');

    expect(result.name?.official).toBe(MockDetailedCountry.name.official);
    expect(result.region).toBe(MockDetailedCountry.region);
    expect(result.capital[0]).toBe(MockDetailedCountry.capital[0]);
  });

  it('getCountry handles 404 error', async () => {
    server.use(
      http.get(`${BASE_API_URL}v3.1/name/unknown`, () => {
        return HttpResponse.json({ message: 'not found' }, { status: 404 });
      })
    );

    await expect(getCountry('unknown')).rejects.toThrow(
      'No country data received'
    );
  });

  it('getCountry handles invalid data format', async () => {
    server.use(
      http.get(`${BASE_API_URL}v3.1/name/broken`, () => {
        return HttpResponse.json([{ invalid: 'data' }]);
      })
    );

    await expect(getCountry('broken')).rejects.toThrow(/Invalid data format/);
  });
});
