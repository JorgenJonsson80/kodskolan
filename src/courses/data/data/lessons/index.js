import { BOSSES } from './bossar';
import { DATUM } from './datum';
import { FORSTA } from './forsta';
import { GRUPPERA } from './gruppera';
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
  ...DATUM,
  BOSSES.datum,
  ...GRUPPERA,
  BOSSES.gruppera,
];
