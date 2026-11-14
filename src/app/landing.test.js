import { expect, it } from 'vitest';
import { COURSES } from './courses';
import { EXERCISES_TEXT } from './Landing';
import { PATHS } from './paths';

// Startsidan säger "1 300+ övningar". Räkna efter, så att det aldrig
// blir fel åt det hållet.
it('antalet övningar på startsidan stämmer', async () => {
  let total = 0;
  for (const course of COURSES.filter(item => item.summary)) {
    total += (await course.summary()).lessons.length;
  }
  expect(total).toBeGreaterThanOrEqual(
    Number(EXERCISES_TEXT.replace(/\D/g, '')),
  );
});

it('korten i Det här kan du bygga leder till spår som finns', () => {
  for (const id of ['webb', 'data', 'ai']) {
    expect(PATHS.map(path => path.id)).toContain(id);
  }
});
