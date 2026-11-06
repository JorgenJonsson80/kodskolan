import { readdirSync, readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { beforeEach, describe, expect, it } from 'vitest';

// Kör alla migrationer i ordning i en riktig Postgres (PGlite), med det
// lilla av Supabase som de behöver: auth.users, auth.uid() och rollen
// authenticated. Användaren kör SQL:en själv i Supabase, så den ska vara
// rätt innan dess.
const dir = new URL('./migrations/', import.meta.url);
const migrations = readdirSync(dir)
  .filter(name => name.endsWith('.sql'))
  .sort()
  .map(name => readFileSync(new URL(name, dir), 'utf8'));
const courseProgress = migrations.at(-1);

const SUPABASE = `
  create schema auth;
  create table auth.users (id uuid primary key);
  create function auth.uid() returns uuid language sql stable as
    $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create role authenticated;
  grant usage on schema public, auth to authenticated;
  alter default privileges in schema public
    grant select, insert, update on tables to authenticated;
`;

const ANNA = '00000000-0000-0000-0000-00000000000a';
const BO = '00000000-0000-0000-0000-00000000000b';

let db;

// Kör migrationerna fram till course_progress, med gamla rader i
// akademiernas tabeller.
async function withOldRows(sql) {
  db = new PGlite();
  await db.exec(SUPABASE);
  await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
  for (const migration of migrations.slice(0, -1)) await db.exec(migration);
  await db.exec(sql);
  await db.exec(courseProgress);
}

const rows = async () =>
  (
    await db.query(
      'select user_id, course_id, completed_ids, drafts, project_modes from course_progress order by user_id, course_id',
    )
  ).rows;

describe('course_progress', () => {
  beforeEach(() =>
    withOldRows(`
      insert into py_progress (user_id, completed_ids, drafts, project_modes)
        values ('${ANNA}', '{hej,variabler}', '{"loop":"for"}', '{"granen":"noHints"}');
      insert into html_progress (user_id, completed_ids)
        values ('${ANNA}', '{rubrik}');
      insert into progress (user_id, completed_ids, drafts, passed_track_ids)
        values ('${BO}', '{log}', '{"a":"1"}', '{grunder,loopar}');
    `),
  );

  it('flyttar över varje akademis rader till sin kurs', async () => {
    expect(await rows()).toEqual([
      {
        user_id: ANNA,
        course_id: 'html',
        completed_ids: ['rubrik'],
        drafts: {},
        project_modes: {},
      },
      {
        user_id: ANNA,
        course_id: 'python',
        completed_ids: ['hej', 'variabler'],
        drafts: { loop: 'for' },
        project_modes: { granen: 'noHints' },
      },
      {
        user_id: BO,
        course_id: 'js',
        completed_ids: ['log', 'grunder-testad', 'loopar-testad'],
        drafts: { a: '1' },
        project_modes: {},
      },
    ]);
  });

  it('går att köra igen utan att något tappas', async () => {
    await db.exec(`
      update course_progress set completed_ids = '{hej,ny}', drafts = '{"loop":"while"}'
        where course_id = 'python';
      update py_progress set completed_ids = '{hej,variabler,senare}';
    `);
    await db.exec(courseProgress);
    const [, python] = await rows();
    expect([...python.completed_ids].sort()).toEqual([
      'hej',
      'ny',
      'senare',
      'variabler',
    ]);
    // Det som sparats i Kodskolan vinner över det gamla utkastet.
    expect(python.drafts).toEqual({ loop: 'while' });
  });

  it('låter bara en inloggad läsa och ändra sina egna rader', async () => {
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub = '${BO}'`,
    );
    const seen = await db.query('select course_id from course_progress');
    expect(seen.rows).toEqual([{ course_id: 'js' }]);

    await db.exec(
      `insert into course_progress (user_id, course_id) values ('${BO}', 'python')`,
    );
    await expect(
      db.exec(
        `insert into course_progress (user_id, course_id) values ('${ANNA}', 'js')`,
      ),
    ).rejects.toThrow(/row-level security/);
    const changed = await db.query(
      `update course_progress set completed_ids = '{}' where user_id = '${ANNA}' returning 1`,
    );
    expect(changed.rows).toEqual([]);
  });
});
