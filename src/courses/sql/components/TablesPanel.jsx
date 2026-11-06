import { showValue } from '../runner/evaluate';

// 📋 Tabellerna: databasens tabeller med kolumner och de första raderna,
// så att eleven ser vad som går att fråga efter. tables från useTables.
export default function TablesPanel({ tables, about }) {
  if (!tables) {
    return <p className="muted sql-tables-loading">Läser databasen…</p>;
  }
  if (tables.length === 0) {
    return (
      <p className="muted sql-tables-empty">
        📋 Databasen är tom här, det finns inga tabeller än.
      </p>
    );
  }
  return (
    <details className="sql-tables">
      <summary>
        📋 Tabellerna: {tables.map(table => table.name).join(', ')}
      </summary>
      {about && <p className="muted">{about}</p>}
      {tables.map(table => (
        <section key={`table-${table.name}`} className="sql-table-info">
          <h3>
            {table.name}{' '}
            <span className="muted">
              ({table.count} {table.count === 1 ? 'rad' : 'rader'})
            </span>
          </h3>
          <div className="sql-table-scroll">
            <table className="sql-table">
              <thead>
                <tr>
                  {table.columns.map(column => (
                    <th
                      key={`${table.name}-${column.name}`}
                      scope="col"
                      title={column.type}
                    >
                      {column.primaryKey ? '🔑 ' : ''}
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={`${table.name}-row-${rowIndex}`}>
                    {row.map((value, index) => (
                      <td
                        key={`${table.name}-cell-${rowIndex}-${index}`}
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
          {table.count > table.rows.length && (
            <p className="muted sql-more">
              De första {table.rows.length} av {table.count} rader.
            </p>
          )}
        </section>
      ))}
    </details>
  );
}
