// Kafé Kanels data, skapad av scripts/data/kafe.py (ändra där, inte här).
// Övningarna lägger filerna i files, och de skrivs till Pythons filsystem
// före varje körning.
import KASSAN from './kassan.csv?raw';
import PRODUKTER from './produkter.csv?raw';
import VADRET from './vadret.csv?raw';

export { KASSAN, PRODUKTER, VADRET };

export const KASSA = { 'kassan.csv': KASSAN };
