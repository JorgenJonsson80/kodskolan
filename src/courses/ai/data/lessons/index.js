import { BOSSES } from './bossar';
import { EMBEDDINGS } from './embeddings';
import { MODELL } from './modell';
import { PROMPTER } from './prompter';
import { RAG } from './rag';
import { SAMTAL } from './samtal';
import { STRUKTUR } from './struktur';
import { VERKTYG } from './verktyg';

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
  ...VERKTYG,
  BOSSES.verktyg,
  ...EMBEDDINGS,
  BOSSES.embeddings,
  ...RAG,
  BOSSES.rag,
];
