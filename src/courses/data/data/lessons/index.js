import { BOSSES } from './bossar';
import { DATUM } from './datum';
import { DIAGRAM } from './diagram';
import { FORSTA } from './forsta';
import { GRUPPERA } from './gruppera';
import { KOMBINERA } from './kombinera';
import { PANDAS } from './pandas';
import { STADA } from './stada';
import { STATISTIK } from './statistik';

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
  ...KOMBINERA,
  BOSSES.kombinera,
  ...DIAGRAM,
  BOSSES.diagram,
  ...STATISTIK,
  BOSSES.statistik,
];
