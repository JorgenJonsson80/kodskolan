import { describe, expect, it } from 'vitest';
import { IDEAS, ideaStarterCode } from './ideas';
import { PROJECTS } from './projects';
import { RESOURCES } from './resources';
import { TRACKS } from './tracks';

describe('idéerna', () => {
  it('har tre idéer per bana som har projekt', () => {
    for (const track of TRACKS) {
      if (!PROJECTS.some(project => project.track === track.id)) continue;
      expect(
        IDEAS.filter(idea => idea.track === track.id),
        track.id,
      ).toHaveLength(3);
    }
  });

  it('har unika id och tre mål', () => {
    expect(new Set(IDEAS.map(idea => idea.id)).size).toBe(IDEAS.length);
    for (const idea of IDEAS) expect(idea.goals.length, idea.id).toBe(3);
  });

  it('startkoden börjar med målen som kommentarer', () => {
    for (const idea of IDEAS) {
      const lines = ideaStarterCode(idea).split('\n');
      expect(lines.slice(0, 4).every(line => line.startsWith('#'))).toBe(true);
    }
  });

  it('har minst två länkar i Fastnat? per bana med projekt', () => {
    for (const track of TRACKS) {
      if (!PROJECTS.some(project => project.track === track.id)) continue;
      expect(RESOURCES[track.id]?.length ?? 0, track.id).toBeGreaterThanOrEqual(
        2,
      );
    }
  });
});
