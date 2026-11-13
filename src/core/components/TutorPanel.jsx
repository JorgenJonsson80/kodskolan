import { useState } from 'react';
import { useCourse } from '../course';
import { hasAccess, PAYWALL } from '../lib/access';
import { whatHappened } from '../lib/aiPrompt';
import { trackEvent } from '../lib/analytics';
import { supabase } from '../lib/supabase';
import CodeText from './CodeText';

// 🤖 AI-handledaren under övningen (supabase/functions/ai-tutor). Den ser
// övningen, elevens kod och vad som hände senast, och svarar med ledtrådar
// – aldrig facit. Bara för den som har full tillgång; när låset är på ser
// andra en rad om att den ingår.
export default function TutorPanel({ lesson, code, feedback, user, access }) {
  const course = useCourse();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [state, setState] = useState('idle');
  const [error, setError] = useState(null);

  if (!supabase || access === null) return null;
  const allowed = Boolean(user) && hasAccess(access, course.id);
  if (!allowed) {
    if (!PAYWALL) return null;
    return (
      <p className="tutor-teaser muted">
        🤖 Fastnat? <strong>AI-handledaren</strong> tittar på din kod och ger
        dig en ledtråd – ingår i{' '}
        <a href={`${import.meta.env.BASE_URL}konto#tillgang`}>full tillgång</a>.
      </p>
    );
  }

  async function handleAsk(event) {
    event.preventDefault();
    setState('asking');
    setError(null);
    const { data, error: failed } = await supabase.functions.invoke(
      'ai-tutor',
      {
        body: {
          course: course.id,
          title: lesson.title,
          task: lesson.task,
          code,
          error: whatHappened(feedback, course.errors.explainError),
          question: question.trim(),
        },
      },
    );
    setState('idle');
    if (failed || !data?.answer) {
      // Funktionen svarar med ett fel som går att visa (t.ex. slut för i dag).
      let message = 'Handledaren svarar inte just nu. Försök igen om en stund.';
      try {
        message = (await failed?.context?.json())?.error ?? message;
      } catch {
        // Inget svar att läsa – behåll meddelandet ovan.
      }
      setError(message);
      return;
    }
    trackEvent('ai_handledare', { kurs: course.id, ovning: lesson.id });
    setAnswer(data.answer);
    setRemaining(data.remaining);
    setQuestion('');
  }

  return (
    <section className="card tutor-panel" aria-labelledby="tutor-title">
      <h3 id="tutor-title">🤖 Fråga AI-handledaren</h3>
      {answer && (
        <div className="tutor-answer" aria-live="polite">
          {answer.split('\n\n').map((part, index) => (
            <p key={`svar-${index}`}>
              <CodeText text={part} />
            </p>
          ))}
        </div>
      )}
      <form className="tutor-form" onSubmit={handleAsk}>
        <textarea
          required
          maxLength={1000}
          rows={2}
          placeholder="T.ex. Varför blir det fel på rad 3?"
          aria-label="Din fråga till AI-handledaren"
          value={question}
          onChange={event => setQuestion(event.target.value)}
        />
        <button
          type="submit"
          className="primary-button"
          disabled={state === 'asking' || !question.trim()}
        >
          {state === 'asking' ? 'Tänker…' : 'Fråga'}
        </button>
      </form>
      <p className="muted tutor-note">
        Handledaren ser uppgiften, din kod och vad som hände senast. Den ger
        ledtrådar, inte facit.
        {remaining !== null && ` ${remaining} frågor kvar i dag.`}
      </p>
      {error && <p className="feedback-error">{error}</p>}
    </section>
  );
}
