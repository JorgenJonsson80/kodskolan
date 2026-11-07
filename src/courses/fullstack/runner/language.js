// Kursen har två språk: app.py (Flask) och App.tsx (React med
// TypeScript). En övning säger själv vilket den gäller (lesson.lang), men
// på Lekplatsen och i hovern gissas det från koden. Python har aldrig
// const, function, => eller import { … }.
export const isTsxCode = code =>
  /\bconst\b|\bfunction\b|=>|\bimport\s*\{|<\/\w|\/>/.test(code);

export const langOf = (lesson, code) =>
  lesson?.lang ?? (isTsxCode(code ?? '') ? 'tsx' : 'py');
