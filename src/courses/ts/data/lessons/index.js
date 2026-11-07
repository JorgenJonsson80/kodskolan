import { BOSSES } from './bossar';
import { DATA } from './data';
import { EGNA } from './egna';
import { FALL } from './fall';
import { FELSOK } from './felsok';
import { FUNKTIONER } from './funktioner';
import { GENERICS } from './generics';
import { OBJEKT } from './objekt';
import { REACT } from './react';
import { SAKNAS } from './saknas';
import { SLUTPROJEKT } from './slutprojekt';
import { TYPER } from './typer';
import { UNIONER } from './unioner';
import { VERKTYG } from './verktyg';

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
  ...GENERICS,
  BOSSES.generics,
  ...VERKTYG,
  BOSSES.verktyg,
  ...DATA,
  BOSSES.data,
  ...FELSOK,
  BOSSES.felsok,
  ...REACT,
  BOSSES.react,
  ...SLUTPROJEKT,
  BOSSES.slutprojekt,
];
