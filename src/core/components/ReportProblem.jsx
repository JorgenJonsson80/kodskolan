import { useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { problemReportUrl } from '../lib/contact';
import { supabase } from '../lib/supabase';

const KINDS = [
  ['fel', 'Rättningen säger fel fast jag tror att jag gjort rätt'],
  ['facit', 'Facit, ledtrådarna eller förklaringen är fel'],
  ['oklar', 'Uppgiften är svår att förstå'],
  ['annat', 'Något annat'],
];

// "Något fel i övningen?" längst ner i varje övning. Rapporten sparas i
// lesson_feedback (Supabase), även utan konto. Koden skickas bara om
// eleven kryssar i det. Utan Supabase blir det ett mejl i stället.
export default function ReportProblem({ course, lesson, code }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState('fel');
  const [message, setMessage] = useState('');
  const [withCode, setWithCode] = useState(false);
  const [state, setState] = useState('idle');

  if (!supabase) {
    const mail = problemReportUrl({ course, lesson });
    return mail ? (
      <p className="report-problem muted">
        <a href={mail}>🐞 Något fel i övningen?</a>
      </p>
    ) : null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setState('sending');
    const { error } = await supabase.from('lesson_feedback').insert({
      course_id: course.id,
      lesson_id: lesson.id,
      kind,
      message: message.trim(),
      code: withCode ? code : null,
    });
    if (error) {
      setState('error');
      return;
    }
    trackEvent('felrapport', { kurs: course.id, ovning: lesson.id, typ: kind });
    setState('sent');
  }

  if (state === 'sent') {
    return (
      <p className="report-problem" role="status">
        ✓ Tack! Vi tittar på det och lagar övningen om något är fel.
      </p>
    );
  }

  if (!open) {
    return (
      <p className="report-problem">
        <button
          type="button"
          className="link-button"
          onClick={() => setOpen(true)}
        >
          🐞 Något fel i övningen?
        </button>
      </p>
    );
  }

  return (
    <form className="report-problem report-form" onSubmit={handleSubmit}>
      <label>
        Vad är fel?
        <select value={kind} onChange={event => setKind(event.target.value)}>
          {KINDS.map(([value, text]) => (
            <option key={`kind-${value}`} value={value}>
              {text}
            </option>
          ))}
        </select>
      </label>
      <label>
        Berätta kort
        <textarea
          required
          maxLength={2000}
          rows={3}
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
      </label>
      <label className="report-check">
        <input
          type="checkbox"
          checked={withCode}
          onChange={event => setWithCode(event.target.checked)}
        />
        Skicka med min kod, så att ni kan se vad jag skrivit
      </label>
      <div className="report-actions">
        <button
          type="submit"
          className="primary-button"
          disabled={state === 'sending' || !message.trim()}
        >
          {state === 'sending' ? 'Skickar…' : 'Skicka'}
        </button>
        <button type="button" onClick={() => setOpen(false)}>
          Avbryt
        </button>
      </div>
      {state === 'error' && (
        <p className="feedback-error">
          Det gick inte att skicka. Försök igen om en stund.
        </p>
      )}
    </form>
  );
}
