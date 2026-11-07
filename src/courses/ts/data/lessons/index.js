import { BOSSES } from './bossar';
import { EGNA } from './egna';
import { FALL } from './fall';
import { FUNKTIONER } from './funktioner';
import { OBJEKT } from './objekt';
import { SAKNAS } from './saknas';
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
  ...SAKNAS,
  BOSSES.saknas,
  ...FALL,
  BOSSES.fall,
];
