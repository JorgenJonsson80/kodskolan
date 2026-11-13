import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { gitExtensions, gitHover } from './editor/extensions';
import { meta } from './meta';
import { evaluate } from './runner/evaluate';
import { errorTitle, explainError } from './runner/friendlyErrors';
import { runTerminal, TIMEOUT_MS } from './runner/run';
import { useWorkbench } from './useWorkbench';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Git och terminalen. Se Kontraktet i SPEC.md och docs/kurser/git.md.
// En låtsasterminal med en förenklad Git (runner/), som körs direkt i
// sidan.
export default {
  ...meta,
  // Terminalen och första commiten är gratis.
  freeTracks: 3,

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
    run: runTerminal,
    evaluate,
    warmUp: () => Promise.resolve(),
    timeoutMs: TIMEOUT_MS,
  },

  editor: {
    extensions: gitExtensions,
    describeAt: gitHover,
    comment: text => `# ${text}`,
    codeFence: 'bash',
    normalize: code =>
      code.replace(/#.*$/gm, '').replace(/"/g, "'").replace(/\s/g, ''),
    tips: <>en rad är ett kommando</>,
  },

  errors: { errorTitle, explainError, icon: '🌿' },

  useWorkbench,
  playground: {
    runs: true,
    intro: (
      <>
        En tom terminal att prova i. Skriv kommandon, ett per rad, och tryck på{' '}
        <strong>Kör koden</strong>. Allt börjar om varje gång, så du kan inte
        förstöra något.
      </>
    ),
  },

  texts: {
    failedToStart: 'Terminalen kunde inte starta. Ladda om sidan.',
    starting: 'Startar terminalen…',
    running: 'Kör kommandona…',
    nothingPrinted:
      'Kommandona skrev inte ut något. Det är vanligt – mkdir och cd svarar inte när det går bra. Använd ls och pwd för att se läget.',
    warningsTitle: '⚠️ Bra att veta',
    docs: () => '📚 Läs mer (engelska)',
    readGuide: '📖 Läs mer',
    learning: 'terminalen och Git',
    copyNote:
      'Bryt ner det: kör ett kommando i taget och titta med ls, pwd och git status.',
    encouragement: {
      syntax: [
        'Ett citattecken eller ett mellanslag fattas. Läs förklaringen nedan.',
      ],
      crash: [
        'Ett kommando gick inte. Det är vanligt – terminalen säger alltid varför.',
        'Felet pekar ut raden. Kolla var du står med pwd och vad som finns med ls.',
      ],
      tests: [
        'Inte än – men det är så man lär sig. Jämför med testerna nedan.',
        'Nära! Kolla med ls och pwd att allt hamnade där det skulle.',
      ],
    },
  },

  help: {
    intro:
      'Här lär du dig terminalen och Git genom att skriva riktiga kommandon',
    checkResult: (
      <>
        Under <em>Utskrift</em> ser du terminalen: varje kommando efter{' '}
        <code>$</code> och vad det svarade.
      </>
    ),
    playground: 'i en tom terminal',
    editor: (
      <>
        <li>
          Varje rad är ett kommando. <kbd>{MOD}+Enter</kbd> kör dem, uppifrån
          och ner.
        </li>
        <li>
          Rader som börjar med <code>#</code> är kommentarer och hoppas över.
        </li>
        <li>Håll musen över ett kommando för att se vad det gör.</li>
      </>
    ),
    firstTips: (
      <>
        <li>
          <strong>Titta var du står.</strong> <code>pwd</code> och{' '}
          <code>ls</code> svarar på det mesta.
        </li>
        <li>
          <strong>Läs felet.</strong> Det står vilket kommando som inte gick och
          varför, med en förklaring på svenska.
        </li>
      </>
    ),
    laterTips: (
      <li>
        <strong>Kör git status ofta.</strong> Den säger vad som har ändrats och
        vad nästa steg är. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <li>
        <strong>Ett kommando i taget.</strong> Ta bort raderna efter den som
        krånglar, kör och titta med <code>ls</code> och <code>pwd</code>.
      </li>
    ),
  },
};
