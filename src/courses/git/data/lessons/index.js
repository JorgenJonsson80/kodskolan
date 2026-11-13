import { BOSSES } from './bossar';
import { COMMIT } from './commit';
import { FILER } from './filer';
import { TERMINAL } from './terminal';

// Alla övningar i banornas ordning, med bossen sist i varje bana.
export const LESSONS = [
  ...TERMINAL,
  BOSSES.terminal,
  ...FILER,
  BOSSES.filer,
  ...COMMIT,
  BOSSES.commit,
];
