// Kafé Kanels data, skapad av scripts/data/kafe.py (ändra där, inte här).
// Övningarna lägger filerna i files, och de skrivs till Pythons filsystem
// före varje körning.
import CITY_Q1 from './city_q1.csv?raw';
import KASSAN from './kassan.csv?raw';
import KASSAN_MARS from './kassan_mars.csv?raw';
import KASSAN_RORIG from './kassan_rorig.csv?raw';
import PRODUKTER from './produkter.csv?raw';
import VADRET from './vadret.csv?raw';

export { CITY_Q1, KASSAN, KASSAN_MARS, KASSAN_RORIG, PRODUKTER, VADRET };

export const KASSA = { 'kassan.csv': KASSAN };

// Mars, rörig och ren (bana 3).
export const RORIG = { 'kassan_rorig.csv': KASSAN_RORIG };
export const RORIG_OCH_REN = {
  'kassan_rorig.csv': KASSAN_RORIG,
  'kassan_mars.csv': KASSAN_MARS,
};

// Kassan med prislistan och vädret (bana 6).
export const KASSA_OCH_PRODUKTER = {
  'kassan.csv': KASSAN,
  'produkter.csv': PRODUKTER,
};
export const KASSA_OCH_VADER = { 'kassan.csv': KASSAN, 'vadret.csv': VADRET };

// Det nya kaféet i city, första kvartalet 2026 (bana 10).
export const CITY = { 'city_q1.csv': CITY_Q1 };
export const CITY_OCH_PRODUKTER = {
  'city_q1.csv': CITY_Q1,
  'produkter.csv': PRODUKTER,
};
export const CITY_OCH_KASSA = { 'city_q1.csv': CITY_Q1, 'kassan.csv': KASSAN };
