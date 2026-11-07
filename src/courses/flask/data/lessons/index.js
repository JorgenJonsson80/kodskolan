import { API } from './api';
import { BOSSES } from './bossar';
import { DATABAS } from './databas';
import { FEL } from './fel';
import { FELSOK } from './felsok';
import { FORMULAR } from './formular';
import { FORSTA } from './forsta';
import { FRAGOR } from './fragor';
import { INLOGGNING } from './inloggning';
import { JSON_BANA } from './json';
import { MALLAR } from './mallar';
import { SKICKA } from './skicka';
import { SLUTPROJEKT } from './slutprojekt';
import { VAGAR } from './vagar';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/flask.md för alla fält.
export const LESSONS = [
  ...FORSTA,
  BOSSES.forsta,
  ...VAGAR,
  BOSSES.vagar,
  ...JSON_BANA,
  BOSSES.json,
  ...FRAGOR,
  BOSSES.fragor,
  ...SKICKA,
  BOSSES.skicka,
  ...API,
  BOSSES.api,
  ...FEL,
  BOSSES.fel,
  ...MALLAR,
  BOSSES.mallar,
  ...FORMULAR,
  BOSSES.formular,
  ...DATABAS,
  BOSSES.databas,
  ...FELSOK,
  BOSSES.felsok,
  ...INLOGGNING,
  BOSSES.inloggning,
  ...SLUTPROJEKT,
  BOSSES.slutprojekt,
];
