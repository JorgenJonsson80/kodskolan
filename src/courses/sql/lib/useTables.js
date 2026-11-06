import { useEffect, useState } from 'react';
import { describeSetup } from '../runner/sql';

// Tabellerna per setup, så att samma databas bara beskrivs en gång och
// editorn får samma lista (och inte byter språk i onödan).
const cache = new Map();

// Tabellerna i databasen som setup skapar, eller null medan de hämtas.
export function useTables(setup) {
  const [described, setDescribed] = useState(() => ({
    setup,
    tables: cache.get(setup) ?? null,
  }));

  useEffect(() => {
    if (cache.has(setup)) return;
    let ignore = false;
    describeSetup(setup).then(
      tables => {
        if (Array.isArray(tables)) cache.set(setup, tables);
        if (!ignore) setDescribed({ setup, tables: cache.get(setup) ?? [] });
      },
      () => {},
    );
    return () => {
      ignore = true;
    };
  }, [setup]);

  return (
    cache.get(setup) ?? (described.setup === setup ? described.tables : null)
  );
}
