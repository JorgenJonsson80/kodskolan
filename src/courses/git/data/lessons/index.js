import { ANDRINGAR } from './andringar';
import { ARBETSFLODE } from './arbetsflode';
import { BOSSES } from './bossar';
import { COMMIT } from './commit';
import { FILER } from './filer';
import { GITHUB } from './github';
import { GRENAR } from './grenar';
import { KONFLIKTER } from './konflikter';
import { TERMINAL } from './terminal';

// Alla övningar i banornas ordning, med bossen sist i varje bana.
export const LESSONS = [
  ...TERMINAL,
  BOSSES.terminal,
  ...FILER,
  BOSSES.filer,
  ...COMMIT,
  BOSSES.commit,
  ...ANDRINGAR,
  BOSSES.andringar,
  ...GRENAR,
  BOSSES.grenar,
  ...KONFLIKTER,
  BOSSES.konflikter,
  ...GITHUB,
  BOSSES.github,
  ...ARBETSFLODE,
  BOSSES.arbetsflode,
];
