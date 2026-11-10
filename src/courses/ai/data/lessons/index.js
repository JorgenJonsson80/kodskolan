import { AGENT } from './agent';
import { BOSSES } from './bossar';
import { EMBEDDINGS } from './embeddings';
import { MODELL } from './modell';
import { PROMPTER } from './prompter';
import { RAG } from './rag';
import { SAMTAL } from './samtal';
import { SLUTPROJEKT } from './slutprojekt';
import { STRUKTUR } from './struktur';
import { UTVARDERING } from './utvardering';
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
  ...AGENT,
  BOSSES.agent,
  ...UTVARDERING,
  BOSSES.utvardering,
  ...SLUTPROJEKT,
  BOSSES.slutprojekt,
];
