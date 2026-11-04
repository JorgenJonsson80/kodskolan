import { isStringMap, readJson, writeJson } from './storage';

// Koden på Lekplatsen sparas i webbläsaren, en kod per idé och kurs.
const keyFor = course => `${course.storagePrefix}playground`;
// Platsen för fri kod, och platsen för kod som kopierats från en övning.
export const PLAYGROUND_FREE = 'fritt';
export const PLAYGROUND_COPY = 'kopia';

export function loadPlaygroundCodes(course) {
  return readJson(keyFor(course), {}, isStringMap);
}

export function savePlaygroundCodes(course, codes) {
  writeJson(keyFor(course), codes);
}

// Kopian får en egen plats, så att den fria koden inte skrivs över.
export function copyToPlayground(course, code, lessonTitle) {
  const { comment } = course.editor;
  savePlaygroundCodes(course, {
    ...loadPlaygroundCodes(course),
    [PLAYGROUND_COPY]: `${comment(`Kopia från övningen: ${lessonTitle}`)}\n${comment(course.texts.copyNote)}\n\n${code}`,
  });
}
