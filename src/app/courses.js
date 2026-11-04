import { meta as html } from '../courses/html/meta';
import { meta as js } from '../courses/js/meta';
import { meta as python } from '../courses/python/meta';

// Alla kurser i ordning. load() hämtar kursen först när den öppnas, så
// att startsidan inte laddar Python eller något annat språk.
// href: en kurs som inte flyttat in än och ligger kvar på sin gamla sajt.
export const COURSES = [
  { ...python, load: () => import('../courses/python') },
  { ...html, load: () => import('../courses/html') },
  { ...js, load: () => import('../courses/js') },
];

// Kursen som adressen pekar på, t.ex. /kodskolan/python, eller null för
// startsidan.
export function courseFromPath(pathname, base = import.meta.env.BASE_URL) {
  const rest = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, '');
  const id = rest.split('/')[0];
  return COURSES.find(course => course.id === id && course.load) ?? null;
}
