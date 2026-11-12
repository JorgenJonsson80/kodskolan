// Förhandsvisning av en Streamlit-app utifrån det låtsasmodulen i
// harness.py antecknade. Den visar appen som den ser ut när den öppnas
// (eller med testets widgetvärden). Knapparna går inte att klicka här –
// det gör man i riktig Streamlit via LiveApp.

function Chart({ element }) {
  const [name, values = []] = Object.entries(element.series ?? {})[0] ?? [];
  const numbers = values.map(value => Number(value) || 0);
  const max = Math.max(1, ...numbers.map(Math.abs));
  if (element.type === 'line_chart') {
    const width = 300;
    const step = numbers.length > 1 ? width / (numbers.length - 1) : 0;
    const points = numbers
      .map((value, index) => `${index * step},${100 - (value / max) * 90}`)
      .join(' ');
    return (
      <figure className="app-chart">
        <svg viewBox={`0 0 ${width} 100`} role="img" aria-label={name}>
          <polyline points={points} />
        </svg>
        <figcaption className="muted">
          {name}: {element.labels.join(', ')}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="app-chart">
      {element.labels.map((label, index) => (
        <div key={`bar-${label}-${index}`} className="app-bar-row">
          <span>{label}</span>
          <span
            className="app-bar"
            style={{ width: `${(Math.abs(numbers[index]) / max) * 100}%` }}
          />
          <span className="muted">{values[index]}</span>
        </div>
      ))}
      <figcaption className="muted">{name}</figcaption>
    </figure>
  );
}

function Table({ element }) {
  return (
    <div className="app-table">
      <table>
        <thead>
          <tr>
            {element.columns.map(column => (
              <th key={`col-${column}`} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {element.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{String(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {element.count > element.rows.length && (
        <p className="muted">
          …och {element.count - element.rows.length} rader till
        </p>
      )}
    </div>
  );
}

function Widget({ element }) {
  const { type, label, value } = element;
  if (type === 'button') {
    return (
      <span className="app-button" aria-label={`Knapp ${label}`}>
        {label}
      </span>
    );
  }
  if (type === 'checkbox') {
    return (
      <p className="app-check">
        {value ? '☑' : '☐'} {label}
      </p>
    );
  }
  let shown = String(value ?? '');
  if (type === 'multiselect') shown = (value ?? []).join(', ');
  return (
    <div className="app-widget">
      <span className="app-widget-label">{label}</span>
      {type === 'slider' ? (
        <span className="app-slider">
          <span
            className="app-slider-fill"
            style={{
              width: `${
                element.max > element.min
                  ? ((value - element.min) / (element.max - element.min)) * 100
                  : 0
              }%`,
            }}
          />
          <strong>{shown}</strong>
        </span>
      ) : (
        <span className="app-input">{shown || ' '}</span>
      )}
    </div>
  );
}

function Element({ element, groups }) {
  const { type, text } = element;
  switch (type) {
    case 'title':
      return <h2 className="app-title">{text}</h2>;
    case 'header':
      return <h3>{text}</h3>;
    case 'subheader':
      return <h4>{text}</h4>;
    case 'caption':
      return <p className="muted app-caption">{text}</p>;
    case 'text':
    case 'code':
      return <pre className="app-code">{text}</pre>;
    case 'write':
    case 'markdown':
      return <p>{text.replace(/\*\*|__|^#+\s*/g, '')}</p>;
    case 'success':
    case 'info':
    case 'warning':
    case 'error':
      return <p className={`app-callout app-${type}`}>{text}</p>;
    case 'metric':
      return (
        <div className="app-metric">
          <span className="muted">{element.label}</span>
          <strong>{element.value}</strong>
          {element.delta && (
            <span
              className={
                element.delta.startsWith('-')
                  ? 'app-delta-down'
                  : 'app-delta-up'
              }
            >
              {element.delta.startsWith('-') ? '↓' : '↑'} {element.delta}
            </span>
          )}
        </div>
      );
    case 'dataframe':
      return <Table element={element} />;
    case 'bar_chart':
    case 'line_chart':
      return <Chart element={element} />;
    case 'pyplot':
      return (
        <figure className="plot-figure">
          <img
            src={`data:image/png;base64,${element.png}`}
            alt={`Diagram: ${element.text}`}
          />
        </figure>
      );
    case 'divider':
      return <hr />;
    case 'balloons':
      return <p className="app-balloons">🎈🎈🎈</p>;
    case 'columns':
    case 'tabs':
    case 'expander':
      return <Group element={element} groups={groups} />;
    default:
      return <Widget element={element} />;
  }
}

function List({ elements, groups, prefix }) {
  return elements.map((element, index) => (
    <Element key={`${prefix}-${index}`} element={element} groups={groups} />
  ));
}

function Group({ element, groups }) {
  const id = element.group_id;
  const parts = Array.from({ length: element.count }, (_, col) =>
    (groups.get(id) ?? []).filter(child => child.col === col),
  );
  if (element.type === 'expander') {
    return (
      <details className="app-expander" open>
        <summary>{element.text}</summary>
        <List elements={parts[0]} groups={groups} prefix={`exp-${id}`} />
      </details>
    );
  }
  if (element.type === 'tabs') {
    return (
      <div className="app-tabs">
        {parts.map((part, col) => (
          <section key={`tab-${id}-${col}`}>
            <h4 className="app-tab-name">{element.names[col]}</h4>
            <List elements={part} groups={groups} prefix={`tab-${id}-${col}`} />
          </section>
        ))}
      </div>
    );
  }
  return (
    <div
      className="app-columns"
      style={{
        gridTemplateColumns: `repeat(${element.count}, minmax(0, 1fr))`,
      }}
    >
      {parts.map((part, col) => (
        <div key={`col-${id}-${col}`}>
          <List elements={part} groups={groups} prefix={`col-${id}-${col}`} />
        </div>
      ))}
    </div>
  );
}

export default function AppPreview({ elements }) {
  if (!elements?.length) return null;
  const groups = new Map();
  for (const element of elements) {
    if (element.group === undefined) continue;
    groups.set(element.group, [...(groups.get(element.group) ?? []), element]);
  }
  const top = elements.filter(element => element.group === undefined);
  const sidebar = top.filter(element => element.sidebar);
  const main = top.filter(element => !element.sidebar);
  return (
    <figure className="app-preview">
      <figcaption>
        📱 Så här ser appen ut när den öppnas{' '}
        <span className="muted">
          (förhandsvisning – knapparna går att klicka i riktig Streamlit)
        </span>
      </figcaption>
      <div
        className={sidebar.length ? 'app-page app-with-sidebar' : 'app-page'}
      >
        {sidebar.length > 0 && (
          <aside className="app-sidebar">
            <List elements={sidebar} groups={groups} prefix="side" />
          </aside>
        )}
        <div className="app-main">
          <List elements={main} groups={groups} prefix="main" />
        </div>
      </div>
    </figure>
  );
}
