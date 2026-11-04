import { describe, expect, it } from 'vitest';
import { getGrowth, stages, trackProgress } from './stages';

const tracks = [
  { id: 'a', title: 'A', reward: { emoji: '🧸', name: 'Nalle' } },
  { id: 'b', title: 'B', reward: { emoji: '🎒', name: 'Ryggsäck' } },
];
const lessons = [
  { id: 'a1', track: 'a' },
  { id: 'a2', track: 'a', isBoss: true },
  { id: 'b1', track: 'b' },
];

describe('getGrowth', () => {
  it('börjar som bebis', () => {
    const growth = getGrowth(tracks, lessons, []);
    expect(growth.stage.title).toBe('Bebis');
    expect(growth.nextStage.title).toBe('Småbarn');
    expect(growth.currentTrack).toMatchObject({ done: 0, total: 2 });
    expect(growth.rewards).toEqual([]);
  });

  it('växer bara när en hel bana är klar', () => {
    expect(getGrowth(tracks, lessons, ['a1']).stageIndex).toBe(0);
    const growth = getGrowth(tracks, lessons, ['a1', 'a2']);
    expect(growth.stage.title).toBe('Småbarn');
    expect(growth.currentTrack.track.id).toBe('b');
    expect(growth.rewards).toEqual([tracks[0].reward]);
  });

  it('kräver inte övningar som lagts till i efterhand', () => {
    const withExtra = [...lessons, { id: 'a3', track: 'a', addedLater: true }];
    expect(
      trackProgress(tracks[0], withExtra, ['a1', 'a2'], []).isComplete,
    ).toBe(true);
  });

  it('har ingen aktuell bana när allt är klart', () => {
    const growth = getGrowth(tracks, lessons, ['a1', 'a2', 'b1']);
    expect(growth.currentTrack).toBeNull();
  });

  it('stannar på sista åldern om banorna är fler än åldrarna', () => {
    const many = Array.from({ length: stages.length + 2 }, (_, i) => ({
      id: `t${i}`,
      title: `T${i}`,
      reward: { emoji: '⭐', name: 'Stjärna' },
    }));
    const manyLessons = many.map(track => ({ id: track.id, track: track.id }));
    const growth = getGrowth(
      many,
      manyLessons,
      manyLessons.map(lesson => lesson.id),
    );
    expect(growth.stage.title).toBe('Mästare');
    expect(growth.nextStage).toBeNull();
  });
});

describe('trackProgress via quiz och boss', () => {
  it('räknar banan som klar när quizet och bossen är klara', () => {
    const status = trackProgress(tracks[0], lessons, ['a2'], ['a']);
    expect(status).toMatchObject({ isComplete: true, viaTest: true });
  });

  it('kräver bossen även när quizet är klart', () => {
    const status = trackProgress(tracks[0], lessons, [], ['a']);
    expect(status.isComplete).toBe(false);
    expect(status.bossesLeft.map(lesson => lesson.id)).toEqual(['a2']);
  });

  it('räknar en bana utan boss som klar direkt efter quizet', () => {
    const status = trackProgress(tracks[1], lessons, [], ['b']);
    expect(status).toMatchObject({ isComplete: true, viaTest: true });
  });

  it('låter figuren växa av banor klarade via quiz', () => {
    expect(getGrowth(tracks, lessons, ['a2'], ['a']).stage.title).toBe(
      'Småbarn',
    );
  });
});
