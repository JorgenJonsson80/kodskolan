import { explainError } from '../runner/friendlyErrors';

// En förklaring på svenska under ett felmeddelande, om vi känner igen det.
export default function ErrorHint({ message, code }) {
  const explanation = explainError(message, code);
  if (!explanation) return null;
  return (
    <p className="error-hint">
      <span aria-hidden="true">🧭</span> Det betyder troligen:{' '}
      {explanation
        .split(/`([^`]+)`/)
        .map((part, index) =>
          index % 2 === 1 ? <code key={index}>{part}</code> : part,
        )}
    </p>
  );
}
