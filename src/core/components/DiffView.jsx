import { useState } from 'react';
import { diffLines } from '../runner/diff';

// Ett mellanslag syns inte när det markeras, så det visas som ␣.
function Parts({ parts }) {
  if (parts === null) return <span className="diff-missing">(ingen rad)</span>;
  return parts.map((part, index) =>
    part.changed ? (
      <mark key={`mark-${index}`} className="diff-mark">
        {part.text.replace(/ /g, '␣')}
      </mark>
    ) : (
      <span key={`same-${index}`}>{part.text}</span>
    ),
  );
}

// Döljs tills eleven ber om den – att själv hitta felet är också träning.
function DiffView({ actual, expected }) {
  const [open, setOpen] = useState(false);
  const rows = open ? diffLines(actual, expected) : [];
  const hasSpace = rows.some(row =>
    [row.actual, row.expected].some(parts =>
      parts?.some(part => part.changed && part.text.includes(' ')),
    ),
  );

  return (
    <div className="diff">
      <button
        type="button"
        className="diff-button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Dölj skillnaden' : '🔍 Visa skillnaden'}
      </button>
      {open && (
        <>
          <dl className="diff-rows">
            {rows.map((row, index) => (
              <div key={`row-${index}`} className="diff-row">
                <dt>Du fick:</dt>
                <dd>
                  <Parts parts={row.actual} />
                </dd>
                <dt>Rätt:</dt>
                <dd>
                  <Parts parts={row.expected} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="diff-legend">
            Det markerade skiljer sig.
            {hasSpace && (
              <>
                {' '}
                <code>␣</code> betyder ett mellanslag.
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}

export default DiffView;
