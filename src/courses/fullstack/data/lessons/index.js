import { API } from './api';
import { BOSSES } from './bossar';
import { IHOP } from './ihop';
import { SIDAN } from './sidan';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/fullstack.md för alla fält. lang säger vilken fil övningen
// gäller: 'py' (app.py, med sidan i frontend) eller 'tsx' (App.tsx, med
// API:t i backend).
export const LESSONS = [
  ...API,
  BOSSES.api,
  ...SIDAN,
  BOSSES.sidan,
  ...IHOP,
  BOSSES.ihop,
];
