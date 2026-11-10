import { ASYNC } from './async';
import { BEROENDEN } from './beroenden';
import { BOSSES } from './bossar';
import { CRUD } from './crud';
import { DATABAS } from './databas';
import { FELSOK } from './felsok';
import { FORSTA } from './forsta';
import { FRAGOR } from './fragor';
import { MODELLER } from './modeller';
import { SLUTPROJEKT } from './slutprojekt';
import { SVAR } from './svar';
import { VAGAR } from './vagar';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/fastapi.md för alla fält.
export const LESSONS = [
  ...FORSTA,
  BOSSES.forsta,
  ...VAGAR,
  BOSSES.vagar,
  ...FRAGOR,
  BOSSES.fragor,
  ...MODELLER,
  BOSSES.modeller,
  ...SVAR,
  BOSSES.svar,
  ...CRUD,
  BOSSES.crud,
  ...BEROENDEN,
  BOSSES.beroenden,
  ...DATABAS,
  BOSSES.databas,
  ...ASYNC,
  BOSSES.async,
  ...FELSOK,
  BOSSES.felsok,
  ...SLUTPROJEKT,
  BOSSES.slutprojekt,
];
