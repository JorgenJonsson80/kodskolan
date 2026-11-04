import { describe, expect, it } from 'vitest';
import { videoSearchUrl } from '../../../core/resources';
import { resources } from './resources';
import { tracks } from './tracks';

describe('resources', () => {
  it('har resurser till varje bana', () => {
    for (const track of tracks) {
      expect(resources[track.id]?.length).toBeGreaterThan(0);
    }
    expect(Object.keys(resources).sort()).toEqual(tracks.map(t => t.id).sort());
  });

  it('länkar till javascript.info och en YouTube-sökning', () => {
    for (const item of Object.values(resources).flat()) {
      if (item.read)
        expect(item.read).toMatch(/^https:\/\/javascript\.info\/[a-z-]+$/);
      expect(item.video.length).toBeGreaterThan(0);
    }
    expect(videoSearchUrl('javascript reduce')).toBe(
      'https://www.youtube.com/results?search_query=javascript%20reduce',
    );
  });
});
