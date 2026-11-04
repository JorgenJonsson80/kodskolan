import { describe, expect, it } from 'vitest';
import { stages } from '../../../core/stages';
import { TRACKS } from './tracks';

describe('banorna', () => {
  it('har en ålder för figuren per bana, plus bebisen', () => {
    expect(stages).toHaveLength(TRACKS.length + 1);
  });

  it('säger vad man kan bygga när banan är klar', () => {
    for (const track of TRACKS) {
      expect(track.canBuild, track.id).toMatch(/^[a-zåäö].*[^.]$/);
    }
  });
});
