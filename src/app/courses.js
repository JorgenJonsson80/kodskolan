import { meta as ai } from '../courses/ai/meta';
import { meta as fastapi } from '../courses/fastapi/meta';
import { meta as flask } from '../courses/flask/meta';
import { meta as fullstack } from '../courses/fullstack/meta';
import { meta as html } from '../courses/html/meta';
import { meta as js } from '../courses/js/meta';
import { meta as python } from '../courses/python/meta';
import { meta as sql } from '../courses/sql/meta';
import { meta as ts } from '../courses/ts/meta';

// Alla kurser i ordning. load() hämtar kursen först när den öppnas, så
// att startsidan inte laddar Python eller något annat språk.
// href: en kurs som inte flyttat in än och ligger kvar på sin gamla sajt.
// summary() hämtar bara banorna och övningarna (spåren och diplomen).
export const COURSES = [
  {
    ...python,
    load: () => import('../courses/python'),
    summary: () => import('../courses/python/summary'),
  },
  {
    ...html,
    load: () => import('../courses/html'),
    summary: () => import('../courses/html/summary'),
  },
  {
    ...js,
    load: () => import('../courses/js'),
    summary: () => import('../courses/js/summary'),
  },
  {
    ...sql,
    load: () => import('../courses/sql'),
    summary: () => import('../courses/sql/summary'),
  },
  {
    ...ts,
    load: () => import('../courses/ts'),
    summary: () => import('../courses/ts/summary'),
  },
  {
    ...flask,
    load: () => import('../courses/flask'),
    summary: () => import('../courses/flask/summary'),
  },
  {
    ...fullstack,
    load: () => import('../courses/fullstack'),
    summary: () => import('../courses/fullstack/summary'),
  },
  {
    ...fastapi,
    load: () => import('../courses/fastapi'),
    summary: () => import('../courses/fastapi/summary'),
  },
  {
    ...ai,
    load: () => import('../courses/ai'),
    summary: () => import('../courses/ai/summary'),
  },
];

// Delarna i adressen efter sajtens bas, t.ex. ['diplom', '7F3A2C91E4'].
export function pathParts(pathname, base = import.meta.env.BASE_URL) {
  const rest = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, '');
  return rest.split('/').filter(Boolean);
}

const firstPart = (pathname, base) => pathParts(pathname, base)[0];

// Kursen som adressen pekar på, t.ex. /kodskolan/python, eller null för
// startsidan.
export function courseFromPath(pathname, base = import.meta.env.BASE_URL) {
  const id = firstPart(pathname, base);
  return COURSES.find(course => course.id === id && course.load) ?? null;
}
