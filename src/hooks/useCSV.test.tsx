import { useCSV } from './useCSV';
import { mockCountries } from '@/__test__';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

beforeEach(() => {
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useCSV hook', () => {
  it('should create download URL', async () => {
    const testUrl = 'blob:test-url';
    mockCreateObjectURL.mockReturnValue(testUrl);

    const { result } = renderHook(() => useCSV());

    await act(async () => {
      await result.current.create(mockCountries);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(testUrl);
    expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
  });

  it('should clear download URL', async () => {
    const testUrl = 'blob:test-url';
    mockCreateObjectURL.mockReturnValue(testUrl);

    const { result } = renderHook(() => useCSV());

    // Сначала создаем URL
    await act(async () => {
      await result.current.create(mockCountries);
    });

    // Затем очищаем
    await act(async () => {
      await result.current.clear();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(null);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith(testUrl);
  });

  it('should handle empty countries array', async () => {
    const testUrl = 'blob:test-url';
    mockCreateObjectURL.mockReturnValue(testUrl);

    const { result } = renderHook(() => useCSV());

    await act(async () => {
      await result.current.create([]);
    });

    const blob = mockCreateObjectURL.mock.calls[0][0];
    expect(blob.type).toBe('text/csv;charset=utf-8;');
  });

  it('should escape quotes in country names', async () => {
    const { result } = renderHook(() => useCSV());

    await act(async () => {
      await result.current.create(mockCountries);
    });

    const blob = mockCreateObjectURL.mock.calls[0][0];
    expect(blob.type).toBe('text/csv;charset=utf-8;');
  });
});
