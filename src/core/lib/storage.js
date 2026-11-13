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
  owner: `${prefix}owner`,
  saveNudge: `${prefix}save-nudge-dismissed`,
  review: `${prefix}repetition`,
});

// Vems framsteg webbläsaren har för en kurs: kontots id, eller null om de
// gjorts utan inloggning. Bara framsteg utan ägare, eller med samma ägare,
// får slås ihop med ett konto. Annars skulle nästa konto som loggar in i
// samma webbläsare få med sig dem.
export const localOwner = prefix =>
  readJson(
    progressKeys(prefix).owner,
    null,
    value => typeof value === 'string',
  );

export const belongsTo = (prefix, userId) => {
  const owner = localOwner(prefix);
  return owner === null || owner === userId;
};
