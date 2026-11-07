import { BOSSES } from './bossar';
import { FUNKTIONER } from './funktioner';
import { OBJEKT } from './objekt';
import { TYPER } from './typer';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/typescript.md för alla fält.
export const LESSONS = [
  ...TYPER,
  BOSSES.typer,
  ...FUNKTIONER,
  BOSSES.funktioner,
  ...OBJEKT,
  BOSSES.objekt,
];
