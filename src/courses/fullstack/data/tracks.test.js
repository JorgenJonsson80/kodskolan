import { describe, expect, it } from 'vitest';
import { stages } from '../../../core/stages';
import { QUIZ } from './quiz';
import { RESOURCES } from './resources';
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

  it('har fyra quizfrågor och minst två ämnen att läsa om', () => {
    for (const track of TRACKS) {
      expect(QUIZ[track.id], track.id).toHaveLength(4);
      expect(RESOURCES[track.id].length, track.id).toBeGreaterThanOrEqual(2);
      for (const question of QUIZ[track.id]) {
        expect(new Set(question.options).size).toBe(question.options.length);
      }
    }
  });
});
