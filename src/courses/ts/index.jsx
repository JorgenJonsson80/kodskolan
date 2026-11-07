import ResultPreview from '../js/components/ResultPreview';
import { normalize } from '../js/runner/normalize';
import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { formatTs, tsExtensions, tsHover } from './editor/extensions';
import { meta } from './meta';
import { errorTitle, explainError } from './runner/friendlyErrors';
import { onStatus, warmUp } from './runner/ts';
import { evaluateTs, runTs } from './runtime';
import { useWorkbench } from './useWorkbench';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

const REACT_STARTER = `import { useState } from 'react';

type Props = { namn: string };

// Ändra komponenten och tryck på Kör koden. Prova att ge Hej ett tal
// i stället för text och se vad TypeScript säger.
function Hej({ namn }: Props) {
  const [antal, setAntal] = useState(0);
  return (
    <button onClick={() => setAntal(antal + 1)}>
      Hej {namn}! Klickat {antal} gånger
    </button>
  );
}

export default function App() {
  return <Hej namn="Ada" />;
}
`;

// TypeScript-kursen. Se Kontraktet i SPEC.md. Kompilatorn kontrollerar
// typerna i en worker (runner/ts.js), och sedan körs koden med JS-kursens
// rättning, förhandsvisning och React.
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
    run: runTs,
    evaluate: evaluateTs,
    warmUp,
    onStatus,
    hasResult: run => Boolean(run.previewSource),
    statusText: {
      idle: '🔷 TypeScript vilar',
      starting: '🔷 Startar TypeScript…',
      ready: '🔷 TypeScript är redo',
      failed: '🔷 TypeScript kunde inte starta',
    },
  },

  editor: {
    extensions: tsExtensions,
    describeAt: tsHover,
    format: formatTs,
    comment: text => `// ${text}`,
    codeFence: ({ lesson }) =>
      lesson?.track === 'react' || lesson?.track === 'slutprojekt'
        ? 'tsx'
        : 'ts',
    normalize,
    tips: <>röd linje = typfel, förslagen känner till typerna</>,
  },

  errors: { errorTitle, explainError, icon: '🔷' },

  useWorkbench,
  ResultPreview,
  playground: {
    runs: true,
    intro: (
      <>
        Skriv vad du vill och tryck på <strong>Kör koden</strong>. TypeScript
        kontrollerar typerna först och kör sedan koden.
      </>
    ),
    slots: [
      { key: 'react', label: '⚛️ React-komponent', starter: REACT_STARTER },
    ],
  },

  texts: {
    failedToStart:
      'TypeScript kunde inte starta. Ladda om sidan och försök igen.',
    starting: 'Startar TypeScript…',
    running: 'Kontrollerar och kör…',
    outputLabel: 'Konsol',
    nothingPrinted:
      'Inget skrevs ut. Använd console.log för att se vad koden gör.',
    docs: () => '📚 Läs mer i handboken (engelska)',
    readGuide: '📖 Läs i TypeScripts handbok',
    learning: 'TypeScript',
    copyNote:
      'Läs typfelet en bit i taget: vilken typ väntade sig TypeScript, och vilken fick den?',
    encouragement: {
      syntax: [
        'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Läs förklaringen nedan.',
        'Datorn är petig med tecken. Kolla raden i felet, och raden före.',
      ],
      crash: [
        'Ett typfel är TypeScript som hjälper dig. Läs vad den väntade sig och vad den fick.',
        'Håll musen över namnet i felet, så ser du vilken typ TypeScript tror att det har.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vad som saknas.',
        'Nära! Läs vad som gick fel och ändra en sak i taget.',
        'Ingen fara, alla får typfel hela tiden. Felet är en ledtråd, inte ett betyg.',
        'Den här är klurig. Håll musen över namnen och se vilka typer TypeScript ser.',
        'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
      ],
    },
  },

  help: {
    intro:
      'Här lär du dig TypeScript, JavaScript med typer, genom att skriva riktig kod som kontrolleras av TypeScripts egen kompilator',
    checkResult: (
      <>
        Först kontrolleras typerna. Är de rätt körs koden, och under{' '}
        <em>Konsol</em> ser du vad den skrev ut.
      </>
    ),
    editor: (
      <>
        <li>
          En <strong>röd linje</strong> under koden är ett typfel. Håll musen
          över den för att se vad som är fel.
        </li>
        <li>
          Håll musen över ett namn för att se vilken typ TypeScript har räknat
          ut, t.ex. <code>const pris: number</code>.
        </li>
        <li>
          Förslag dyker upp när du skriver, t.ex. egenskaperna i ett objekt
          efter en punkt. Välj med <kbd>Enter</kbd>.
        </li>
        <li>
          <kbd>{MOD}+Shift+F</kbd> formaterar koden.
        </li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Läs typfelet.</strong> Det säger vilken typ TypeScript väntade
          sig och vilken den fick, t.ex. att det ska vara ett tal men är text.
        </li>
        <li>
          <strong>Håll musen över namnen.</strong> Då ser du vad TypeScript tror
          att varje variabel är. Ofta syns felet direkt.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Lita på typerna.</strong> Är typerna rätt brukar koden också
        vara det. Börja med att skriva typen, och skriv sedan koden som passar
        den.
      </li>
    ),
    stuckTips: (
      <>
        <li>
          <strong>Håll musen över allt.</strong> Gå igenom namnen ett i taget
          och se vilken typ de har. Någonstans skiljer det sig från vad du
          tänkt.
        </li>
        <li>
          <strong>Skriv ut värdet.</strong> Typerna stämmer men svaret är fel?
          Lägg in <code>console.log(…)</code> och kolla vad koden faktiskt gör.
        </li>
      </>
    ),
  },
};
