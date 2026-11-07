import * as pyErrors from '../python/runner/friendlyErrors';
import { TIMEOUT_MS } from '../python/runner/python';
import * as tsErrors from '../ts/runner/friendlyErrors';
import FullstackResult from './components/FullstackResult';
import { PLAYGROUND_API, PLAYGROUND_PAGE } from './data/files';
import { LESSONS } from './data/lessons';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { describeAt, extensions, format, normalize } from './editor';
import { meta } from './meta';
import { onStatus, run, warmUp } from './runner/browser';
import { evaluateFullstack } from './runner/runtime';
import { useWorkbench } from './useWorkbench';
import '../flask/flask.css';
import './fullstack.css';

const errorsFor = error => (error?.lang === 'tsx' ? tsErrors : pyErrors);

// Fullstack-kursen. Se Kontraktet i SPEC.md och docs/kurser/fullstack.md.
// Varje övning gäller en av två filer: app.py (Flask-kursens körning) eller
// App.tsx (TypeScript-kursens). Den andra filen visas bredvid, och sidans
// fetch går till Flask-appen på riktigt, se runner/runtime.js.
export default {
  ...meta,

  content: {
    tracks: TRACKS,
    lessons: LESSONS,
    projects: [],
    projectSteps: [],
    ideas: [],
    ideaStarterCode: () => PLAYGROUND_API,
    quiz: QUIZ,
    resources: RESOURCES,
  },

  runtime: {
    run,
    evaluate: evaluateFullstack,
    warmUp,
    onStatus,
    timeoutMs: TIMEOUT_MS,
    hasResult: result => Boolean(result.response || result.previewSource),
    statusText: {
      idle: '🧩 Flask och TypeScript vilar',
      starting: '🧩 Startar Flask och TypeScript…',
      ready: '🧩 Flask och TypeScript är redo',
      loading: '🧩 Laddar…',
      failed: '🧩 Kunde inte starta',
    },
  },

  editor: {
    extensions,
    describeAt,
    format,
    normalize,
    comment: text => `# ${text}`,
    codeFence: ({ lesson }) => (lesson?.lang === 'tsx' ? 'tsx' : 'python'),
    tips: (
      <>
        📄 ovanför editorn är den andra filen · 📮 anropar app.py · röd linje =
        typfel i App.tsx
      </>
    ),
  },

  errors: {
    errorTitle: (error, isSyntax) =>
      errorsFor(error).errorTitle(error, isSyntax),
    explainError: error => errorsFor(error).explainError(error),
    icon: '🧩',
  },

  useWorkbench,
  ResultPreview: FullstackResult,
  playground: {
    runs: true,
    intro: (
      <>
        Skriv en Flask-app och anropa den med 📮, eller välj{' '}
        <strong>⚛️ Sida mot Tassens API</strong> under Bygg och gör en
        React-sida som hämtar från ett färdigt API. Tryck på{' '}
        <strong>Kör koden</strong>.
      </>
    ),
    slots: [
      {
        key: 'sida',
        label: '⚛️ Sida mot Tassens API',
        starter: PLAYGROUND_PAGE,
      },
    ],
  },

  texts: {
    failedToStart:
      'Flask eller TypeScript kunde inte starta. Kolla internetanslutningen och ladda om sidan.',
    starting: 'Startar Flask och TypeScript…',
    running: 'Kör…',
    nothingPrinted:
      'Inget skrevs ut. Svaret från appen och sidan visas under utskriften.',
    warningsTitle: '⚠️ Bra att veta',
    docs: () => '📚 Läs mer (engelska)',
    readGuide: '📖 Läs i dokumentationen',
    learning: ({ lesson } = {}) =>
      lesson?.lang === 'tsx'
        ? 'React med TypeScript mot ett Flask-API'
        : 'Flask (Python) för en React-sida',
    copyNote:
      'Ta en sida i taget: fungerar API:t med 📮? Gör sidan rätt anrop? Läs svaret i förhandsvisningen.',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Läs förklaringen nedan.',
        'Kolla vilken fil du är i: Python vill ha kolon och indrag, TypeScript klamrar och semikolon.',
      ],
      crash: [
        'Ett fel med rad och förklaring – läs den, den pekar ut var det tog stopp.',
        'Är det ett typfel? Håll musen över namnet så ser du vad TypeScript tror att det är.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Kolla testraderna nedan.',
        'Nära! Är felet i sidan eller i API:t? Anropa API:t med 📮 för att se vad det svarar.',
        'Ingen fara, fullstack betyder två ställen att leta på. Ta ett i taget.',
        'Klicka runt i sidan under feedbacken. Den pratar med appen på riktigt.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här kopplar du ihop det du lärt dig: en React-sida i TypeScript som hämtar och skickar data till ett API i Flask',
    checkResult: (
      <>
        I app.py ser du svaret på <em>📮 Anropa</em> och sidan som hämtar från
        din app. I App.tsx kontrolleras typerna först, och sedan körs sidan mot
        Flask-appen. Klicka i förhandsvisningen – anropen går till appen på
        riktigt.
      </>
    ),
    playground: 'med vilka anrop och sidor du vill',
    editor: (
      <>
        <li>
          <strong>📄 Den andra filen</strong> står ovanför editorn. När du
          skriver API:t är det sidan, och när du skriver sidan är det API:t.
        </li>
        <li>
          <strong>📮 Anropa</strong> under editorn (i app.py) väljer vilket
          anrop appen får.
        </li>
        <li>
          En <strong>röd linje</strong> i App.tsx är ett typfel. Håll musen över
          den för att se vad som är fel.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Börja med API:t.</strong> Svarar det rätt i 📮 är halva jobbet
          gjort. Sedan är det sidans tur.
        </li>
        <li>
          <strong>Läs statuskoden.</strong> 404 betyder att vägen inte finns,
          400 att något i anropet var fel och 401 att man måste logga in.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Samma form på båda sidor.</strong> Typen i App.tsx ska stämma
        med det app.py returnerar. Ändrar du det ena, ändra det andra.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Vem har fel?</strong> Anropa samma adress med 📮 i app.py,
          eller titta i 📄 app.py när du skriver sidan. Stämmer namnen på
          fälten?
        </li>
        <li>
          <strong>Skriv ut.</strong> <code>console.log(data)</code> i sidan
          eller <code>print(data)</code> i appen visar vad som faktiskt skickas.
        </li>
      </>
    ),
  },
};
