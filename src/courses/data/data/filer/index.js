// Kafé Kanels data, skapad av scripts/data/kafe.py (ändra där, inte här).
// Övningarna lägger filerna i files, och de skrivs till Pythons filsystem
// före varje körning.
import KASSAN from './kassan.csv?raw';
import KASSAN_MARS from './kassan_mars.csv?raw';
import KASSAN_RORIG from './kassan_rorig.csv?raw';
import PRODUKTER from './produkter.csv?raw';
import VADRET from './vadret.csv?raw';

export { KASSAN, KASSAN_MARS, KASSAN_RORIG, PRODUKTER, VADRET };

export const KASSA = { 'kassan.csv': KASSAN };

// Mars, rörig och ren (bana 3).
export const RORIG = { 'kassan_rorig.csv': KASSAN_RORIG };
export const RORIG_OCH_REN = {
  'kassan_rorig.csv': KASSAN_RORIG,
  'kassan_mars.csv': KASSAN_MARS,
};
