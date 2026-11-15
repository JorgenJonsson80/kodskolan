import { useEffect, useMemo, useRef, useState } from 'react';
import SiteFooter from '../core/components/SiteFooter';
import { hasAccess } from '../core/lib/access';
import { useAccess } from '../core/lib/useAccess';
import { useAccount } from '../core/lib/useAccount';
import { askBuilder, EXAMPLES } from './studio/ai';
import { DATA_MESSAGE, withStorage } from './studio/preview';
import {
  buildProject,
  fileName,
  newProject,
  readProjects,
  writeProjects,
} from './studio/projects';
import { ACCENTS, THEMES } from './studio/themes';
import { templateById, TEMPLATES } from './studio/templates';

const BASE = import.meta.env.BASE_URL;

// Appen i en sandlåda utan origin, med en egen lagring (studio/preview.js).
// Datan läses bara när koden ändras eller man börjar om, så att appen inte
// laddas om varje gång den sparar något.
function AppPreview({ project, html, onData }) {
  const frameRef = useRef(null);
  // Ny kod, en annan app eller tömd data: bygg sidan på nytt med datan som
  // gäller just då. Annars står den kvar, även när appen sparar något.
  const key = `${project.id}-${project.dataResets ?? 0}-${html}`;
  const [doc, setDoc] = useState({ key: null, srcDoc: '' });
  if (doc.key !== key) setDoc({ key, srcDoc: withStorage(html, project.data) });
  const srcDoc = doc.key === key ? doc.srcDoc : withStorage(html, project.data);

  useEffect(() => {
    function handle(event) {
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === DATA_MESSAGE) onData(event.data.data);
    }
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [onData]);

  return (
    <div className="studio-browser">
      <div className="studio-browser-bar">
        <span className="hero-demo-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="studio-browser-url">{fileName(project.name)}</span>
      </div>
      <iframe
        ref={frameRef}
        title={`Appen ${project.name}`}
        sandbox="allow-scripts allow-forms allow-modals"
        srcDoc={srcDoc}
      />
    </div>
  );
}

function CodeView({ html }) {
  const lines = html.split('\n');
  return (
    <pre className="studio-code" aria-label="Appens kod">
      <code>
        {lines.map((line, index) => (
          <span key={`rad-${index}`} className="studio-code-line">
            <span className="studio-code-number" aria-hidden="true">
              {index + 1}
            </span>
            {line || ' '}
          </span>
        ))}
      </code>
    </pre>
  );
}

function Explain({ parts, isCustom }) {
  if (isCustom) {
    return (
      <div className="studio-explain">
        <p>
          Den här appen har AI:n skrivit, så det finns ingen färdig förklaring.
          Läs koden under <strong>Koden</strong> – kommentarerna (raderna som
          börjar med <code>//</code>) säger vad delarna gör.
        </p>
        <p className="muted">
          Vill du förstå mer? Kursen{' '}
          <a href={`${BASE}kurser/kodamedai/`}>Koda med AI</a> lär dig läsa och
          granska kod som en AI skrivit.
        </p>
      </div>
    );
  }
  return (
    <ol className="studio-explain">
      {parts.map(part => (
        <li key={`del-${part.title}`}>
          <h3>{part.title}</h3>
          <p>{part.text}</p>
          <pre>
            <code>{part.code}</code>
          </pre>
          <a href={`${BASE}${part.learn.href}`}>
            Lär dig mer: {part.learn.label} →
          </a>
        </li>
      ))}
    </ol>
  );
}

// Rutan för AI:n: ändra appen med egna ord, eller bygg en egen app från en
// beskrivning. Bara för den som har full tillgång.
function AiBox({ project, html, account, allowed, onResult, onUndo }) {
  const [text, setText] = useState('');
  const [state, setState] = useState({ busy: false, error: null });
  const isNew = project.template === 'eget' && !project.html;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim() || state.busy) return;
    setState({ busy: true, error: null });
    try {
      const result = await askBuilder({
        mode: isNew ? 'new' : 'change',
        request: text.trim(),
        html: isNew ? undefined : html,
      });
      onResult(result, text.trim());
      setText('');
      setState({ busy: false, error: null });
    } catch (error) {
      setState({ busy: false, error: error.message });
    }
  }

  if (!allowed) {
    return (
      <div className="studio-ai is-locked">
        <h2>✨ {isNew ? 'Beskriv din app' : 'Ändra med egna ord'}</h2>
        <p className="muted">
          {account.user
            ? 'AI-delen ingår i full tillgång. Mallarna ovan är fria att använda.'
            : 'Logga in med full tillgång för att låta AI:n bygga och ändra appar.'}
        </p>
        {!account.user && (
          <a className="hero-secondary" href={`${BASE}konto`}>
            Logga in →
          </a>
        )}
      </div>
    );
  }

  return (
    <form className="studio-ai" onSubmit={handleSubmit}>
      <h2>✨ {isNew ? 'Beskriv din app' : 'Ändra med egna ord'}</h2>
      <p className="muted">
        {isNew
          ? 'Skriv vad appen ska göra, på vanlig svenska. AI:n bygger den.'
          : 'Skriv vad du vill ändra, t.ex. "gör rubriken större" eller "lägg till en kolumn för telefonnummer".'}
      </p>
      {isNew && (
        <div className="studio-examples">
          {EXAMPLES.map(example => (
            <button
              key={`exempel-${example}`}
              type="button"
              onClick={() => setText(example)}
            >
              {example}
            </button>
          ))}
        </div>
      )}
      <textarea
        value={text}
        maxLength={500}
        rows={3}
        onChange={event => setText(event.target.value)}
        aria-label={isNew ? 'Beskriv din app' : 'Vad vill du ändra?'}
        placeholder={isNew ? 'Min app ska…' : 'Ändra så att…'}
      />
      <div className="studio-ai-actions">
        <button
          className="primary-button"
          type="submit"
          disabled={state.busy || !text.trim()}
        >
          {state.busy
            ? 'AI:n bygger… (kan ta en minut)'
            : isNew
              ? 'Bygg appen'
              : 'Ändra appen'}
        </button>
        {project.history.length > 0 && (
          <button type="button" onClick={onUndo} disabled={state.busy}>
            ↩️ Ångra
          </button>
        )}
      </div>
      {state.error && <p className="feedback-error">{state.error}</p>}
      {project.changes.length > 0 && (
        <ol className="studio-changes">
          {project.changes.map((change, index) => (
            <li key={`andring-${index}`}>
              <strong>{change.request}</strong>
              <span className="muted">{change.summary}</span>
            </li>
          ))}
        </ol>
      )}
    </form>
  );
}

// /bygg: Byggstudion. Välj en mall, klicka i det appen ska kunna och hur
// den ska se ut – appen byggs direkt. Med full tillgång kan AI:n ändra den
// med egna ord, eller bygga en helt egen.
export default function StudioPage() {
  const account = useAccount();
  const { access } = useAccess(account.user);
  const aiAllowed = access !== null && hasAccess(access, '*');
  const [projects, setProjects] = useState(() => {
    const saved = readProjects();
    return saved.length > 0 ? saved : [newProject()];
  });
  const [currentId, setCurrentId] = useState(() => projects[0].id);
  const [tab, setTab] = useState('app');
  const project = projects.find(item => item.id === currentId) ?? projects[0];
  const template = templateById(project.template);
  const { html, parts } = useMemo(() => buildProject(project), [project]);
  const isCustom = Boolean(project.html) || project.template === 'eget';

  // Spara en stund efter senaste ändringen, inte för varje knapptryck.
  useEffect(() => {
    const timer = setTimeout(() => writeProjects(projects), 400);
    return () => clearTimeout(timer);
  }, [projects]);

  function update(changes) {
    setProjects(list =>
      list.map(item =>
        item.id === project.id
          ? { ...item, ...changes, updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  }

  // Ändras mallens val när AI:n redan ändrat koden börjar appen om från
  // mallen – fråga först.
  function updateTemplate(changes) {
    if (project.html) {
      const ok = window.confirm(
        'Appen är ändrad med AI. Börja om från mallen med det nya valet? Dina AI-ändringar försvinner.',
      );
      if (!ok) return;
      update({ ...changes, html: null, history: [], changes: [] });
      return;
    }
    update(changes);
  }

  function chooseTemplate(id) {
    if (id === project.template) return;
    const fresh = newProject(id);
    updateTemplate({
      template: id,
      name: fresh.name,
      features: fresh.features,
      html: null,
      history: [],
      changes: [],
    });
  }

  function addProject() {
    const fresh = newProject();
    setProjects(list => [fresh, ...list]);
    setCurrentId(fresh.id);
    setTab('app');
  }

  function removeProject() {
    if (!window.confirm(`Ta bort ${project.name}?`)) return;
    const rest = projects.filter(item => item.id !== project.id);
    const next = rest.length > 0 ? rest : [newProject()];
    setProjects(next);
    setCurrentId(next[0].id);
  }

  function handleAiResult(result, request) {
    update({
      html: result.html,
      // null betyder mallen, så att Ångra kan gå tillbaka hela vägen.
      history: [...project.history, project.html].slice(-10),
      changes: [...project.changes, { request, summary: result.summary }],
    });
    setTab('app');
  }

  function handleUndo() {
    const previous = project.history.at(-1);
    update({
      html: previous ?? null,
      history: project.history.slice(0, -1),
      changes: project.changes.slice(0, -1),
    });
  }

  function handleDownload() {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName(project.name);
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const hasApp = Boolean(html);

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={BASE}>
            Kodskolan
          </a>{' '}
          › Byggstudion <span className="studio-beta">Test</span>
        </h1>
      </header>
      <main className="studio">
        <aside className="studio-panel" aria-label="Bygg din app">
          <div className="studio-projects">
            <label>
              <span className="muted">Mina appar</span>
              <select
                value={project.id}
                onChange={event => setCurrentId(event.target.value)}
              >
                {projects.map(item => (
                  <option key={`app-${item.id}`} value={item.id}>
                    {item.name || 'Namnlös'}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={addProject}>
              ＋ Ny app
            </button>
          </div>

          <section className="studio-step">
            <h2>
              <span>1</span> Vad vill du bygga?
            </h2>
            <div className="studio-templates">
              {TEMPLATES.map(item => (
                <button
                  key={`mall-${item.id}`}
                  type="button"
                  className={item.id === project.template ? 'is-chosen' : ''}
                  aria-pressed={item.id === project.template}
                  onClick={() => chooseTemplate(item.id)}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </button>
              ))}
              <button
                type="button"
                className={project.template === 'eget' ? 'is-chosen' : ''}
                aria-pressed={project.template === 'eget'}
                onClick={() => chooseTemplate('eget')}
              >
                <span aria-hidden="true">✨</span>
                <strong>Något eget</strong>
                <small>Beskriv appen med egna ord, så bygger AI:n den.</small>
              </button>
            </div>
          </section>

          {template && (
            <section className="studio-step">
              <h2>
                <span>2</span> Vad ska den kunna?
              </h2>
              <ul className="studio-features">
                {template.features.map(item => (
                  <li key={`val-${item.id}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(project.features[item.id])}
                        onChange={event =>
                          updateTemplate({
                            features: {
                              ...project.features,
                              [item.id]: event.target.checked,
                            },
                          })
                        }
                      />
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.hint}</small>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {template && (
            <section className="studio-step">
              <h2>
                <span>3</span> Hur ska den se ut?
              </h2>
              <div className="studio-themes">
                {THEMES.map(item => (
                  <button
                    key={`tema-${item.id}`}
                    type="button"
                    className={item.id === project.theme ? 'is-chosen' : ''}
                    aria-pressed={item.id === project.theme}
                    onClick={() => updateTemplate({ theme: item.id })}
                    style={{
                      background: item.vars.bakgrund,
                      color: item.vars.text,
                      fontFamily: item.vars.typsnitt,
                      borderRadius: item.vars.rundning,
                    }}
                  >
                    <span
                      className="studio-theme-card"
                      style={{
                        background: item.vars.yta,
                        borderColor: item.vars.kant,
                      }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
              <div
                className="studio-accents"
                role="radiogroup"
                aria-label="Färg"
              >
                {ACCENTS.map(item => (
                  <button
                    key={`farg-${item.id}`}
                    type="button"
                    role="radio"
                    aria-checked={item.id === project.accent}
                    aria-label={item.name}
                    title={item.name}
                    className={item.id === project.accent ? 'is-chosen' : ''}
                    style={{ background: item.color }}
                    onClick={() => updateTemplate({ accent: item.id })}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="studio-step">
            <h2>
              <span>{template ? 4 : 2}</span> Vad ska den heta?
            </h2>
            <input
              className="studio-name"
              value={project.name}
              maxLength={60}
              onChange={event =>
                project.html
                  ? update({ name: event.target.value })
                  : updateTemplate({ name: event.target.value })
              }
              aria-label="Appens namn"
            />
          </section>

          <AiBox
            key={project.id}
            project={project}
            html={html}
            account={account}
            allowed={aiAllowed}
            onResult={handleAiResult}
            onUndo={handleUndo}
          />

          <div className="studio-bottom">
            <button
              type="button"
              className="primary-button"
              onClick={handleDownload}
              disabled={!hasApp}
            >
              ⬇️ Ladda ner appen
            </button>
            <button
              type="button"
              className="link-button"
              onClick={removeProject}
            >
              Ta bort appen
            </button>
          </div>
        </aside>

        <section className="studio-stage" aria-label="Din app">
          <div className="studio-tabs" role="tablist">
            {[
              ['app', '📱 Appen'],
              ['code', '🧾 Koden'],
              ['explain', '💡 Så funkar den'],
            ].map(([id, label]) => (
              <button
                key={`flik-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? 'is-chosen' : ''}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
            {hasApp && tab === 'app' && (
              <button
                type="button"
                className="studio-reset link-button"
                onClick={() =>
                  update({
                    data: {},
                    dataResets: (project.dataResets ?? 0) + 1,
                  })
                }
              >
                Töm appens data
              </button>
            )}
          </div>
          {!hasApp ? (
            <div className="studio-empty">
              <p>✨ Beskriv din app till vänster, så bygger AI:n den här.</p>
            </div>
          ) : tab === 'app' ? (
            <AppPreview
              project={project}
              html={html}
              onData={data => update({ data })}
            />
          ) : tab === 'code' ? (
            <CodeView html={html} />
          ) : (
            <Explain parts={parts} isCustom={isCustom} />
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
