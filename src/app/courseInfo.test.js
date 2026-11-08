import { describe, expect, it } from 'vitest';
import { COURSE_INFO } from './courseInfo';
import { COURSES } from './courses';

describe('COURSE_INFO', () => {
  it('finns för varje kurs', () => {
    for (const course of COURSES) {
      expect(COURSE_INFO[course.id], course.id).toBeDefined();
    }
  });

  it('har allt sidan om kursen visar', () => {
    for (const [id, info] of Object.entries(COURSE_INFO)) {
      for (const key of [
        'title',
        'description',
        'intro',
        'forWhom',
        'before',
        'example',
      ]) {
        expect(info[key], `${id}.${key}`).toBeTruthy();
      }
    }
  });

  // Google kortar längre beskrivningar i sökresultaten.
  it('har beskrivningar som får plats i sökresultaten', () => {
    for (const [id, info] of Object.entries(COURSE_INFO)) {
      expect(info.description.length, id).toBeLessThanOrEqual(160);
    }
  });
});
