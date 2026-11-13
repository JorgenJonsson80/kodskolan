import { BESTALL } from './bestall';
import { BOSSES } from './bossar';
import { FEL } from './fel';
import { LAS } from './las';
import { VERKTYG } from './verktyg';

// Alla övningar i banornas ordning, med bossen sist i varje bana.
export const LESSONS = [
  ...VERKTYG,
  BOSSES.verktyg,
  ...BESTALL,
  BOSSES.bestall,
  ...LAS,
  BOSSES.las,
  ...FEL,
  BOSSES.fel,
];
