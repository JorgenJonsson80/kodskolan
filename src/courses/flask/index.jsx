import { pythonExtensions, pythonHover } from '../python/editor/extensions';
import { errorTitle, explainError } from '../python/runner/friendlyErrors';
import { TIMEOUT_MS } from '../python/runner/python';
import ResponseView from './components/ResponseView';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { meta } from './meta';
import { evaluate } from './runner/evaluate';
import { onStatus, runFlask, warmUp } from './runner/flask';
import { useWorkbench } from './useWorkbench';
import './flask.css';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Flask-kursen. Se Kontraktet i SPEC.md. Python-kursens Pyodide med Flask
// i en egen worker (runner/flaskWorker.js). Appen anropas med Flasks
// testklient, så ingen server behövs, och svaret visas i ResponseView.
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
    run: runFlask,
    evaluate,
    warmUp,
    onStatus,
    timeoutMs: TIMEOUT_MS,
    hasResult: run => Boolean(run.response),
    statusText: {
      idle: '⚗️ Flask vilar',
      starting: '⚗️ Startar Python och Flask…',
      ready: '⚗️ Flask är redo',
      loading: '⚗️ Laddar…',
      failed: '⚗️ Flask kunde inte starta',
    },
  },

  editor: {
    extensions: pythonExtensions,
    describeAt: pythonHover,
    comment: text => `# ${text}`,
    codeFence: 'python',
    normalize: code =>
      code.replace(/#.*$/gm, '').replace(/"/g, "'").replace(/\s/g, ''),
    tips: (
      <>
        <kbd>Tab</kbd> drar in fyra mellanslag · 📮 under editorn väljer anropet
      </>
    ),
  },

  errors: { errorTitle, explainError, icon: '⚗️' },

  useWorkbench,
  ResultPreview: ResponseView,
  playground: {
    runs: true,
    intro: (
      <>
        Skriv en Flask-app, välj ett anrop under 📮 och tryck på{' '}
        <strong>Kör koden</strong>. Appen körs i webbläsaren, så ingen server
        behövs.
      </>
    ),
  },

  texts: {
    failedToStart:
      'Flask kunde inte starta. Kolla internetanslutningen och ladda om sidan.',
    starting: 'Startar Python och Flask…',
    running: 'Kör appen…',
    nothingPrinted: 'Inget skrevs ut. Svaret från appen står under 📮 Svaret.',
    warningsTitle: '⚠️ Bra att veta',
    docs: () => '📚 Läs mer i Flasks dokumentation (engelska)',
    readGuide: '📖 Läs i Flasks guide',
    learning: 'Python med Flask',
    copyNote:
      'Bryt ner den: anropa en väg i taget med 📮 och lägg in print i vägfunktionen.',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Kolla kolon och indrag.',
        'Python är petig med tecken och indrag. Läs förklaringen nedan, så hittar du det.',
      ],
      crash: [
        'Appen stoppade med ett fel. Läs förklaringen – den pekar ut raden.',
        'Ett fel i en vägfunktion syns först när vägen anropas. Testa den med 📮.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vilket anrop som svarade fel.',
        'Nära! Anropa samma väg med 📮 och titta på svaret.',
        'Ingen fara, alla API:er svarar fel ibland. Felet är en ledtråd, inte ett betyg.',
        'Den här är klurig. Kolla statuskoden först: 404 betyder att vägen inte finns, 405 fel metod.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här bygger du webb-API:er och sajter med Flask, Pythons mest använda lilla webbramverk',
    checkResult: (
      <>
        Under <em>📮 Svaret</em> ser du vad appen svarade på anropet, och vilka
        vägar den har.
      </>
    ),
    playground: 'med vilka anrop du vill',
    editor: (
      <>
        <li>
          <strong>📮 Anropa</strong> under editorn väljer vilket anrop appen
          får: metod, adress och det som skickas med. Svaret visas efter att
          koden körts.
        </li>
        <li>
          <kbd>Tab</kbd> drar in raden fyra mellanslag. I Python är indraget
          viktigt: det visar vilka rader som hör till en funktion.
        </li>
        <li>
          <kbd>{MOD}+/</kbd> gör raden till en kommentar.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Läs statuskoden.</strong> 404 betyder att vägen inte finns,
          405 att den inte tar emot den metoden och 500 att koden kraschade.
        </li>
        <li>
          <strong>Anropa själv.</strong> Skriv samma anrop som testet i 📮 och
          titta på svaret.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>En väg i taget.</strong> Få en väg att fungera innan du skriver
        nästa. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Kolla vägarna.</strong> Under svaret står alla vägar appen
          har. Saknas den du anropar? Kolla stavningen och metoden.
        </li>
        <li>
          <strong>Skriv ut.</strong> Lägg in <code>print(…)</code> i
          vägfunktionen. Det som skrivs ut visas under Utskrift.
        </li>
      </>
    ),
  },
};
