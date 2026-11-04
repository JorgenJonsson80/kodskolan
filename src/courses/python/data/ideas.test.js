import { describe, expect, it } from 'vitest';
import { IDEAS, ideaStarterCode } from './ideas';
import { videoSearchUrl } from '../../../core/resources';
import { RESOURCES } from './resources';
import { TRACKS } from './tracks';

describe('idéer och resurser', () => {
  it('varje bana har tre idéer och minst två ämnen med länkar', () => {
    for (const track of TRACKS) {
      expect(
        IDEAS.filter(idea => idea.track === track.id),
        track.id,
      ).toHaveLength(3);
      expect(RESOURCES[track.id]?.length, track.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('idéerna har mål, extra och unika id', () => {
    for (const idea of IDEAS) {
      expect(idea.goals.length).toBeGreaterThan(0);
      expect(idea.extra).toBeTruthy();
    }
    expect(new Set(IDEAS.map(idea => idea.id)).size).toBe(IDEAS.length);
  });

  it('startkoden visar målen som kommentarer', () => {
    const code = ideaStarterCode(IDEAS[0]);
    expect(
      code.split('\n').every(line => line === '' || line.startsWith('#')),
    ).toBe(true);
    expect(ideaStarterCode(null)).toContain('input(');
  });

  it('länkar till en sökning, inte en enskild video', () => {
    expect(videoSearchUrl('python for loop')).toBe(
      'https://www.youtube.com/results?search_query=python%20for%20loop',
    );
  });
});
