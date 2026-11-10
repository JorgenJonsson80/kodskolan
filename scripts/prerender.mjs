// Körs efter vite build (npm run build). Skriver en index.html per adress
// med egen titel, beskrivning och innehåll, och sitemap.xml och robots.txt.
// Sidorna ritas med samma React-komponenter som i webbläsaren, via Vite.
//
// VITE_SITE_URL är sajtens adress utan snedstreck sist, VITE_BASE sökvägen
// appen ligger under (se vite.config.js). Med en egen domän blir de t.ex.
// https://kodskolan.nu och /.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

const BASE = process.env.VITE_BASE || '/kodskolan/';
const SITE = (
  process.env.VITE_SITE_URL || 'https://jorgenjonsson80.github.io/kodskolan'
).replace(/\/$/, '');
const DIST = 'dist';

const escape = text =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function head(page) {
  const url = `${SITE}/${page.path}`;
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    page.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:site_name" content="Kodskolan" />',
    '<meta property="og:locale" content="sv_SE" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ];
  if (page.course) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: page.course.name,
      description: page.course.description,
      inLanguage: 'sv',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'Kodskolan', url: `${SITE}/` },
    };
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`,
    );
  }
  return tags.join('\n    ');
}

const template = await readFile(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<title>Kodskolan</title>')) {
  throw new Error('Hittar inte <title>Kodskolan</title> i dist/index.html');
}
const fill = page =>
  template
    .replace('<title>Kodskolan</title>', head(page))
    .replace(
      '<div id="root"></div>',
      `<div id="root">${page.html ?? ''}</div>`,
    );

const server = await createServer({
  base: BASE,
  mode: 'production',
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
});
let pages;
try {
  const { prerenderPages } = await server.ssrLoadModule(
    '/src/app/prerender.jsx',
  );
  pages = await prerenderPages();
} finally {
  await server.close();
}

for (const page of pages) {
  const file = join(DIST, page.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, fill(page));
}
// Allt annat (diplomen, gamla länkar) startar appen från 404.html, som
// sökmotorerna inte ska ta med.
await writeFile(
  join(DIST, '404.html'),
  fill({
    path: '',
    title: 'Kodskolan',
    description: 'Lär dig programmera på svenska.',
    noindex: true,
  }),
);

const urls = pages
  .filter(page => page.sitemap)
  .map(page => `${SITE}/${page.path}`);
await writeFile(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`,
);
await writeFile(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);
console.log(`Färdiga sidor: ${pages.length}, i sitemap: ${urls.length}`);
