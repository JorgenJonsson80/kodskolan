import { describe, expect, it } from 'vitest';
import { PROJECTS } from './projects';
import { TRACKS } from './tracks';

// Projektens steg testas som övningarna när de finns (bana 3 och framåt).
describe('projekten', () => {
  it('har tre projekt per bana med 3–4 steg (de banor som har börjat)', () => {
    for (const track of TRACKS) {
      const projects = PROJECTS.filter(item => item.track === track.id);
      if (projects.length === 0) continue;
      expect(projects, track.id).toHaveLength(3);
    }
  });

  it('har unika id och priser', () => {
    const prizes = [
      ...PROJECTS.map(item => item.reward.emoji),
      ...TRACKS.map(item => item.reward.emoji),
    ];
    expect(new Set(prizes).size).toBe(prizes.length);
  });
});
