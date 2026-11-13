import { describe, expect, it } from 'vitest';
import { classReport } from './classes';

describe('lärarvyn', () => {
  it('räknar klara övningar per kurs och veckans aktivitet', () => {
    const report = classReport(
      {
        members: [
          { user_id: 'a', display_name: 'Anna' },
          { user_id: 'b', display_name: 'Bo' },
        ],
        progress: [
          {
            user_id: 'a',
            course_id: 'python',
            completed_ids: ['p1', 'p2', 'gammal'],
          },
          { user_id: 'b', course_id: 'okand', completed_ids: ['x'] },
        ],
        activity: [
          { user_id: 'a', day: '2026-11-13', exercises: 2 },
          { user_id: 'a', day: '2026-11-01', exercises: 5 },
        ],
      },
      { python: { lessons: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }] } },
      '2026-11-13',
    );
    expect(report.courseIds).toEqual(['python']);
    expect(report.students[0]).toMatchObject({
      name: 'Anna',
      courses: { python: { done: 2, total: 3 } },
      week: 2,
      lastDay: '2026-11-13',
    });
    expect(report.students[1]).toMatchObject({
      courses: { python: { done: 0, total: 3 } },
      week: 0,
      lastDay: null,
    });
  });
});
