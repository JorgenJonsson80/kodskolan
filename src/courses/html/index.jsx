import { IDEAS, ideaStarterCode } from './data/ideas';
import { LESSONS } from './data/lessons';
import { PROJECT_STEPS, PROJECTS } from './data/projects';
import { QUIZ } from './data/quiz';
import { RESOURCES } from './data/resources';
import { TRACKS } from './data/tracks';
import { htmlExtensions, htmlHover } from './editor/extensions';
import { meta } from './meta';
import { evaluate } from './runner/evaluate';
import { errorTitle, explainError } from './runner/friendlyErrors';
import { runPage } from './runner/page';
import { useWorkbench } from './useWorkbench';
import './html.css';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// HTML & CSS Academy som kurs i Kodskolan. Se Kontraktet i SPEC.md.
// Sidan rättas i webbläsaren direkt, så det finns inget att starta.
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

  runtime: { run: runPage, evaluate },

  editor: {
    extensions: htmlExtensions,
    describeAt: htmlHover,
    comment: text => `<!-- ${text} -->`,
    codeFence: 'html',
    // Facit jämförs utan kommentarer, blanksteg och sorts citattecken.
    normalize: code =>
      code
        .replace(/<!--[^]*?-->|\/\*[^]*?\*\//g, '')
        .replace(/"/g, "'")
        .replace(/\s/g, ''),
    tips: (
      <>
        <kbd>Tab</kbd> drar in två mellanslag · skriv <code>&lt;</code> så
        föreslås taggar
      </>
    ),
  },

  errors: { errorTitle, explainError, icon: '🧩' },

  useWorkbench,
  playground: {
    runs: false,
    intro: 'Skriv vad du vill, och se sidan växa fram under editorn.',
  },

  texts: {
    failedToStart: 'Sidan kunde inte rättas. Ladda om sidan och försök igen.',
    running: 'Rättar…',
    warningsTitle: '⚠️ Webbläsaren fick gissa här',
    // "på MDN" bara när alla länkar går dit.
    docs: track =>
      `📚 Läs mer ${track.docs.every(doc => doc.url.includes('mozilla.org')) ? 'på MDN ' : ''}(engelska)`,
    readGuide: '📖 Läs på MDN',
    learning: 'HTML och CSS',
    copyNote: 'Bryt ner den: ta bort en bit i taget och se vad som händer.',
  },

  help: {
    intro: 'Här lär du dig HTML och CSS genom att bygga riktiga webbsidor',
    checkResult: 'Din sida syns hela tiden under editorn, medan du skriver.',
    editor: (
      <>
        <li>
          <kbd>Tab</kbd> drar in raden två mellanslag. Webbläsaren bryr sig inte
          om indrag, men det gör koden lättare att läsa: du ser vilka taggar som
          ligger inuti vilka.
        </li>
        <li>
          <kbd>{MOD}+/</kbd> gör raden till en kommentar,{' '}
          <code>&lt;!-- så här --&gt;</code>, så att den inte syns på sidan.
        </li>
        <li>
          Skriv <code>&lt;</code> så dyker taggar upp som förslag, och när du
          skriver <code>&lt;/</code> stängs taggen åt dig. Välj med{' '}
          <kbd>Enter</kbd>.
        </li>
      </>
    ),
    firstTips: (
      <li>
        <strong>Titta på sidan.</strong> Syns inte det du skrev? Då är det ofta
        en tagg som inte är stängd, eller ett stavfel i taggens namn.
      </li>
    ),
    laterTips: (
      <li>
        <strong>Färga för att se.</strong> Ge ett element en tillfällig{' '}
        <code>outline: 2px solid red</code> för att se exakt var det ligger och
        hur stort det är. Det gör proffs också.
      </li>
    ),
    stuckTips: (
      <li>
        <strong>Titta på sidan.</strong> Förhandsvisningen under editorn visar
        precis vad webbläsaren gör av koden. Saknas något där, leta efter en
        tagg som inte är stängd.
      </li>
    ),
  },
};
