import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import {
  Compartment,
  EditorState,
  StateEffect,
  StateField,
} from '@codemirror/state';
import {
  Decoration,
  drawSelection,
  EditorView,
  highlightActiveLine,
  hoverTooltip,
  keymap,
  lineNumbers,
  WidgetType,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { useEffect, useRef, useState } from 'react';
import { useCourse } from '../course';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const FORMAT_KEYS = isMac ? 'Cmd+Shift+F' : 'Ctrl+Shift+F';
const RUN_KEYS = isMac ? 'Cmd+Enter' : 'Ctrl+Enter';
const COMMENT_KEYS = isMac ? 'Cmd+/' : 'Ctrl+/';

// Gör `kod` i förklaringen till riktiga <code>-element.
function renderInfo({ title, body }) {
  const dom = document.createElement('div');
  dom.className = 'cm-code-info';
  const heading = document.createElement('strong');
  heading.textContent = title;
  const paragraph = document.createElement('p');
  // `kod` blir <code> och *ord* kursivt.
  body.split(/(`[^`]+`|\*[^*\s](?:[^*]*[^*\s])?\*)/).forEach(part => {
    const tag = { '`': 'code', '*': 'em' }[part[0]];
    paragraph.append(
      tag && part.length > 2 && part.at(-1) === part[0]
        ? Object.assign(document.createElement(tag), {
            textContent: part.slice(1, -1),
          })
        : part,
    );
  });
  dom.append(heading, paragraph);
  return dom;
}

// Formaterar med kursens format(källkod, markör) som svarar
// { formatted, cursorOffset } (JS: Prettier). Kastar vid syntaxfel.
async function formatCode(view, format) {
  const source = view.state.doc.toString();
  const result = await format(source, view.state.selection.main.head);
  if (result.formatted === source) return;
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: result.formatted },
    selection: { anchor: Math.max(0, result.cursorOffset) },
  });
}

// describeAt kommer från kursen och svarar { from, to, title, body },
// direkt eller som ett Promise (TypeScript frågar kompilatorn i en worker).
const codeHover = describeAt =>
  hoverTooltip(async (view, pos, side) => {
    const info = await describeAt(view.state, pos, side);
    if (!info) return null;
    return {
      pos: info.from,
      end: info.to,
      above: true,
      create: () => ({ dom: renderInfo(info) }),
    };
  });

// Kör rad för rad: raden som körs härnäst, och en kort lapp på raden som
// just kördes med vad den gjorde (x = 2, sant, varv 3 …).
class StepNoteWidget extends WidgetType {
  constructor(text) {
    super();
    this.text = text;
  }

  eq(other) {
    return other.text === this.text;
  }

  toDOM() {
    const note = document.createElement('span');
    note.className = 'cm-step-note';
    note.textContent = this.text;
    return note;
  }
}

function stepDecorations(doc, { line, note }) {
  const inDoc = number => number !== null && number <= doc.lines;
  const ranges = [];
  if (inDoc(line)) {
    ranges.push(
      Decoration.line({ class: 'cm-step-line' }).range(doc.line(line).from),
    );
  }
  if (note && inDoc(note.line)) {
    const done = doc.line(note.line);
    if (note.line !== line) {
      ranges.push(Decoration.line({ class: 'cm-step-done' }).range(done.from));
    }
    ranges.push(
      Decoration.widget({
        widget: new StepNoteWidget(note.text),
        side: 1,
      }).range(done.to),
    );
  }
  return Decoration.set(ranges, true);
}

const setStepLine = StateEffect.define();
const stepLineField = StateField.define({
  create: () => Decoration.none,
  update(decorations, transaction) {
    let result = decorations.map(transaction.changes);
    for (const effect of transaction.effects) {
      if (effect.is(setStepLine)) {
        result = stepDecorations(transaction.state.doc, effect.value);
      }
    }
    return result;
  },
  provide: field => EditorView.decorations.from(field),
});

const highlightStyle = HighlightStyle.define([
  {
    tag: [tags.keyword, tags.operatorKeyword, tags.controlKeyword],
    color: '#c4b5fd',
  },
  { tag: [tags.string, tags.special(tags.string)], color: '#86efac' },
  { tag: [tags.number, tags.bool, tags.null], color: '#fdba74' },
  { tag: tags.comment, color: '#64748b', fontStyle: 'italic' },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: '#7dd3fc',
  },
  { tag: tags.definition(tags.variableName), color: '#fde68a' },
  { tag: tags.propertyName, color: '#f9a8d4' },
  { tag: [tags.className, tags.typeName], color: '#5eead4' },
  { tag: [tags.tagName, tags.angleBracket], color: '#7dd3fc' },
  { tag: tags.attributeName, color: '#fde68a' },
  { tag: tags.attributeValue, color: '#86efac' },
]);

const editorTheme = EditorView.theme(
  {
    '&': {
      margin: '8px 0 12px',
      border: '1px solid var(--border-strong)',
      borderRadius: '10px',
      background: 'var(--surface-sunken)',
      color: 'var(--text)',
      fontSize: '15px',
    },
    '&.cm-focused': {
      outline: '2px solid var(--accent)',
      outlineOffset: '2px',
    },
    '.cm-scroller': {
      minHeight: '220px',
      maxHeight: '560px',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontVariantLigatures: 'none',
      lineHeight: '1.6',
    },
    '.cm-content': { padding: '16px 0', caretColor: 'var(--accent)' },
    '.cm-gutters': {
      background: 'transparent',
      border: 'none',
      color: 'var(--border-strong)',
      borderRadius: '10px 0 0 10px',
    },
    '.cm-activeLine': { background: 'rgba(148, 163, 184, 0.06)' },
    '.cm-cursor': { borderLeftColor: 'var(--accent)' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      background: 'var(--accent-soft) !important',
    },
    '.cm-matchingBracket': { background: 'rgba(167, 139, 250, 0.25)' },
    '.cm-tooltip': {
      border: '1px solid var(--border-strong)',
      borderRadius: '8px',
      background: 'var(--surface)',
      color: 'var(--text)',
    },
    '.cm-step-line': {
      background: 'rgba(251, 191, 36, 0.18)',
      boxShadow: 'inset 3px 0 0 var(--xp)',
    },
    '.cm-step-done': {
      background: 'rgba(52, 211, 153, 0.07)',
      boxShadow: 'inset 3px 0 0 rgba(52, 211, 153, 0.6)',
    },
    '.cm-step-note': {
      marginLeft: '16px',
      padding: '1px 8px',
      borderRadius: '999px',
      background: 'rgba(52, 211, 153, 0.15)',
      color: 'var(--success)',
      fontSize: '12px',
      fontFamily: "'Nunito', system-ui, sans-serif",
      fontWeight: '700',
      whiteSpace: 'pre',
    },
    '.cm-code-info': {
      maxWidth: '360px',
      padding: '8px 12px',
      fontSize: '14px',
      fontFamily: "'Nunito', system-ui, sans-serif",
    },
    '.cm-code-info strong': {
      fontFamily: "'JetBrains Mono', monospace",
      color: 'var(--accent)',
    },
    '.cm-code-info p': { margin: '4px 0 0' },
    '.cm-code-info code': {
      padding: '1px 4px',
      borderRadius: '4px',
      background: 'var(--task-code-bg)',
      color: 'var(--task-code-text)',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '13px',
    },
    '.cm-completionDetail': { color: 'var(--muted)', fontStyle: 'normal' },
    '.cm-tooltip-autocomplete ul li[aria-selected]': {
      background: 'var(--accent-soft)',
      color: 'var(--text)',
    },
  },
  { dark: true },
);

// activeLine: raden som markeras i Kör rad för rad, eller null.
// stepNote: { line, text } på raden som just kördes, eller null.
// context: det kursens språk behöver veta om övningen (SQL: tabellerna),
// skickas till editor.extensions(context). Byts det, byts språket ut.
export default function CodeEditor({
  code,
  onCodeChange,
  onRun,
  activeLine = null,
  stepNote = null,
  fileName = null,
  context = null,
}) {
  const { editor } = useCourse();
  const hostRef = useRef(null);
  const language = useRef(new Compartment());
  const viewRef = useRef(null);
  const callbacks = useRef({ onCodeChange, onRun });
  const [formatError, setFormatError] = useState(false);

  useEffect(() => {
    callbacks.current = { onCodeChange, onRun };
  });

  useEffect(() => {
    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          history(),
          drawSelection(),
          highlightActiveLine(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          language.current.of(editor.extensions(context)),
          autocompletion(),
          codeHover(editor.describeAt),
          stepLineField,
          syntaxHighlighting(highlightStyle),
          editorTheme,
          EditorView.contentAttributes.of({ 'aria-labelledby': 'code-label' }),
          // Formatera med Cmd/Ctrl+Shift+F, eller Shift+Alt+F som i VS Code.
          // ⌥⇧F ger ett specialtecken på Mac, så vi läser den fysiska
          // tangenten (event.code) i stället för tecknet.
          EditorView.domEventHandlers({
            keydown(event, view) {
              const modifier = event.metaKey || event.ctrlKey || event.altKey;
              if (!editor.format || event.code !== 'KeyF') return false;
              if (!event.shiftKey || !modifier) return false;
              event.preventDefault();
              formatCode(view, editor.format).then(
                () => setFormatError(false),
                () => setFormatError(true),
              );
              return true;
            },
          }),
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                callbacks.current.onRun?.();
                return true;
              },
              preventDefault: true,
            },
            ...closeBracketsKeymap,
            ...completionKeymap,
            ...historyKeymap,
            ...defaultKeymap,
            indentWithTab,
          ]),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              callbacks.current.onCodeChange(update.state.doc.toString());
              setFormatError(false);
            }
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => view.destroy();
    // Editorn skapas en gång; ny kod utifrån hanteras i effekten nedan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: language.current.reconfigure(editor.extensions(context)),
    });
  }, [editor, context]);

  // När koden ändras utifrån (ny övning, återställ) byts innehållet ut.
  useEffect(() => {
    const view = viewRef.current;
    if (view && code !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: code },
      });
    }
  }, [code]);

  const noteLine = stepNote?.line ?? null;
  const noteText = stepNote?.text ?? null;
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const note = noteText ? { line: noteLine, text: noteText } : null;
    const effects = [setStepLine.of({ line: activeLine, note })];
    if (activeLine !== null && activeLine <= view.state.doc.lines) {
      effects.push(
        EditorView.scrollIntoView(view.state.doc.line(activeLine).from, {
          y: 'nearest',
        }),
      );
    }
    view.dispatch({ effects });
  }, [activeLine, noteLine, noteText]);

  return (
    <>
      <label id="code-label" onClick={() => viewRef.current?.focus()}>
        Din kod{fileName && ` (${fileName})`}
      </label>
      <div ref={hostRef} />
      <p className="editor-tips muted">
        {formatError ? (
          <span className="editor-tips-error">
            Kunde inte formatera – det finns ett syntaxfel någonstans.
          </span>
        ) : (
          <>
            <kbd>{RUN_KEYS}</kbd> kör koden · {editor.tips} ·{' '}
            {editor.format && (
              <>
                <kbd>{FORMAT_KEYS}</kbd> formaterar ·{' '}
              </>
            )}
            <kbd>{COMMENT_KEYS}</kbd> kommenterar bort en rad · håll musen över
            ett namn för att se vad det är
          </>
        )}
      </p>
    </>
  );
}
