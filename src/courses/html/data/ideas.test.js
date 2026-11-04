import { describe, expect, it } from 'vitest';
import { IDEAS, ideaStarterCode } from './ideas';
import { videoSearchUrl } from '../../../core/resources';
import { RESOURCES } from './resources';
import { TRACKS } from './tracks';

describe('idéer och resurser', () => {
  it('varje bana har minst två ämnen med länkar', () => {
    for (const track of TRACKS) {
      expect(RESOURCES[track.id]?.length, track.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('varje bana har tre idéer', () => {
    for (const track of TRACKS) {
      expect(
        IDEAS.filter(idea => idea.track === track.id),
        track.id,
      ).toHaveLength(3);
    }
  });

  it('idéerna har mål, extra och unika id', () => {
    for (const idea of IDEAS) {
      expect(idea.goals.length).toBeGreaterThan(0);
      expect(idea.extra).toBeTruthy();
    }
    expect(new Set(IDEAS.map(idea => idea.id)).size).toBe(IDEAS.length);
  });

  it('startkoden visar målen i en kommentar', () => {
    const code = ideaStarterCode({
      emoji: '🏠',
      title: 'Hemsidan',
      goals: ['En `h1` överst.'],
    });
    expect(code).toMatch(/^<!--\n {2}🏠 Hemsidan\n {2}- En h1 överst.\n-->/);
    expect(ideaStarterCode(null)).toContain('<h1>');
  });

  it('länkar till en sökning, inte en enskild video', () => {
    expect(videoSearchUrl('python for loop')).toBe(
      'https://www.youtube.com/results?search_query=python%20for%20loop',
    );
  });
});
