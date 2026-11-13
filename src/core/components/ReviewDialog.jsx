import { useEffect, useRef, useState } from 'react';
import { shuffleOptions } from '../quiz';

// 🔁 Repetera: några gamla quizfrågor i taget. onAnswer sparar varje svar
// direkt, så att inget går förlorat om man stänger mitt i.
export default function ReviewDialog({ questions, tracks, onAnswer, onClose }) {
  const dialogRef = useRef(null);
  const [list] = useState(() =>
    questions.map(question => ({
      ...question,
      ...shuffleOptions(question.options),
    })),
  );
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(0);
  const done = index >= list.length;
  const question = list[index];

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleChoose(optionIndex) {
    if (chosen !== null) return;
    setChosen(optionIndex);
    const isRight = optionIndex === question.answer;
    if (isRight) setCorrect(count => count + 1);
    onAnswer(question.key, isRight);
  }

  function handleNext() {
    setChosen(null);
    setIndex(index + 1);
  }

  const trackTitle = id => tracks.find(track => track.id === id)?.title;

  return (
    <dialog
      ref={dialogRef}
      className="quiz"
      onClose={onClose}
      aria-labelledby="review-title"
    >
      <h2 id="review-title">🔁 Repetera</h2>
      {done ? (
        <>
          <p className="feedback-success">
            Klart! {correct} av {list.length} rätt.
          </p>
          <p className="muted">
            Frågorna du kunde kommer tillbaka om några dagar, de andra i morgon.
            Så sitter det kvar.
          </p>
          <form method="dialog">
            <button className="primary-button" type="submit">
              Stäng
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="muted">
            Fråga {index + 1} av {list.length} · {trackTitle(question.trackId)}
          </p>
          <p className="quiz-question">{question.question}</p>
          {question.code && (
            <pre className="quiz-code">
              <code>{question.code}</code>
            </pre>
          )}
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => {
              let className = 'quiz-option';
              if (chosen !== null && optionIndex === question.answer)
                className += ' is-correct';
              else if (optionIndex === chosen) className += ' is-wrong';
              return (
                <button
                  key={`svar-${optionIndex}`}
                  type="button"
                  className={className}
                  onClick={() => handleChoose(optionIndex)}
                  disabled={chosen !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <div className="quiz-explain" aria-live="polite">
              <p
                className={
                  chosen === question.answer
                    ? 'feedback-success'
                    : 'feedback-error'
                }
              >
                {chosen === question.answer ? 'Rätt!' : 'Inte riktigt.'}{' '}
                {question.explain}
              </p>
              <button
                className="primary-button"
                type="button"
                onClick={handleNext}
              >
                {index === list.length - 1 ? 'Se resultatet' : 'Nästa fråga'}
              </button>
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
