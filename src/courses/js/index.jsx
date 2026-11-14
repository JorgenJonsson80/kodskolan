import { isStringList, readJson } from '../../core/lib/storage';
import ResultPreview from './components/ResultPreview';
import { ideaStarterCode, ideas } from './data/ideas';
import {
  CONTENT_LOCK,
  LESSONS as lessons,
  PROJECT_STEPS as projectSteps,
  PROJECTS as projects,
} from './content';

import { quiz } from './data/quiz';
import { resources } from './data/resources';
import { tracks } from './data/tracks';
import { formatJs, jsExtensions, jsHover } from './editor/extensions';
import { meta } from './meta';
import { normalize } from './runner/normalize';
import { errorTitle, evaluateJs, explainError, runJs } from './runtime';
import { useWorkbench } from './useWorkbench';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Id:t en klarad bana sparas som bland de klara (som i kärnans quiz.js).
const passedId = trackId => `${trackId}-testad`;

const REACT_STARTER = `import { useState } from 'react';

// Ändra komponenten och tryck på Kör koden. Klicka sedan i
// förhandsvisningen och se i loggen varför den renderar.
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hej från Lekplatsen!</h1>
      <button onClick={() => setCount(count + 1)}>Klickat {count} gånger</button>
    </div>
  );
}
`;

const learnsReact = learnedTracks =>
  learnedTracks.some(title => title.startsWith('React'));

// JS Academy som kurs i Kodskolan. Se Kontraktet i SPEC.md.
export default {
  ...meta,

  content: {
    lock: CONTENT_LOCK,
    tracks,
    lessons,
    projects,
    projectSteps,
    ideas,
    ideaStarterCode,
    quiz,
    resources,
  },

  // JS Academy sparade klarade quiz under en egen nyckel i webbläsaren.
  // Här blir de <bana>-testad bland de klara, som i de andra kurserna.
  // (I kontot gjorde SQL:en till course_progress samma sak.)
  progress: {
    legacyCompleted: () =>
      readJson('academy-passed-tracks', [], isStringList).map(passedId),
  },

  runtime: {
    run: runJs,
    evaluate: evaluateJs(tracks[0].id),
    hasResult: run => Boolean(run.previewSource),
  },

  editor: {
    extensions: jsExtensions,
    describeAt: jsHover,
    format: formatJs,
    comment: text => `// ${text}`,
    codeFence: ({ lesson, learnedTracks }) =>
      lesson.fileName?.endsWith('.jsx') || learnsReact(learnedTracks)
        ? 'jsx'
        : 'js',
    normalize,
    tips: <>förslag dyker upp när du skriver</>,
  },

  errors: { errorTitle, explainError, icon: '🧭' },

  useWorkbench,
  ResultPreview,
  playground: {
    runs: true,
    intro: (
      <>
        Skriv vad du vill, tryck på <strong>Kör koden</strong> och se vad som
        händer i konsolen.
      </>
    ),
    slots: [
      { key: 'react', label: '⚛️ React-komponent', starter: REACT_STARTER },
    ],
  },

  texts: {
    failedToStart: 'Koden kunde inte köras. Ladda om sidan och försök igen.',
    running: 'Kör koden…',
    outputLabel: 'Konsol',
    nothingPrinted:
      'Inget skrevs ut. Använd console.log för att se vad koden gör.',
    warningsTitle: '💡 Tips',
    docs: () => '📚 Läs mer i dokumentationen',
    readGuide: '📖 Läs på javascript.info',
    learning: ({ learnedTracks }) =>
      learnsReact(learnedTracks) ? 'JavaScript och React' : 'JavaScript',
    copyNote: 'Bryt ner den: kör en bit i taget och lägg in console.log.',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Alla glömmer citattecken och parenteser ibland.',
        'Datorn är petig med tecken. Läs förklaringen nedan, så hittar du det.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vad som saknas.',
        'Nära! Läs vad som gick fel och ändra en sak i taget.',
        'Ingen fara, programmerare får fel hela tiden. Felet är en ledtråd, inte ett betyg.',
        'Den här är klurig. Testa en ledtråd, eller 👣 Kör rad för rad för att se vad som händer.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här lär du dig JavaScript och sedan React genom att skriva riktig kod',
    checkResult: (
      <>
        Under <em>Konsol</em> ser du det din kod skrev ut.
      </>
    ),
    editor: (
      <>
        <li>
          <kbd>{MOD}+Shift+F</kbd> formaterar koden, så att indrag och semikolon
          blir snygga.
        </li>
        <li>
          Förslag dyker upp när du skriver: dina egna variabler, egenskaperna i
          dina objekt efter en punkt och metoder som <code>console.</code>. Välj
          med <kbd>Enter</kbd>.
        </li>
        <li>
          Håll musen över ett namn för att se vad det är och vad det tillhör,
          eller över ett nyckelord för att se när man använder det.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Läs felmeddelandet.</strong> Det berättar ofta exakt vad som
          är fel, t.ex. <code>ReferenceError: x is not defined</code> när ett
          namn är felstavat.
        </li>
        <li>
          <strong>Kör rad för rad.</strong> Knappen 👣 stegar igenom koden en
          rad i taget och visar vad varje variabel innehåller. Perfekt för
          loopar, <code>map</code> och <code>reduce</code>.
        </li>
        <li>
          <strong>Varför renderade den?</strong> Under förhandsvisningen i
          React-övningarna, och på Lekplatsen med ⚛️ React-komponent, visar en
          logg vad som får varje komponent att rendera om.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Använd console.log.</strong> Skriv ut värden mitt i koden för
        att se vad som faktiskt händer. Det gör proffs också.
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
          <strong>Se vad som händer.</strong> Lägg in{' '}
          <code>console.log(…)</code> efter raderna du är osäker på och tryck på
          Kolla lösning. Då ser du värdena i konsolen.
        </li>
      </>
    ),
  },
};
