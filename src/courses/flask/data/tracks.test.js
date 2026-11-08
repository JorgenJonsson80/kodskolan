import { describe, expect, it } from 'vitest';
import { stages } from '../../../core/stages';
import { TRACKS } from './tracks';

describe('banorna', () => {
  it('har en nivå för figuren per bana, plus nybörjaren', () => {
    expect(stages.length).toBeGreaterThanOrEqual(TRACKS.length + 1);
  });

  it('säger vad man kan bygga när banan är klar', () => {
    for (const track of TRACKS) {
      expect(track.canBuild, track.id).toMatch(/^[a-zåäö].*[^.]$/);
    }
  });

  it('har unika id och priser', () => {
    expect(new Set(TRACKS.map(track => track.id)).size).toBe(TRACKS.length);
    const prizes = TRACKS.map(track => track.reward.emoji);
    expect(new Set(prizes).size).toBe(prizes.length);
  });
});
