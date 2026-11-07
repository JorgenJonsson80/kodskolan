import { BOSSES } from './bossar';
import { TYPER } from './typer';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// docs/kurser/typescript.md för alla fält.
export const LESSONS = [...TYPER, BOSSES.typer];
