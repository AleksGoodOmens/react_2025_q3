import { longListOfMockCountries } from '../mockData/countries.mock';
import { vi } from 'vitest';

vi.mock('@/hooks/useCountries.tsx', () => {
  return {
    useCountries: vi.fn(() => ({
      data: {
        total: longListOfMockCountries.length,
        prev: false,
        next: true,
        page: 1,
        limit: 20,
        countries: longListOfMockCountries,
      },
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    })),
  };
});
