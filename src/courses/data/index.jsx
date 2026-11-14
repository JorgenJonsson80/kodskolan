import ResultPreview from '../python/components/ResultPreview';
import { pythonExtensions, pythonHover } from '../python/editor/extensions';
import { evaluate } from '../python/runner/evaluate';
import { errorTitle, explainError } from '../python/runner/friendlyErrors';
import {
  onStatus,
  runPython,
  TIMEOUT_MS,
  warmUp,
} from '../python/runner/python';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { CONTENT_LOCK, LESSONS } from './content';
import { PROJECT_STEPS, PROJECTS } from './content';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { meta } from './meta';
import { useWorkbench } from './useWorkbench';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Dataanalys. Se Kontraktet i SPEC.md och docs/kurser/data.md. Samma
// Python som Python-kursen (worker, rättning, editor, felförklaringar och
// Streamlit) – bara innehållet och texterna är kursens egna.
export default {
  ...meta,

  content: {
    lock: CONTENT_LOCK,
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
    run: runPython,
    evaluate,
    warmUp,
    onStatus,
    timeoutMs: TIMEOUT_MS,
    // Lekplatsen visar Streamlit-appen i stället för en tom utskrift.
    hasResult: run => run.app?.length > 0 || run.figures?.length > 0,
    statusText: {
      idle: '📊 Python vilar',
      starting: '📊 Startar Python…',
      ready: '📊 Python är redo',
      loading: '📦 Laddar pandas och matplotlib…',
      failed: '📊 Python kunde inte starta',
    },
  },

  editor: {
    extensions: pythonExtensions,
    describeAt: pythonHover,
    comment: text => `# ${text}`,
    codeFence: 'python',
    // Facit jämförs utan kommentarer, blanksteg och sorts citattecken.
    normalize: code =>
      code.replace(/#.*$/gm, '').replace(/"/g, "'").replace(/\s/g, ''),
    tips: (
      <>
        <kbd>Tab</kbd> drar in fyra mellanslag
      </>
    ),
  },

  errors: { errorTitle, explainError, icon: '🐍' },

  useWorkbench,
  ResultPreview,
  playground: {
    runs: true,
    intro: (
      <>
        Skriv vad du vill, tryck på <strong>Kör koden</strong> och se vad som
        händer.
      </>
    ),
  },

  texts: {
    failedToStart:
      'Python kunde inte starta. Kolla internetanslutningen och ladda om sidan.',
    starting: 'Startar Python…',
    running: 'Kör koden…',
    nothingPrinted: 'Inget skrevs ut. Använd print för att se vad koden gör.',
    warningsTitle: '⚠️ Bra att veta',
    docs: () => '📚 Läs mer i pandas dokumentation (engelska)',
    readGuide: '📖 Läs i Pythons guide',
    learning: 'dataanalys med Python och pandas',
    copyNote: 'Bryt ner den: kör en bit i taget och lägg in print.',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Alla glömmer citattecken, kolon och parenteser ibland.',
        'Python är petig med tecken och indrag. Läs förklaringen nedan, så hittar du det.',
      ],
      crash: [
        'Koden stoppade med ett fel. Läs förklaringen – den pekar ut raden.',
        'Ett fel är bara Python som säger vad den inte förstår. Titta på raden som nämns.',
      ],
    },
  },

  help: {
    intro: 'Här lär du dig ta reda på saker med data, i riktig Python',
    checkResult: (
      <>
        Under <em>Utskrift</em> ser du det din kod skrev ut.
      </>
    ),
    playground: (
      <>
        med egna svar till <code>input()</code>
      </>
    ),
    editor: (
      <>
        <li>
          <kbd>Tab</kbd> drar in raden fyra mellanslag. I Python är indraget
          viktigt: det visar vilka rader som hör till en if eller en loop.
        </li>
        <li>
          <kbd>{MOD}+/</kbd> gör raden till en kommentar, så att Python hoppar
          över den. Bra när du vill testa utan en viss rad.
        </li>
        <li>
          När koden använder <code>input()</code> står det ovanför editorn vilka
          svar Python får när koden rättas.
        </li>
        <li>
          Håll musen över ett namn för att se vad det är och vad det tillhör: en
          variabel (och var den skapas), en loopvariabel, en metod som{' '}
          <code>append</code> eller ett nyckelord som <code>for</code> – med{' '}
          <em>när</em> man använder det.
        </li>
        <li>
          Förslag dyker upp när du skriver: dina egna variabler, Pythons
          inbyggda funktioner och, efter en punkt, metoderna för en lista, text
          eller dictionary. Välj med <kbd>Enter</kbd>.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Läs felmeddelandet.</strong> Det står vilken rad felet är på,
          och under står en förklaring på svenska.
        </li>
        <li>
          <strong>Kör rad för rad.</strong> Knappen 👣 stegar igenom koden en
          rad i taget och visar vad varje variabel innehåller. Under varje steg
          står vad raden gjorde: om villkoret var sant, vilket varv loopen är på
          och vad en funktion lämnar tillbaka. Slå på 🤔 Gissa först och gissa
          själv innan du ser svaret, eller tryck ▶ Spela upp och se allt köras.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Titta på datan.</strong> Skriv ut <code>df.head()</code> eller{' '}
        <code>len(df)</code> efter varje steg, så ser du om filtret eller
        grupperingen blev som du tänkt. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Kör rad för rad.</strong> Tryck på <em>👣 Kör rad för rad</em>{' '}
          och stega igenom koden. Du ser vilken rad som körs och vad varje
          variabel innehåller just då.
        </li>
        <li>
          <strong>Se vad som händer.</strong> Lägg in <code>print(…)</code>{' '}
          efter raderna du är osäker på och tryck på Kolla lösning. Då ser du
          värdena under Utskrift.
        </li>
      </>
    ),
  },
};
