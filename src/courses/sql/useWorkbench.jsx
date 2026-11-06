import { useState } from 'react';
import TablesPanel from './components/TablesPanel';
import { DATABASES, setupFor } from './data/databases';
import { useTables } from './lib/useTables';

// SQL-kursens verktyg runt editorn: övningens databas (📋 Tabellerna
// ovanför editorn, och tabellerna till editorns förslag och hover). På
// Lekplatsen (lesson saknas) väljer eleven databas, om idén inte har en.
export function useWorkbench({ lesson, idea }) {
  const [chosen, setChosen] = useState('butik');
  const source = lesson ?? (idea?.db || idea?.setup ? idea : { db: chosen });
  const setup = setupFor(source);
  const tables = useTables(setup);
  const canChoose = !lesson && !idea?.db && !idea?.setup;

  return {
    runOptions: lesson ? { setup, solution: lesson.solution } : { setup },
    editor: { context: tables },
    beforeEditor: (
      <>
        {canChoose && (
          <label className="sql-db-choice">
            Databas:{' '}
            <select
              value={chosen}
              onChange={event => setChosen(event.target.value)}
            >
              {Object.entries(DATABASES).map(([id, database]) => (
                <option key={`db-${id}`} value={id}>
                  {database.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <TablesPanel tables={tables} about={DATABASES[source.db]?.about} />
      </>
    ),
  };
}
