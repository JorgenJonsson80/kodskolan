import { BOSSES } from './bossar';
import { FORSTA } from './forsta';
import { FRAGOR } from './fragor';
import { JSON_BANA } from './json';
import { SKICKA } from './skicka';
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
];
