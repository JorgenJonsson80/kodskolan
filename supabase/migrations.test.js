import { readdirSync, readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { beforeEach, describe, expect, it } from 'vitest';

// Kör alla migrationer i ordning i en riktig Postgres (PGlite), med det
// lilla av Supabase som de behöver: auth.users, auth.uid() och rollen
// authenticated. Användaren kör SQL:en själv i Supabase, så den ska vara
// rätt innan dess.
const dir = new URL('./migrations/', import.meta.url);
const files = readdirSync(dir)
  .filter(name => name.endsWith('.sql'))
  .sort();
const migrations = files.map(name => readFileSync(new URL(name, dir), 'utf8'));
const indexOf = suffix => files.findIndex(name => name.endsWith(suffix));
const courseProgress = migrations[indexOf('_course_progress.sql')];

const SUPABASE = `
  create schema auth;
  create table auth.users (id uuid primary key);
  create function auth.uid() returns uuid language sql stable as
    $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create role authenticated;
  create role anon;
  grant usage on schema public, auth to authenticated, anon;
  alter default privileges in schema public
    grant select, insert, update on tables to authenticated, anon;
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
  for (const migration of migrations.slice(
    0,
    indexOf('_course_progress.sql'),
  )) {
    await db.exec(migration);
  }
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

describe('diplomas', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
  });

  const as = user =>
    db.exec(
      `reset role; set role authenticated; set request.jwt.claim.sub = '${user}'`,
    );

  const issue = async (subject, name) =>
    (
      await db.query(
        `select public.issue_diploma('course', '${subject}', '${name}', '{"tracks": 13}') as code`,
      )
    ).rows[0].code;

  it('ger ett diplom med en kod som vem som helst kan slå upp', async () => {
    await as(ANNA);
    const code = await issue('sql', ' Anna Andersson ');
    expect(code).toMatch(/^[0-9A-F]{10}$/);
    await db.exec('reset role; set role anon');
    const { rows } = await db.query(
      `select kind, subject, name, details from public.diploma('${code.toLowerCase()}')`,
    );
    expect(rows).toEqual([
      {
        kind: 'course',
        subject: 'sql',
        name: 'Anna Andersson',
        details: { tracks: 13 },
      },
    ]);
  });

  it('behåller koden när namnet ändras', async () => {
    await as(ANNA);
    const first = await issue('sql', 'Anna');
    const again = await issue('sql', 'Anna Andersson');
    expect(again).toBe(first);
  });

  it('låter ingen lista eller skapa andras diplom', async () => {
    await as(ANNA);
    await issue('sql', 'Anna');
    await as(BO);
    await issue('flask', 'Bo');
    const seen = await db.query('select subject from diplomas');
    expect(seen.rows).toEqual([{ subject: 'flask' }]);
    await expect(
      db.exec(
        `insert into diplomas (user_id, kind, subject, name) values ('${BO}', 'course', 'ts', 'Bo')`,
      ),
    ).rejects.toThrow();
    await db.exec('reset role; set role anon');
    // Som i Supabase får anon läsa tabellen, men RLS visar inga rader.
    expect((await db.query('select * from diplomas')).rows).toEqual([]);
    await expect(
      db.query(`select public.issue_diploma('course', 'js', 'X')`),
    ).rejects.toThrow();
  });

  it('kräver ett namn', async () => {
    await as(ANNA);
    await expect(issue('sql', '  ')).rejects.toThrow();
  });
});
