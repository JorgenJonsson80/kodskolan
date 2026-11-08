import { describe, expect, it } from 'vitest';
import { stages } from '../../../core/stages';
import { TRACKS } from './tracks';

describe('banorna', () => {
  // Figuren har åldrar för alla banor i SPEC.md. Sätt toHaveLength när
  // den sista banan finns.
  it('har en nivå för figuren per bana, plus nybörjaren', () => {
    expect(stages.length).toBeGreaterThanOrEqual(TRACKS.length + 1);
  });

  it('säger vad man kan bygga när banan är klar', () => {
    for (const track of TRACKS) {
      expect(track.canBuild, track.id).toMatch(/^[a-zåäö].*[^.]$/);
    }
  });
});
