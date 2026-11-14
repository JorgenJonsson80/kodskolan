// Kursinnehåll som JSON: reguljära uttryck (t.ex. sourceChecks.pattern)
// blir { $regexp: [källa, flaggor] } och tillbaka. Används av bygget
// (scripts/content.mjs) och när betalinnehållet packas upp i webbläsaren.
export function encodeContent(value) {
  if (value instanceof RegExp) return { $regexp: [value.source, value.flags] };
  if (Array.isArray(value)) return value.map(encodeContent);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, encodeContent(item)]),
    );
  }
  return value;
}

export function decodeContent(value) {
  if (Array.isArray(value)) return value.map(decodeContent);
  if (value && typeof value === 'object') {
    if (Array.isArray(value.$regexp)) return new RegExp(...value.$regexp);
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, decodeContent(item)]),
    );
  }
  return value;
}

// Skalen (övningar i betalbanorna utan innehåll) byts mot hela
// övningarna, i samma ordning. full: { id: övning }.
export const mergeById = (items, full) =>
  items.map(item => (full[item.id] ? { ...item, ...full[item.id] } : item));

// Datafilerna (files) är inte hemliga och kan vara stora (Dataanalys).
// I bygget ligger varje fil en gång i en tabell, och övningarna pekar på
// den med { $files: plats }.
export function hoistFiles(value, table, seen = new Map()) {
  if (Array.isArray(value))
    return value.map(item => hoistFiles(item, table, seen));
  if (!value || typeof value !== 'object' || value instanceof RegExp)
    return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      if (key !== 'files' || !item || typeof item !== 'object') {
        return [key, hoistFiles(item, table, seen)];
      }
      const text = JSON.stringify(item);
      if (!seen.has(text)) {
        seen.set(text, table.length);
        table.push(item);
      }
      return [key, { $files: seen.get(text) }];
    }),
  );
}

export function restoreFiles(value, table) {
  if (Array.isArray(value)) return value.map(item => restoreFiles(item, table));
  if (!value || typeof value !== 'object' || value instanceof RegExp)
    return value;
  if (Number.isInteger(value.$files)) return table[value.$files];
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      restoreFiles(item, table),
    ]),
  );
}

// Det krypterade innehållet behöver inte datafilerna – de finns i skalen.
const omitFiles = item =>
  Object.fromEntries(Object.entries(item).filter(([key]) => key !== 'files'));

export function withoutFiles(item) {
  const rest = omitFiles(item);
  return rest.steps ? { ...rest, steps: rest.steps.map(omitFiles) } : rest;
}

// Det som finns kvar i ett skal, så att banorna, framstegen och diplomen
// fungerar utan innehållet.
export const LESSON_STUB = [
  'id',
  'track',
  'title',
  'xp',
  'isBoss',
  'addedLater',
];
export const STEP_STUB = [
  'id',
  'track',
  'title',
  'xp',
  'project',
  'stepNumber',
];
export const PROJECT_STUB = [
  'id',
  'track',
  'title',
  'reward',
  'summary',
  'files',
];

export const pick = (item, keys) =>
  Object.fromEntries(
    keys.filter(key => item[key] !== undefined).map(key => [key, item[key]]),
  );

// Ett projekt som skal: stegen har bara titel och xp.
export const projectStub = project => ({
  ...pick(project, PROJECT_STUB),
  locked: true,
  steps: project.steps.map(step => pick(step, ['title', 'xp', 'files'])),
});
