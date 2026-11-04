import { meta as python } from '../courses/python/meta';

// Alla kurser i ordning. load() hämtar kursen först när den öppnas, så
// att startsidan inte laddar Python eller något annat språk.
// href: kurser som inte flyttat in än ligger kvar på sin gamla sajt.
export const COURSES = [
  { ...python, load: () => import('../courses/python') },
  {
    id: 'html',
    name: 'HTML & CSS',
    icon: '🎨',
    tagline: 'Bygg riktiga hemsidor, från första rubrik till Tailwind',
    storagePrefix: 'htmlacademy-',
    href: 'https://jorgenjonsson80.github.io/html-academy/',
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: '⚡',
    tagline: 'Gör sidor levande, och lär dig React',
    storagePrefix: 'academy-',
    href: 'https://jorgenjonsson80.github.io/js-academy/',
  },
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
