import { BOSSES } from './bossar';
import { MODELL } from './modell';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/ai.md för alla fält.
export const LESSONS = [...MODELL, BOSSES.modell];
