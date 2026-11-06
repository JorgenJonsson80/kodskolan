import { showValue } from '../runner/evaluate';

// Det frågan gav, som en tabell. result.table kommer från engine.js:
// { columns, rows, total }, där rows är högst 200.
export default function ResultTable({ result }) {
  const table = result?.table;
  if (!table) return null;
  const word = table.total === 1 ? 'rad' : 'rader';
  return (
    <figure className="sql-result">
      <figcaption>
        Svar · {table.total} {word}
      </figcaption>
      <div className="sql-table-scroll">
        <table className="sql-table">
          <thead>
            <tr>
              {table.columns.map((column, index) => (
                <th key={`col-${index}`} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((value, index) => (
                  <td
                    key={`cell-${rowIndex}-${index}`}
                    className={value === null ? 'sql-null' : undefined}
                  >
                    {showValue(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.total > table.rows.length && (
        <p className="muted">
          … och {table.total - table.rows.length} rader till.
        </p>
      )}
      {table.total === 0 && <p className="muted">Inga rader matchade.</p>}
    </figure>
  );
}
