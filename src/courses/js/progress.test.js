import { afterEach, describe, expect, it, vi } from 'vitest';
import course from '.';

// JS Academy sparade klarade quiz under en egen nyckel. Kursen läser dem
// som <bana>-testad, så att de räknas som i de andra kurserna.
describe('JS-kursens gamla framsteg i webbläsaren', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('läser klarade quiz som <bana>-testad', () => {
    vi.stubGlobal('localStorage', {
      getItem: key =>
        key === 'academy-passed-tracks' ? '["js-basics","js-loops"]' : null,
    });
    expect(course.progress.legacyCompleted()).toEqual([
      'js-basics-testad',
      'js-loops-testad',
    ]);
  });

  it('tål skräp under nyckeln', () => {
    vi.stubGlobal('localStorage', { getItem: () => '{"inte":"en lista"}' });
    expect(course.progress.legacyCompleted()).toEqual([]);
  });
});
