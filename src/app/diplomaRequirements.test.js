import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { expect, it } from 'vitest';
import { COURSES } from './courses';
import { PATHS } from './paths';

// Bossarna som krävs för ett diplom står i databasen (diploma_requirements,
// se migrationen _diploma_check.sql). Testet bygger SQL:en från kursernas
// banor och jämför med supabase/diploma_requirements.sql. Får en kurs nya
// bossar: kör UPDATE_DIPLOMAS=1 npx vitest run src/app/diplomaRequirements.test.js
// och sedan filen i Supabase.
const FILE = new URL(
  '../../supabase/diploma_requirements.sql',
  import.meta.url,
);

async function bossesByCourse() {
  const entries = await Promise.all(
    COURSES.filter(course => course.summary).map(async course => {
      const { lessons } = await course.summary();
      const bosses = lessons
        .filter(lesson => lesson.isBoss && !lesson.addedLater)
        .map(lesson => lesson.id);
      return [course.id, bosses];
    }),
  );
  return Object.fromEntries(entries);
}

const row = (kind, subject, courseId, ids) =>
  `  ('${kind}', '${subject}', '${courseId}', array[${ids.map(id => `'${id}'`).join(', ')}]::text[])`;

async function requirementsSql() {
  const bosses = await bossesByCourse();
  const rows = [
    ...Object.entries(bosses).map(([id, ids]) => row('course', id, id, ids)),
    ...PATHS.flatMap(path =>
      path.courses.map(id => row('path', path.id, id, bosses[id])),
    ),
  ];
  return `-- Bossarna som krävs för varje diplom. Genereras av
-- src/app/diplomaRequirements.test.js – ändra inte för hand. Kör hela
-- filen i Supabase efter migrationen _diploma_check.sql, och igen när en
-- kurs fått nya bossar.
begin;
delete from public.diploma_requirements;
insert into public.diploma_requirements (kind, subject, course_id, lesson_ids) values
${rows.join(',\n')};
commit;
`;
}

it('kraven för diplomen stämmer med kursernas bossar', async () => {
  const sql = await requirementsSql();
  if (process.env.UPDATE_DIPLOMAS) writeFileSync(FILE, sql);
  expect(readFileSync(FILE, 'utf8')).toBe(sql);
});

it('varje kurs och spår har bossar', async () => {
  const bosses = await bossesByCourse();
  for (const [id, ids] of Object.entries(bosses)) {
    expect(ids.length, id).toBeGreaterThan(0);
  }
  for (const path of PATHS) {
    for (const id of path.courses) expect(bosses[id], id).toBeDefined();
  }
});
