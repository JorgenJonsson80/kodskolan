import { BOSSES } from './bossar';
import { MODELL } from './modell';
import { PROMPTER } from './prompter';
import { SAMTAL } from './samtal';
import { STRUKTUR } from './struktur';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/ai.md för alla fält.
export const LESSONS = [
  ...MODELL,
  BOSSES.modell,
  ...PROMPTER,
  BOSSES.prompter,
  ...SAMTAL,
  BOSSES.samtal,
  ...STRUKTUR,
  BOSSES.struktur,
];
