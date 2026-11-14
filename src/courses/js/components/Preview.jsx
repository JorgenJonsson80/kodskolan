import { useEffect, useRef, useState } from 'react';

// Elevens komponent körs i en sandlåda: en egen sida utan origin
// (sandbox utan allow-same-origin), så att koden inte kommer åt appens
// inloggning eller localStorage. Se src/courses/js/sandbox/main.js.
const SANDBOX_URL = `${import.meta.env.BASE_URL}sandbox/preview.html`;

const MAX_EVENTS = 100;
// Händelser med längre paus emellan visas som olika omgångar, t.ex. ett
// klick i taget.
const BURST_GAP_MS = 300;

const ICONS = { mount: '🆕', render: '🔄', same: '⏸️', effect: '⚡' };
const VERBS = {
  mount: '',
  render: 'renderade: ',
  same: '',
  effect: '',
};

function WithCode({ text }) {
  return text
    .split(/`([^`]+)`/)
    .map((part, index) =>
      index % 2 === 1 ? <code key={index}>{part}</code> : part,
    );
}

// Loggen som förklarar varför komponenterna renderade.
function RenderLog({ events, onClear }) {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [events]);

  return (
    <details className="render-log" open>
      <summary>🔍 Varför renderade den?</summary>
      <p className="muted render-log-intro">
        Klicka och skriv i förhandsvisningen, så ser du här vad som får varje
        komponent att rendera om.
      </p>
      <ol ref={listRef} className="render-log-list" aria-live="polite">
        {events.map((event, index) => (
          <li
            key={event.id}
            className={
              index > 0 && event.time - events[index - 1].time > BURST_GAP_MS
                ? `render-log-${event.kind} render-log-new-burst`
                : `render-log-${event.kind}`
            }
          >
            <span aria-hidden="true">{ICONS[event.kind]}</span>{' '}
            <strong>&lt;{event.component}&gt;</strong> {VERBS[event.kind]}
            <WithCode text={event.reasons.join('; ')} />
          </li>
        ))}
      </ol>
      <button type="button" className="render-log-clear" onClick={onClear}>
        Rensa loggen
      </button>
    </details>
  );
}

// Visar elevens komponent på riktigt, så att man kan klicka och skriva.
// source är { code, fileName, files, preview } från senaste kontrollen,
// och i Fullstack-kursen request, som skickar anrop till Flask-appen.
function Preview({ source }) {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [log, setLog] = useState({ source: null, events: [] });
  // Händelser samlas och visas efter renderingen, så att loggen inte
  // uppdateras mitt i när elevens komponent renderar.
  const bufferRef = useRef([]);
  const nextIdRef = useRef(0);
  const runRef = useRef(0);

  // Sandlådan säger till när den är redo. Bara meddelanden från just
  // vår iframe räknas.
  useEffect(() => {
    function handleReady(event) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'ready') setIsReady(true);
    }
    window.addEventListener('message', handleReady);
    return () => window.removeEventListener('message', handleReady);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    let flushTimer = null;
    bufferRef.current = [];
    const run = ++runRef.current;

    function flush() {
      flushTimer = null;
      const fresh = bufferRef.current;
      bufferRef.current = [];
      setLog(previous => ({
        source,
        events: [
          ...(previous.source === source ? previous.events : []),
          ...fresh,
        ].slice(-MAX_EVENTS),
      }));
    }

    async function handleMessage(event) {
      if (event.source !== frame) return;
      const message = event.data;
      if (message?.run !== run) return;
      if (message.type === 'render') {
        bufferRef.current.push({
          ...message.event,
          id: nextIdRef.current++,
          time: Date.now(),
        });
        flushTimer ??= setTimeout(flush, 0);
      }
      if (message.type === 'fetch' && source.request) {
        const answer = await source.request(message.request);
        if (run === runRef.current) {
          frame.postMessage(
            { type: 'fetch-result', id: message.id, answer },
            '*',
          );
        }
      }
    }

    window.addEventListener('message', handleMessage);
    // Sidan har ingen origin, så '*' är det enda som når den. Det som
    // skickas är bara elevens egen kod.
    frame.postMessage(
      {
        type: 'run',
        run,
        bridge: Boolean(source.request),
        source: {
          code: source.code,
          fileName: source.fileName,
          files: source.files,
          preview: source.preview,
        },
      },
      '*',
    );

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(flushTimer);
    };
  }, [isReady, source]);

  const events = log.source === source ? log.events : [];

  return (
    <>
      <iframe
        ref={iframeRef}
        className="preview"
        src={SANDBOX_URL}
        sandbox="allow-scripts allow-forms allow-modals"
        title="Förhandsvisning"
      ></iframe>
      <RenderLog
        events={events}
        onClear={() => setLog({ source, events: [] })}
      />
    </>
  );
}

export default Preview;
