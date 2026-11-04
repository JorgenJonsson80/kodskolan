import { BOSSES } from './bossar';
import { DICTIONARIES } from './dictionaries';
import { FELSOKNING } from './felsokning';
import { FUNKTIONER } from './funktioner';
import { GRUNDER } from './grunder';
import { KLASSER } from './klasser';
import { LISTOR } from './listor';
import { LOOPAR } from './loopar';
import { MODULER } from './moduler';
import { PANDAS } from './pandas';
import { SLUTPROJEKT } from './slutprojekt';
import { SMIDIGARE } from './smidigare';
import { STRANGAR } from './strangar';
import { STREAMLIT } from './streamlit';
import { UNDANTAG } from './undantag';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// SPEC.md för alla fält.
export const LESSONS = [
  ...GRUNDER,
  BOSSES.grunder,
  ...LOOPAR,
  BOSSES.loopar,
  ...LISTOR,
  BOSSES.listor,
  ...FUNKTIONER,
  BOSSES.funktioner,
  ...STRANGAR,
  BOSSES.strangar,
  ...DICTIONARIES,
  BOSSES.dictionaries,
  ...SMIDIGARE,
  BOSSES.smidigare,
  ...UNDANTAG,
  BOSSES.undantag,
  ...MODULER,
  BOSSES.moduler,
  ...KLASSER,
  BOSSES.klasser,
  ...FELSOKNING,
  BOSSES.felsokning,
  ...PANDAS,
  BOSSES.pandas,
  ...SLUTPROJEKT,
  BOSSES.slutprojekt,
  ...STREAMLIT,
  BOSSES.streamlit,
];
