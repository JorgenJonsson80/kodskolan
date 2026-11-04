import ResultPreview from './components/ResultPreview';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { pythonExtensions, pythonHover } from './editor/extensions';
import { evaluate } from './runner/evaluate';
import { errorTitle, explainError } from './runner/friendlyErrors';
import { onStatus, runPython, TIMEOUT_MS, warmUp } from './runner/python';
import { meta } from './meta';
import { useWorkbench } from './useWorkbench';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Python Academy som kurs i Kodskolan. Se Kontraktet i SPEC.md.
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
    run: runPython,
    evaluate,
    warmUp,
    onStatus,
    timeoutMs: TIMEOUT_MS,
    statusText: {
      idle: '🐍 Python vilar',
      starting: '🐍 Startar Python…',
      ready: '🐍 Python är redo',
      loading: '🐼 Laddar pandas…',
      failed: '🐍 Python kunde inte starta',
    },
  },

  editor: {
    extensions: pythonExtensions,
    describeAt: pythonHover,
    comment: text => `# ${text}`,
    codeFence: 'python',
    tips: (
      <>
        <kbd>Tab</kbd> drar in fyra mellanslag
      </>
    ),
  },

  errors: { errorTitle, explainError, icon: '🐍' },

  useWorkbench,
  ResultPreview,

  texts: {
    failedToStart:
      'Python kunde inte starta. Kolla internetanslutningen och ladda om sidan.',
    starting: 'Startar Python…',
    docs: '📚 Läs mer i Pythons dokumentation (engelska)',
    readGuide: '📖 Läs i Pythons guide',
    learning: 'Python',
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
    intro: 'Här lär du dig Python genom att skriva riktig kod',
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
    tools: (
      <li>
        <strong>Kör rad för rad.</strong> Knappen 👣 stegar igenom koden en rad
        i taget och visar vad varje variabel innehåller. Under varje steg står
        vad raden gjorde: om villkoret var sant, vilket varv loopen är på och
        vad en funktion lämnar tillbaka. Slå på 🤔 Gissa först och gissa själv
        innan du ser svaret, eller tryck ▶ Spela upp och se allt köras.
      </li>
    ),
  },
};
