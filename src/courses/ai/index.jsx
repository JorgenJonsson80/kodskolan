import { pythonExtensions, pythonHover } from '../python/editor/extensions';
import { errorTitle, explainError } from '../python/runner/friendlyErrors';
import { TIMEOUT_MS } from '../python/runner/python';
import ResponseView from '../flask/components/ResponseView';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { meta } from './meta';
import { evaluate } from './runner/evaluate';
import { onStatus, runAi, warmUp } from './runner/ai';
import { useWorkbench } from './useWorkbench';
import '../flask/flask.css';
import '../fastapi/fastapi.css';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// AI-kursen. Se Kontraktet i SPEC.md. Python-kursens Pyodide med FastAPI
// och en låtsasversion av Anthropics SDK (runner/ai_harness.py) i en egen
// worker. Inga riktiga modellanrop görs. I slutprojektet anropas
// FastAPI-appen som i FastAPI-kursen.
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
    run: runAi,
    evaluate,
    warmUp,
    onStatus,
    timeoutMs: TIMEOUT_MS,
    hasResult: run => Boolean(run.response) || run.output?.length > 0,
    statusText: {
      idle: '🤖 Modellen vilar',
      starting: '🤖 Startar Python och låtsasmodellen…',
      ready: '🤖 Låtsasmodellen är redo',
      loading: '🤖 Laddar…',
      failed: '🤖 Låtsasmodellen kunde inte starta',
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
        <kbd>Tab</kbd> drar in fyra mellanslag · det du skriver ut med print
        visas under Utskrift
      </>
    ),
  },

  errors: { errorTitle, explainError, icon: '🤖' },

  useWorkbench,
  ResultPreview: ResponseView,
  playground: {
    runs: true,
    intro: (
      <>
        Prata med låtsasmodellen: skriv Python som anropar den och tryck på{' '}
        <strong>Kör koden</strong>. Inga riktiga AI-anrop görs, så det kostar
        ingenting.
      </>
    ),
  },

  texts: {
    failedToStart:
      'Python kunde inte starta. Kolla internetanslutningen och ladda om sidan.',
    starting: 'Startar Python och låtsasmodellen…',
    running: 'Frågar modellen…',
    nothingPrinted:
      'Inget skrevs ut. Skriv ut svaret med print för att se vad modellen svarade.',
    warningsTitle: '⚠️ Bra att veta',
    docs: () => '📚 Läs mer i Claudes dokumentation (engelska)',
    readGuide: '📖 Läs i dokumentationen',
    learning: 'Python med språkmodeller',
    copyNote:
      'Bryt ner den: skriv ut hela svaret med print(svar) och titta på content och stop_reason.',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Kolla kolon, parenteser och indrag.',
        'Python är petig med tecken och indrag. Läs förklaringen nedan, så hittar du det.',
      ],
      crash: [
        'Koden stoppade med ett fel. Läs förklaringen – den pekar ut raden.',
        'Säger felet BadRequestError? Då är det något i anropet som modellen inte godtar. Felet säger vad.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Kolla testraderna nedan.',
        'Nära! Skriv ut hela svaret med print(svar) och se vad som kom tillbaka.',
        'Ingen fara, även proffs får tänka om sina prompter. Felet är en ledtråd, inte ett betyg.',
        'Kolla stop_reason: end_turn betyder klart, tool_use att modellen vill använda ett verktyg och max_tokens att svaret klipptes.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här bygger du program som använder språkmodeller: prompter, verktyg, egna dokument och agenter. Övningarna använder en låtsasmodell som svarar precis som det riktiga API:et',
    checkResult: (
      <>
        Skriv ut svaret med <code>print</code>. I slutprojektet ser du under{' '}
        <em>📮 Svaret</em> vad ditt API svarade.
      </>
    ),
    playground: 'med vilka frågor du vill',
    editor: (
      <>
        <li>
          Koden ser ut precis som mot det riktiga API:et. Byter du låtsasmodulen
          mot <code>pip install anthropic</code> och en egen nyckel fungerar den
          på riktigt.
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
          <strong>Skriv ut hela svaret.</strong> <code>print(svar)</code> visar
          content, stop_reason och usage på en gång.
        </li>
        <li>
          <strong>Läs felet.</strong> BadRequestError säger exakt vad i anropet
          som inte stämmer.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Ett anrop i taget.</strong> Få ett anrop att fungera innan du
        bygger loopen runt det. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Titta på det du skickar.</strong> Skriv ut meddelandelistan
          precis före anropet. Är rollerna och ordningen rätt?
        </li>
        <li>
          <strong>Välj block efter typ.</strong> Svaret kan ha flera block. Ta
          det med <code>type == 'text'</code>, inte bara det första.
        </li>
      </>
    ),
  },
};
