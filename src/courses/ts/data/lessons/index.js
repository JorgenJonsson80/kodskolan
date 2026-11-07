import { BOSSES } from './bossar';
import { EGNA } from './egna';
import { FUNKTIONER } from './funktioner';
import { OBJEKT } from './objekt';
import { TYPER } from './typer';
import { UNIONER } from './unioner';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/typescript.md för alla fält.
export const LESSONS = [
  ...TYPER,
  BOSSES.typer,
  ...FUNKTIONER,
  BOSSES.funktioner,
  ...OBJEKT,
  BOSSES.objekt,
  ...EGNA,
  BOSSES.egna,
  ...UNIONER,
  BOSSES.unioner,
];
