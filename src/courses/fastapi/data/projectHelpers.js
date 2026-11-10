// Korta sätt att skriva projektsteg och tester, så att projektfilerna
// mest innehåller själva innehållet.
export const step = (
  title,
  why,
  task,
  solution,
  hints,
  tests,
  request,
  extra = {},
) => ({
  title,
  why,
  xp: 20,
  description: title + '.',
  task: `Uppgift: ${task}`,
  solution,
  hints,
  tests,
  ...(request && { request }),
  ...extra,
});

export const t = (description, code, expected) => ({
  description,
  code,
  expected,
});

// POST med JSON i 📮.
export const post = (path, body, extra = {}) => ({
  method: 'POST',
  path,
  body: JSON.stringify(body),
  ...extra,
});
