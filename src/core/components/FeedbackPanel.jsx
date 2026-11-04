import Avatar from './Avatar';
import DiffView from './DiffView';
import CodeText from './CodeText';
import ErrorBox from './ErrorBox';
import { useCourse } from '../course';

export default function FeedbackPanel({ feedback, stage }) {
  const { ResultPreview, texts } = useCourse();
  if (!feedback) return null;
  return (
    <div aria-live="polite">
      {feedback.isCorrect ? (
        <p className="feedback-message feedback-success">
          {feedback.message}
          {feedback.xpGained > 0 && (
            <span className="xp-pop"> +{feedback.xpGained} XP</span>
          )}
        </p>
      ) : (
        <div className="feedback-try-again">
          {stage && <Avatar stage={stage} size={44} />}
          <p className="feedback-bubble">{feedback.message}</p>
        </div>
      )}
      {ResultPreview && <ResultPreview result={feedback} />}
      {feedback.output?.length > 0 && (
        <figure className="console-output">
          <figcaption>{texts.outputLabel ?? 'Utskrift'}</figcaption>
          <pre>{feedback.output.join('\n')}</pre>
        </figure>
      )}
      {feedback.warnings?.length > 0 && (
        <div className="feedback-warnings">
          <p className="feedback-warnings-title">{texts.warningsTitle}</p>
          <ul>
            {feedback.warnings.map((warning, index) => (
              <li key={`warning-${index}`}>
                <CodeText text={warning} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {feedback.error && <ErrorBox error={feedback.error} />}
      {feedback.results?.length > 0 && (
        <ul className="test-results">
          {feedback.results.map((result, index) => (
            <li
              key={`test-${index}`}
              className={result.passed ? 'feedback-success' : 'feedback-error'}
            >
              {result.passed ? '✓ ' : '✗ '}
              {result.description}
              {result.text && <span> — {result.text}</span>}
              {result.diff && (
                <DiffView
                  actual={result.diff.actual}
                  expected={result.diff.expected}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
