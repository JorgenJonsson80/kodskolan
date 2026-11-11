import { BOSSES } from './bossar';
import { FORSTA } from './forsta';
import { PANDAS } from './pandas';
import { STADA } from './stada';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// SPEC.md för alla fält.
export const LESSONS = [
  ...PANDAS,
  BOSSES.pandas,
  ...FORSTA,
  BOSSES.forsta,
  ...STADA,
  BOSSES.stada,
];
