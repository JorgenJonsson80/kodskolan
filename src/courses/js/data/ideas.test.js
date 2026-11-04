import { describe, expect, it } from 'vitest';
import { ideaStarterCode, ideas } from './ideas';
import { projects } from './projects';
import { tracks } from './tracks';

describe('ideas', () => {
  it('ger tre idéer till varje bana som har projekt', () => {
    const projectTracks = [...new Set(projects.map(item => item.track))];
    for (const trackId of projectTracks) {
      expect(ideas.filter(idea => idea.track === trackId)).toHaveLength(3);
    }
    expect([...new Set(ideas.map(idea => idea.track))]).toEqual(projectTracks);
  });

  it('har unika id:n och riktiga banor', () => {
    expect(new Set(ideas.map(idea => idea.id)).size).toBe(ideas.length);
    for (const idea of ideas) {
      expect(tracks.some(track => track.id === idea.track)).toBe(true);
      expect(idea.goals.length).toBeGreaterThan(0);
    }
  });

  it('lägger målen som kommentarer i startkoden', () => {
    const code = ideaStarterCode(ideas[0]);
    expect(code).toContain(`// 1. ${ideas[0].goals[0]}`);
    expect(code).toContain('// Extra:');
  });
});
