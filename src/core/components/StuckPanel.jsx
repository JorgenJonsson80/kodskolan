import { useState } from 'react';
import { useCourse } from '../course';
import { videoSearchUrl } from '../resources';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const COMMENT_KEYS = isMac ? 'Cmd+/' : 'Ctrl+/';
// Så många felaktiga försök innan panelen öppnar sig själv.
const OPEN_AFTER = 3;

// Andra sätt att förstå när ledtrådarna inte räcker: bryt ner koden i
// mindre delar, fråga en AI som handledare eller lär dig ämnet från en
// annan källa.
// resources: banans ämnen från data/resources.js.
// aiPrompt: en färdig fråga att klistra in hos en AI, se lib/aiPrompt.js.
export default function StuckPanel({
  resources,
  failedAttempts,
  onBreakDown,
  aiPrompt,
}) {
  // null tills man själv öppnat eller stängt panelen.
  const { texts } = useCourse();
  const [chosenOpen, setChosenOpen] = useState(null);
  const isOpen = chosenOpen ?? failedAttempts >= OPEN_AFTER;
  // null, 'copied' eller 'failed'.
  const [copyStatus, setCopyStatus] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopyStatus('copied');
    } catch {
      // Utan tillgång till urklipp visas frågan, så att man kan kopiera själv.
      setCopyStatus('failed');
      setShowPrompt(true);
    }
  }

  return (
    <details
      className="stuck-panel"
      open={isOpen}
      onToggle={event => setChosenOpen(event.currentTarget.open)}
    >
      <summary>🆘 Fastnat? Andra sätt att förstå</summary>

      <h3>Bryt ner koden</h3>
      <ul>
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
        <li>
          <strong>En sak i taget.</strong> Markera rader och tryck{' '}
          <kbd>{COMMENT_KEYS}</kbd> för att kommentera bort dem. Få första delen
          att fungera innan du tar nästa.
        </li>
        <li>
          <strong>Håll musen över</strong> det du inte känner igen i editorn, så
          ser du vad det är.
        </li>
        <li>
          <strong>Förklara koden högt</strong>, rad för rad, som för en kompis
          eller en gummianka 🦆. Ofta hittar man felet själv halvvägs.
        </li>
      </ul>
      <button type="button" onClick={onBreakDown}>
        📋 Bryt ner den på Lekplatsen
      </button>
      <p className="muted stuck-note">
        Din kod kopieras till Lekplatsen, där du kan köra bitar av den fritt
        utan tester.
      </p>

      <h3>Fråga en AI</h3>
      <p className="stuck-ai-intro">
        Kopiera en färdig fråga och klistra in den hos ChatGPT, Claude, Gemini
        eller Copilot. Frågan innehåller uppgiften och din kod, och ber AI:n
        hjälpa dig att förstå – inte ge dig svaret.
      </p>
      <div className="stuck-ai-actions">
        <button type="button" onClick={handleCopy}>
          🤖 Kopiera frågan till din AI
        </button>
        <span aria-live="polite" className="stuck-ai-status">
          {copyStatus === 'copied' && '✅ Kopierad! Klistra in hos din AI.'}
          {copyStatus === 'failed' &&
            'Kunde inte kopiera automatiskt – markera texten nedan och kopiera den.'}
        </span>
      </div>
      <details
        className="stuck-ai-prompt"
        open={showPrompt}
        onToggle={event => setShowPrompt(event.currentTarget.open)}
      >
        <summary>Visa frågan</summary>
        <pre>{aiPrompt}</pre>
      </details>

      {resources.length > 0 && (
        <>
          <h3>Lär dig ämnet på ett annat sätt</h3>
          <ul className="stuck-resources">
            {resources.map(item => (
              <li key={item.topic}>
                <strong>{item.topic}</strong>
                <span>
                  <a href={item.read} target="_blank" rel="noreferrer">
                    {texts.readGuide}
                  </a>
                  {' · '}
                  <a
                    href={videoSearchUrl(item.video)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🎥 Hitta en video
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="muted stuck-note">
            Guiden och de flesta videor är på engelska. Sätt på textning och
            sänk hastigheten om det går fort.
          </p>
        </>
      )}
    </details>
  );
}
