// Skyddar betalbanornas innehåll i bygget (körs av npm run build, före
// vite build). För varje kurs skrivs:
//
// - .content/<kurs>.js – ersätter src/courses/<kurs>/content.js i bygget
//   (pluginen i vite.config.js). Gratisbanorna finns med som vanligt, men
//   betalbanornas övningar och projekt bara som skal: id, titel, bana, xp.
// - public/content/<kurs>-<hash>.bin – resten, gzippat och krypterat med
//   AES-GCM. Nyckeln är HMAC-SHA256(CONTENT_KEY, 'kodskolan-content:' +
//   kursens id), och databasen lämnar bara ut den till den som har tillgång
//   (content_key() i supabase/migrations/_content_key.sql).
//
// Görs bara när VITE_PAYWALL=on och CONTENT_KEY finns (64 hextecken). Annars
// töms .content och bygget får allt innehåll, som förut.
import { createHash, createHmac, randomBytes, webcrypto } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { gzipSync } from 'node:zlib';
import { createServer, loadEnv } from 'vite';

const OUT = '.content';
const PUBLIC = 'public/content';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };

await rm(OUT, { recursive: true, force: true });
await rm(PUBLIC, { recursive: true, force: true });

if (env.VITE_PAYWALL !== 'on') {
  console.log('Betalväggen är av: allt innehåll följer med i bygget.');
  process.exit(0);
}
const secret = env.CONTENT_KEY ?? '';
if (!/^[0-9a-f]{64}$/.test(secret)) {
  const text =
    'VITE_PAYWALL=on men CONTENT_KEY saknas (64 hextecken, se docs/TILLGANG.md). Betalbanornas innehåll följer med oskyddat.';
  // På GitHub ska det inte gå att publicera oskyddat av misstag.
  if (env.CI) throw new Error(text);
  console.warn(`⚠️  ${text}`);
  process.exit(0);
}

const server = await createServer({
  mode: 'production',
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
});

const keyFor = courseId =>
  createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`kodskolan-content:${courseId}`)
    .digest();

async function encrypt(courseId, data) {
  const key = await webcrypto.subtle.importKey(
    'raw',
    keyFor(courseId),
    'AES-GCM',
    false,
    ['encrypt'],
  );
  const iv = randomBytes(12);
  const cipher = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    gzipSync(Buffer.from(JSON.stringify(data))),
  );
  return Buffer.concat([iv, Buffer.from(cipher)]);
}

try {
  const codec = await server.ssrLoadModule('/src/core/lib/contentCodec.js');
  const { FREE_TRACKS } = await server.ssrLoadModule('/src/core/lib/access.js');
  const { COURSES } = await server.ssrLoadModule('/src/app/courses.js');
  await mkdir(OUT, { recursive: true });
  await mkdir(PUBLIC, { recursive: true });

  for (const course of COURSES.filter(item => item.load)) {
    const dir = `/src/courses/${course.id}`;
    if (!existsSync(`.${dir}/content.js`)) {
      throw new Error(`${course.id} saknar content.js`);
    }
    const { meta } = await server.ssrLoadModule(`${dir}/meta.js`);
    const { TRACKS, tracks } = await server.ssrLoadModule(
      `${dir}/data/tracks.js`,
    );
    const content = await server.ssrLoadModule(`${dir}/content.js`);
    const freeTracks = meta.freeTracks ?? FREE_TRACKS;
    const paid = new Set(
      (TRACKS ?? tracks).slice(freeTracks).map(track => track.id),
    );
    const isPaid = item => paid.has(item.track);

    const full = {
      lessons: Object.fromEntries(
        content.LESSONS.filter(isPaid).map(item => [
          item.id,
          codec.withoutFiles(item),
        ]),
      ),
      projects: Object.fromEntries(
        content.PROJECTS.filter(isPaid).map(item => [
          item.id,
          codec.withoutFiles(item),
        ]),
      ),
      projectSteps: Object.fromEntries(
        content.PROJECT_STEPS.filter(isPaid).map(item => [
          item.id,
          codec.withoutFiles(item),
        ]),
      ),
    };
    const open = {
      LESSONS: content.LESSONS.map(item =>
        isPaid(item) ? codec.pick(item, codec.LESSON_STUB) : item,
      ),
      PROJECTS: content.PROJECTS.map(item =>
        isPaid(item) ? codec.projectStub(item) : item,
      ),
      PROJECT_STEPS: content.PROJECT_STEPS.map(item =>
        isPaid(item) ? codec.pick(item, codec.STEP_STUB) : item,
      ),
    };

    const bytes = await encrypt(course.id, codec.encodeContent(full));
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
    const file = `content/${course.id}-${hash}.bin`;
    await writeFile(`public/${file}`, bytes);

    const files = [];
    const json = value =>
      JSON.stringify(codec.hoistFiles(codec.encodeContent(value), files));
    const lessons = json(open.LESSONS);
    const projects = json(open.PROJECTS);
    const steps = json(open.PROJECT_STEPS);
    await writeFile(
      `${OUT}/${course.id}.js`,
      `// Genererad av scripts/content.mjs – ändra inte.
import { decodeContent, restoreFiles } from '/src/core/lib/contentCodec.js';

const FILES = ${JSON.stringify(files)};
const read = value => restoreFiles(decodeContent(value), FILES);

export const LESSONS = read(${lessons});
export const PROJECTS = read(${projects});
export const PROJECT_STEPS = read(${steps});
export const CONTENT_LOCK = {
  courseId: ${JSON.stringify(course.id)},
  url: import.meta.env.BASE_URL + ${JSON.stringify(file)},
};
`,
    );
    console.log(
      `🔒 ${course.id}: ${Object.keys(full.lessons).length} övningar och ${Object.keys(full.projectSteps).length} projektsteg skyddade (${Math.round(bytes.length / 1024)} kB)`,
    );
  }
} finally {
  await server.close();
}
