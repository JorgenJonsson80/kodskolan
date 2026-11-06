import ResultTable from './components/ResultTable';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { sqlExtensions, sqlHover } from './editor/extensions';
import { meta } from './meta';
import { evaluate } from './runner/evaluate';
import { errorTitle, explainError } from './runner/friendlyErrors';
import { runSqlJob, warmUp } from './runner/sql';
import { TIMEOUT_MS } from './runner/timeout';
import { useWorkbench } from './useWorkbench';
import './sql.css';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// SQL-kursen. Se Kontraktet i SPEC.md. Frågorna körs i SQLite (sql.js) i
// en worker, och svaret visas som en tabell (ResultTable).
export default {
  ...meta,

  content: {
    tracks: TRACKS,
    lessons: LESSONS,
    projects: PROJECTS,
    projectSteps: PROJECT_STEPS,
    ideas: IDEAS,
    ideaStarterCode,
    quiz: QUIZ,
    resources: RESOURCES,
  },

  runtime: {
    run: runSqlJob,
    evaluate,
    warmUp,
    timeoutMs: TIMEOUT_MS,
    hasResult: run => Boolean(run.table),
  },

  editor: {
    extensions: sqlExtensions,
    describeAt: sqlHover,
    comment: text => `-- ${text}`,
    codeFence: 'sql',
    // Facit jämförs utan kommentarer, blanksteg, stora och små bokstäver
    // och sorts citattecken.
    normalize: code =>
      code
        .replace(/--.*$/gm, '')
        .replace(/"/g, "'")
        .replace(/\s/g, '')
        .toLowerCase(),
    tips: <>förslagen kan övningens tabeller och kolumner</>,
  },

  errors: { errorTitle, explainError, icon: '🗄️' },

  useWorkbench,
  ResultPreview: ResultTable,
  playground: {
    runs: true,
    intro: (
      <>
        Välj en databas, skriv en fråga och tryck på <strong>Kör koden</strong>.
        Databasen skapas på nytt varje gång, så du kan inte förstöra något.
      </>
    ),
  },

  texts: {
    failedToStart: 'SQLite kunde inte starta. Ladda om sidan och försök igen.',
    running: 'Kör frågan…',
    outputLabel: 'Meddelande',
    nothingPrinted: 'Frågan gav ingen tabell. Börjar den med SELECT?',
    warningsTitle: '💡 Tänk på',
    docs: () => '📚 Läs mer (engelska)',
    readGuide: '📖 Läs på SQLite Tutorial',
    learning: 'SQL',
    copyNote: 'Bryt ner den: kör en del av frågan i taget och titta på svaret.',
    encouragement: {
      syntax: [
        'Ingen fara – det är ofta bara ett kommatecken eller ett citattecken. Läs förklaringen nedan.',
        'SQL är petig med ordningen: SELECT, FROM, WHERE, GROUP BY, ORDER BY. Kolla att allt står i rätt ordning.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Jämför ditt svar med testraderna nedan.',
        'Nära! Titta på tabellen: vilka rader är för många, och vilka saknas?',
        'Ingen fara, alla skriver fel fråga ibland. Felet är en ledtråd, inte ett betyg.',
        'Den här är klurig. Kör en del av frågan i taget, t.ex. utan WHERE, och se vad du får.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här lär du dig SQL, språket för att ställa frågor till databaser, genom att fråga riktiga tabeller',
    checkResult: (
      <>
        Under feedbacken ser du <em>Svar</em>: tabellen som din fråga gav.
      </>
    ),
    playground: 'mot vilken av databaserna du vill',
    editor: (
      <>
        <li>
          <kbd>{MOD}+Enter</kbd> kör frågan, precis som knappen.
        </li>
        <li>
          Förslag dyker upp när du skriver: nyckelord som <code>SELECT</code>{' '}
          och övningens tabeller och kolumner. Välj med <kbd>Enter</kbd>.
        </li>
        <li>
          Håll musen över ett ord för att se vad det betyder, eller över en
          tabell för att se dess kolumner.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Titta i 📋 Tabellerna.</strong> Där står vad tabellerna och
          kolumnerna heter, och hur raderna ser ut.
        </li>
        <li>
          <strong>Läs felmeddelandet.</strong> <code>no such column</code>{' '}
          betyder att ett namn är felstavat, och förklaringen föreslår ofta det
          rätta.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Bygg frågan bit för bit.</strong> Börja med{' '}
        <code>SELECT * FROM tabell</code>, och lägg sedan till WHERE, GROUP BY
        och resten en sak i taget. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Ta bort en del.</strong> Kör frågan utan <code>WHERE</code>{' '}
          eller utan <code>GROUP BY</code> och se vilka rader som kommer med.
          Lägg sedan tillbaka en sak i taget.
        </li>
        <li>
          <strong>Jämför med testet.</strong> 🔍 Visa skillnaden visar vilka
          rader som är för många och vilka som saknas.
        </li>
      </>
    ),
  },
};
