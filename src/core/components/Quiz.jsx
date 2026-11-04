import { useEffect, useRef, useState } from 'react';
import {
  passedTracks,
  placementQuestions,
  shuffleOptions,
  trackQuestions,
} from '../quiz';
import { useCourse } from '../course';

// Nivåtestet går igenom banorna i ordning och slutar vid första fel
// svar. Med trackId testar man sig förbi en enda bana.
// onFinish får id:n på banorna man klarat. onClose får samma lista,
// eller null om man stängde innan testet var klart.
export default function Quiz({ tracks, trackId, hasBoss, onFinish, onClose }) {
  const { quiz } = useCourse().content;
  const dialogRef = useRef(null);
  const [questions] = useState(() => {
    const list = trackId
      ? trackQuestions(quiz, trackId)
      : placementQuestions(quiz, tracks);
    return list.map(question => ({
      ...question,
      ...shuffleOptions(question.options),
    }));
  });
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const question = questions[index];
  const quizTracks = trackId
    ? tracks.filter(track => track.id === trackId)
    : tracks;

  function handleChoose(optionIndex) {
    if (chosen !== null) return;
    setChosen(optionIndex);
    setAnswers([
      ...answers,
      { trackId: question.trackId, correct: optionIndex === question.answer },
    ]);
  }

  function handleNext() {
    const isWrong = chosen !== question.answer;
    if (isWrong || index === questions.length - 1) {
      const passed = passedTracks(quizTracks, answers, questions);
      setResult(passed);
      onFinish(passed);
      return;
    }
    setIndex(index + 1);
    setChosen(null);
  }

  const trackTitle = id => tracks.find(track => track.id === id)?.title;

  return (
    <dialog
      ref={dialogRef}
      className="quiz"
      onClose={() => onClose(result, dialogRef.current?.returnValue)}
      aria-labelledby="quiz-title"
    >
      <h2 id="quiz-title">
        {trackId ? `⚡ Testa dig förbi: ${trackTitle(trackId)}` : '🎯 Nivåtest'}
      </h2>

      {result ? (
        <QuizResult
          tracks={tracks}
          trackId={trackId}
          passed={result}
          hasBoss={hasBoss}
        />
      ) : (
        <>
          <p className="muted">
            Fråga {index + 1}
            {trackId ? ` av ${questions.length}` : ''} ·{' '}
            {trackTitle(question.trackId)}
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
              if (chosen !== null && optionIndex === question.answer) {
                className += ' is-correct';
              } else if (optionIndex === chosen) {
                className += ' is-wrong';
              }
              return (
                <button
                  key={option}
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
                autoFocus
              >
                {chosen === question.answer && index < questions.length - 1
                  ? 'Nästa fråga'
                  : 'Se resultatet'}
              </button>
            </div>
          )}
        </>
      )}

      <form method="dialog" className="quiz-close">
        {!result && (
          <button type="submit" value="cancel">
            Avbryt
          </button>
        )}
        {result && trackId && result.length > 0 && hasBoss && (
          <button type="submit" value="boss" className="primary-button">
            👑 Ta bossen nu
          </button>
        )}
        {result && (
          <button
            type="submit"
            value="next"
            className={
              trackId && result.length > 0 && hasBoss ? '' : 'primary-button'
            }
          >
            {trackId && result.length > 0
              ? 'Hoppa till nästa bana →'
              : 'Fortsätt'}
          </button>
        )}
      </form>
    </dialog>
  );
}

function QuizResult({ tracks, trackId, passed, hasBoss }) {
  if (trackId) {
    return passed.length > 0 ? (
      <p className="feedback-success">
        Snyggt, du kan det här! Nästa bana är upplåst.{' '}
        {hasBoss
          ? 'Klara banans boss, så växer figuren och du får prylen. '
          : ''}
        Övningarna finns kvar om du vill träna mer.
      </p>
    ) : (
      <p>
        Inte riktigt än. Kör övningarna i banan, så sitter det snart. Du kan
        testa igen när du vill.
      </p>
    );
  }

  if (passed.length === 0) {
    return (
      <p>
        Börja från början. Där lär du dig grunderna ordentligt, och det går fort
        om du redan kan en del.
      </p>
    );
  }

  const lastIndex = tracks.findIndex(track => track.id === passed.at(-1));
  const nextTrack = tracks[lastIndex + 1];
  return (
    <p className="feedback-success">
      Snyggt! Du kan redan {passed.length}{' '}
      {passed.length === 1 ? 'bana' : 'banor'}.{' '}
      {nextTrack ? (
        <>
          Du fortsätter med <strong>{nextTrack.title}</strong>. Klara bossen i
          banorna du hoppade över, så växer figuren och du får prylarna. De är
          markerade med ⚡.
        </>
      ) : (
        'Alla banor är upplåsta!'
      )}
    </p>
  );
}
