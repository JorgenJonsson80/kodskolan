import { describe, expect, it } from 'vitest';
import { SLUG_PATTERN, toSlug } from './profile';

describe('profilens adress', () => {
  it('gör om namn till en giltig adress', () => {
    expect(toSlug('Åsa Öberg')).toBe('asa-oberg');
    expect(toSlug('  Kim  (kodare) 2026! ')).toBe('kim-kodare-2026');
    expect(SLUG_PATTERN.test(toSlug('Åsa Öberg'))).toBe(true);
  });
});
