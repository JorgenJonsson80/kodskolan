import { useEffect, useRef, useState } from 'react';

// En egen liten sida i iframen, så att appens CSS inte påverkar
// elevens komponent.
const PREVIEW_PAGE = `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 12px; font-family: system-ui, sans-serif; color: #111827; }
      button, input, textarea { font: inherit; margin: 2px; }
      .preview-error { color: #b91c1c; white-space: pre-wrap; }
    </style>
  </head>
  <body><div id="root"></div></body>
</html>`;

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
// source är { code, fileName, files, preview } från senaste kontrollen.
function Preview({ source }) {
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [log, setLog] = useState({ source: null, events: [] });
  // Händelser samlas och visas efter renderingen, så att loggen inte
  // uppdateras mitt i när elevens komponent renderar.
  const bufferRef = useRef([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    if (!isLoaded) return;
    let stop = null;
    let isCancelled = false;
    let flushTimer = null;
    bufferRef.current = [];

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

    function handleRenderEvent(event) {
      if (isCancelled) return;
      bufferRef.current.push({
        ...event,
        id: nextIdRef.current++,
        time: Date.now(),
      });
      flushTimer ??= setTimeout(flush, 0);
    }

    // Kompilatorn behövs bara här, så den laddas först när den används.
    import('../runner/livePreview').then(({ startLivePreview }) => {
      if (isCancelled) return;
      const container =
        iframeRef.current.contentDocument.getElementById('root');
      stop = startLivePreview(container, source, handleRenderEvent);
    });

    return () => {
      isCancelled = true;
      clearTimeout(flushTimer);
      stop?.();
    };
  }, [isLoaded, source]);

  const events = log.source === source ? log.events : [];

  return (
    <>
      <iframe
        ref={iframeRef}
        className="preview"
        srcDoc={PREVIEW_PAGE}
        title="Förhandsvisning"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
      <RenderLog
        events={events}
        onClear={() => setLog({ source, events: [] })}
      />
    </>
  );
}

export default Preview;
