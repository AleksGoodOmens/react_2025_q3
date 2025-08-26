import { toBase64 } from './toBase64';
import { describe, expect, it } from 'vitest';

describe('toBase64', () => {
  it('should return base64 string for valid file', async () => {
    const file = new File(['test'], 'test.txt');
    const result = await toBase64(file);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain('base64');
  });
});
