import { useState } from 'react';

const toText = headers =>
  Object.entries(headers ?? {})
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n');

// En rad per header, "namn: värde". Tomma och trasiga rader hoppas över,
// så att eleven kan skriva i lugn och ro.
const toHeaders = text =>
  Object.fromEntries(
    text
      .split('\n')
      .map(line => line.split(/:(.*)/s).map(part => part?.trim()))
      .filter(([name, value]) => name && value !== undefined && value !== ''),
  );

// Headers till 📮 Anropa, t.ex. inloggning (authorization: Bearer abc123)
// eller en API-nyckel. Öppen från början när övningen har headers.
export default function HeaderField({ headers, onChange }) {
  const [text, setText] = useState(() => toText(headers));
  const hasHeaders = Object.keys(headers ?? {}).length > 0;
  return (
    <details className="request-headers" open={hasHeaders}>
      <summary>Headers (t.ex. inloggning eller API-nyckel)</summary>
      <div className="request-body">
        <textarea
          aria-label="Headers"
          rows={2}
          spellCheck="false"
          value={text}
          placeholder="x-api-nyckel: hemlig"
          onChange={event => {
            setText(event.target.value);
            onChange(toHeaders(event.target.value));
          }}
        />
      </div>
    </details>
  );
}
