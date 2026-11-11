import { describe, expect, it } from 'vitest';
import { courseCompletion, courseDiplomaDetails } from './completion';

const tracks = [
  { id: 'a', title: 'Första' },
  { id: 'b', title: 'Andra' },
];
const lessons = [
  { id: 'a1', track: 'a' },
  { id: 'a2', track: 'a', isBoss: true },
  { id: 'b1', track: 'b' },
  { id: 'b2', track: 'b', isBoss: true },
];

describe('courseCompletion', () => {
  it('är klar när alla banor är klara', () => {
    expect(courseCompletion(tracks, lessons, ['a1', 'a2']).isComplete).toBe(
      false,
    );
    expect(
      courseCompletion(tracks, lessons, ['a1', 'a2', 'b1', 'b2']).isComplete,
    ).toBe(true);
  });

  it('är inte klar förrän alla planerade banor finns', () => {
    const all = ['a1', 'a2', 'b1', 'b2'];
    const result = courseCompletion(tracks, lessons, all, 3);
    expect(result.isComplete).toBe(false);
    expect(result.moreComing).toBe(true);
    expect(result.total).toBe(3);
    expect(courseCompletion(tracks, lessons, all, 2).isComplete).toBe(true);
  });

  it('räknar en bana man testat sig förbi, när bossen är klar', () => {
    const result = courseCompletion(tracks, lessons, [
      'a1',
      'a2',
      'b-testad',
      'b2',
    ]);
    expect(result.isComplete).toBe(true);
    expect(result.done).toBe(2);
  });

  it('ger det som står på diplomet', () => {
    const completion = courseCompletion(tracks, lessons, []);
    expect(
      courseDiplomaDetails({ name: 'SQL', icon: '🗄️' }, completion),
    ).toEqual({
      title: 'SQL',
      icon: '🗄️',
      parts: ['Första', 'Andra'],
      stage: 2,
    });
  });
});
