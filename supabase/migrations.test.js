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

describe('delete_my_account', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
    await db.exec(`
      insert into course_progress (user_id, course_id, completed_ids)
        values ('${ANNA}', 'python', '{hej}'), ('${BO}', 'python', '{hej}');
      insert into diplomas (user_id, kind, subject, name)
        values ('${ANNA}', 'course', 'sql', 'Anna'), ('${BO}', 'course', 'sql', 'Bo');
    `);
  });

  const count = async (table, user) =>
    (
      await db.query(
        `select count(*)::int as n from ${table} where ${table === 'auth.users' ? 'id' : 'user_id'} = '${user}'`,
      )
    ).rows[0].n;

  it('raderar den som anropar och allt som hör till kontot', async () => {
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub = '${ANNA}'`,
    );
    await db.query('select public.delete_my_account()');
    await db.exec('reset role');
    for (const table of ['auth.users', 'course_progress', 'diplomas']) {
      expect(await count(table, ANNA), table).toBe(0);
      expect(await count(table, BO), table).toBe(1);
    }
  });

  it('går inte att anropa utan inloggning', async () => {
    await db.exec('set role anon');
    await expect(
      db.query('select public.delete_my_account()'),
    ).rejects.toThrow();
    await db.exec(
      "reset role; set role authenticated; set request.jwt.claim.sub = ''",
    );
    await expect(db.query('select public.delete_my_account()')).rejects.toThrow(
      /Inte inloggad/,
    );
    await db.exec('reset role');
    expect(await count('auth.users', ANNA)).toBe(1);
  });
});

describe('tillgång', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
    await db.exec(`
      insert into access_codes (code, days, max_uses) values ('TESTA', 30, 1);
      insert into access_codes (code, course_id) values ('PYTHON', 'python');
      insert into access_codes (code, redeem_by) values ('GAMMAL', now() - interval '1 day');
    `);
  });

  const as = user =>
    db.exec(
      `reset role; set role authenticated; set request.jwt.claim.sub = '${user}'`,
    );
  const redeem = async code =>
    (await db.query(`select * from public.redeem_access_code('${code}')`))
      .rows[0];
  const myAccess = async () =>
    (await db.query('select course_id from public.my_access() order by 1'))
      .rows;
  const hasAccess = async course =>
    (await db.query(`select public.has_access('${course}') as ok`)).rows[0].ok;

  it('ger tillgång i så många dagar som koden säger', async () => {
    await as(ANNA);
    expect(await myAccess()).toEqual([]);
    const { course_id, valid_until } = await redeem(' testa ');
    expect(course_id).toBe('*');
    const days = (new Date(valid_until) - Date.now()) / 86_400_000;
    expect(days).toBeGreaterThan(29.9);
    expect(days).toBeLessThan(30.1);
    expect(await myAccess()).toEqual([{ course_id: '*' }]);
    expect(await hasAccess('sql')).toBe(true);
  });

  it('en kod för en kurs ger bara den kursen, för alltid', async () => {
    await as(BO);
    const { valid_until } = await redeem('PYTHON');
    expect(valid_until).toBeNull();
    expect(await hasAccess('python')).toBe(true);
    expect(await hasAccess('sql')).toBe(false);
  });

  it('tillgången slutar gälla efter sista dagen', async () => {
    await as(ANNA);
    await redeem('TESTA');
    await db.exec(
      `reset role; update entitlements set valid_until = now() - interval '1 second'`,
    );
    await as(ANNA);
    expect(await myAccess()).toEqual([]);
  });

  it('säger ifrån när koden inte går att använda', async () => {
    await as(ANNA);
    await expect(redeem('FINNSINTE')).rejects.toThrow(/finns inte/);
    await expect(redeem('GAMMAL')).rejects.toThrow(/gått ut/);
    await redeem('TESTA');
    await expect(redeem('TESTA')).rejects.toThrow(/redan använt/);
    await as(BO);
    await expect(redeem('TESTA')).rejects.toThrow(/så många/);
    expect(await myAccess()).toEqual([]);
  });

  it('en admin har tillgång till allt', async () => {
    await db.exec(`insert into admins values ('${BO}')`);
    await as(BO);
    expect(await myAccess()).toEqual([{ course_id: '*' }]);
    await as(ANNA);
    expect(await myAccess()).toEqual([]);
  });

  it('ingen kan ge sig själv tillgång eller se andras', async () => {
    await as(ANNA);
    await redeem('PYTHON');
    await as(BO);
    expect((await db.query('select * from entitlements')).rows).toEqual([]);
    for (const sql of [
      `insert into entitlements (user_id, course_id, source) values ('${BO}', '*', 'manual')`,
      `insert into admins values ('${BO}')`,
      `insert into access_codes (code) values ('EGEN')`,
    ]) {
      await expect(db.exec(sql), sql).rejects.toThrow();
    }
    expect((await db.query('select * from access_codes')).rows).toEqual([]);
    await db.exec('reset role; set role anon');
    await expect(redeem('PYTHON')).rejects.toThrow();
  });

  it('försvinner med kontot', async () => {
    await as(ANNA);
    await redeem('TESTA');
    await db.query('select public.delete_my_account()');
    await db.exec('reset role');
    const left = await db.query(
      'select (select count(*) from entitlements)::int + (select count(*) from code_redemptions)::int as n',
    );
    expect(left.rows[0].n).toBe(0);
  });
});

describe('lesson_feedback', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
  });

  const as = user =>
    db.exec(
      user
        ? `reset role; set role authenticated; set request.jwt.claim.sub = '${user}'`
        : `reset role; set role anon; set request.jwt.claim.sub = ''`,
    );
  const send = (message = 'Testet godkänner fel svar', extra = '') =>
    db.exec(
      `insert into lesson_feedback (course_id, lesson_id, kind, message${extra ? ', user_id' : ''}) values ('data', 'da-01', 'fel', '${message}'${extra ? `, '${extra}'` : ''})`,
    );

  it('vem som helst kan skicka, men ingen kan läsa andras', async () => {
    await as(null);
    await send();
    await as(ANNA);
    await send();
    expect(
      (await db.query('select user_id from lesson_feedback')).rows,
    ).toEqual([{ user_id: ANNA }]);
    await as(BO);
    expect((await db.query('select * from lesson_feedback')).rows).toEqual([]);
    await db.exec('reset role');
    expect(
      (await db.query('select count(*)::int as n from lesson_feedback')).rows[0]
        .n,
    ).toBe(2);
  });

  it('går inte att skicka i någon annans namn eller tomt', async () => {
    await as(BO);
    await expect(send('Hej', ANNA)).rejects.toThrow();
    await expect(send('   ')).rejects.toThrow();
    await as(null);
    await expect(send('Hej', ANNA)).rejects.toThrow();
  });

  it('raderas med kontot', async () => {
    await as(ANNA);
    await send();
    await db.query('select public.delete_my_account()');
    await db.exec('reset role');
    expect(
      (await db.query('select count(*)::int as n from lesson_feedback')).rows[0]
        .n,
    ).toBe(0);
  });
});

describe('grant_purchase', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
  });

  it('ger tillgång till allt för alltid, en gång per köp', async () => {
    await db.query(`select public.grant_purchase('${ANNA}', 'cs_test_1')`);
    await db.query(`select public.grant_purchase('${ANNA}', 'cs_test_1')`);
    const { rows } = await db.query(
      'select user_id, course_id, valid_until, source from entitlements',
    );
    expect(rows).toEqual([
      { user_id: ANNA, course_id: '*', valid_until: null, source: 'stripe' },
    ]);
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub = '${ANNA}'`,
    );
    expect(
      (await db.query(`select public.has_access('sql') as ok`)).rows[0].ok,
    ).toBe(true);
  });

  it('kan inte anropas av elever', async () => {
    for (const role of ['anon', 'authenticated']) {
      await db.exec(
        `reset role; set role ${role}; set request.jwt.claim.sub = '${BO}'`,
      );
      await expect(
        db.query(`select public.grant_purchase('${BO}', 'cs_fusk')`),
      ).rejects.toThrow();
    }
  });
});

describe('use_tutor_question', () => {
  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SUPABASE);
    await db.exec(`insert into auth.users values ('${ANNA}'), ('${BO}')`);
    for (const migration of migrations) await db.exec(migration);
    await db.query(`select public.grant_purchase('${ANNA}', 'cs_1')`);
  });

  const ask = async (user, limit = 2) => {
    await db.exec(
      `reset role; set role authenticated; set request.jwt.claim.sub = '${user}'`,
    );
    return (
      await db.query(
        `select public.use_tutor_question('sql', ${limit}) as kvar`,
      )
    ).rows[0].kvar;
  };

  it('räknar ner dagens frågor för den som har tillgång', async () => {
    expect(await ask(ANNA)).toBe(1);
    expect(await ask(ANNA)).toBe(0);
    await expect(ask(ANNA)).rejects.toThrow(/slut/);
  });

  it('kräver full tillgång och inloggning', async () => {
    await expect(ask(BO)).rejects.toThrow(/full tillgång/);
    await db.exec('reset role; set role anon');
    await expect(
      db.query(`select public.use_tutor_question('sql')`),
    ).rejects.toThrow();
  });
});
