// localStorage kan saknas (privat läge) eller innehålla skräp från en
// äldre version. Då används reservvärdet i stället.
export function readJson(key, fallback, isValid) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? 'null');
    return parsed !== null && isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Fullt eller avstängt – framstegen finns kvar tills sidan laddas om.
  }
}

export const isStringList = value =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

export const isStringMap = value =>
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.values(value).every(item => typeof item === 'string');

// En kurs nycklar i localStorage. Prefixet är kursens, så att kurserna inte
// skriver över varandra (och akademiernas sparade framsteg följer med).
export const progressKeys = prefix => ({
  completed: `${prefix}completed-ids`,
  drafts: `${prefix}drafts`,
  current: `${prefix}current-lesson`,
  helpSeen: `${prefix}help-seen`,
  projectModes: `${prefix}project-modes`,
});
