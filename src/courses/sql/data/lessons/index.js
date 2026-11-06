import { BOSSES } from './bossar';
import { FILTRERA } from './filtrera';
import { GRUPPERA } from './gruppera';
import { SELECT } from './select';
import { SORTERA } from './sortera';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/sql.md för alla fält.
export const LESSONS = [
  ...SELECT,
  BOSSES.select,
  ...FILTRERA,
  BOSSES.filtrera,
  ...SORTERA,
  BOSSES.sortera,
  ...GRUPPERA,
  BOSSES.gruppera,
];
