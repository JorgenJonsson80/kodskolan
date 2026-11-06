import { BOSSES } from './bossar';
import { FILTRERA } from './filtrera';
import { SELECT } from './select';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/sql.md för alla fält.
export const LESSONS = [...SELECT, BOSSES.select, ...FILTRERA, BOSSES.filtrera];
