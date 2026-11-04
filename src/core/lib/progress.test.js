import { describe, expect, it } from 'vitest';
import { mergeCompleted, mergeDrafts } from './progress';

describe('mergeCompleted', () => {
  it('behåller övningar från båda ställena, utan dubbletter', () => {
    expect(mergeCompleted(['a', 'b'], ['b', 'c'])).toEqual(['b', 'c', 'a']);
  });

  it('klarar att inget är sparat i kontot', () => {
    expect(mergeCompleted(['a'], null)).toEqual(['a']);
  });
});

describe('mergeDrafts', () => {
  it('låter koden i webbläsaren vinna för samma övning', () => {
    expect(mergeDrafts({ a: 'ny' }, { a: 'gammal', b: 'sparad' })).toEqual({
      a: 'ny',
      b: 'sparad',
    });
  });

  it('ignorerar konstiga värden från kontot', () => {
    expect(mergeDrafts({ a: 'x' }, null)).toEqual({ a: 'x' });
    expect(mergeDrafts({ a: 'x' }, ['fel'])).toEqual({ a: 'x' });
  });
});
