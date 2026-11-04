import { useState } from 'react';
import { useCourse } from '../course';
import { encouragement } from '../encouragement';
import { buildAiPrompt } from '../lib/aiPrompt';
import CodeEditor from './CodeEditor';
import CodeText from './CodeText';
import FeedbackPanel from './FeedbackPanel';
import HintPanel from './HintPanel';
import SolutionCompare from './SolutionCompare';
import StuckPanel from './StuckPanel';

// Visa lösning dyker upp efter så här många felaktiga försök. Utan
// ledtrådar (bossar och projekt utan ledtrådar) dröjer den lite längre.
const SOLUTION_AFTER = 4;
const SOLUTION_AFTER_NO_HINTS = 6;

// En övning eller ett projektsteg. Byts hela komponenten ut (key = id) när
// eleven går till nästa, så att feedback och försök börjar om från noll.
// project är null för vanliga övningar. projectMode är null tills eleven
// valt att bygga med ('hints') eller utan ledtrådar ('noHints').
export default function LessonPanel({
  lesson,
  track,
  lessonNumber,
  lessonCount,
  completedInTrack,
  trackLessonCount,
  isCompleted,
  code,
  onCodeChange,
  onSolved,
  runtimeReady,
  stage,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  project,
  projectMode,
  onChooseProjectMode,
  noHintsBonusXp,
  resources,
  learnedTracks,
  onBreakDown,
  freeBuildIdeas,
  onOpenIdea,
  canTestOut,
  onTestOut,
  bossLeft,
  onGoToBoss,
}) {
  const course = useCourse();
  const { runtime, texts } = course;
  const [feedback, setFeedback] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Koden innan man tryckte på Börja om, så att det går att ångra.
  const [undoCode, setUndoCode] = useState(null);
  const workbench = course.useWorkbench({ code, lesson, busy: running });

  async function check() {
    if (running) return;
    setRunning(true);
    const raw = await runtime
      .run({
        code,
        tests: lesson.tests,
        inputs: lesson.inputs,
        files: lesson.files,
        ...workbench.runOptions,
      })
      .catch(() => ({ failed: true }));
    setRunning(false);
    if (raw.failed) {
      setFeedback({ isCorrect: false, message: texts.failedToStart });
      return;
    }
    const result = runtime.evaluate(lesson, code, raw);
    if (result.isCorrect) {
      setFeedback({ ...result, xpGained: isCompleted ? 0 : lesson.xp });
      onSolved(lesson);
    } else {
      const kind = raw.syntaxError ? 'syntax' : raw.error ? 'crash' : 'tests';
      setFeedback({
        ...result,
        message: encouragement(failedAttempts, kind, texts.encouragement),
      });
      setFailedAttempts(count => count + 1);
    }
  }

  // Lösningen räknas som hjälp, så då försvinner bonusen.
  function handleShowSolution() {
    if (project && projectMode !== 'hints') onChooseProjectMode('hints');
    setShowSolution(true);
  }

  function handleCodeChange(newCode) {
    setUndoCode(null);
    onCodeChange(newCode);
  }

  function reset() {
    if (code === lesson.starterCode) return;
    setUndoCode(code);
    onCodeChange(lesson.starterCode);
    setFeedback(null);
  }

  return (
    <section className="lesson-panel" aria-labelledby="lesson-title">
      <p className="lesson-meta">
        {project ? (
          <>
            <span className="chip chip-project">
              🛠️ Projekt: {project.title}
            </span>
            <span className="chip">
              Steg {lesson.stepNumber} av {project.steps.length}
            </span>
          </>
        ) : (
          <>
            <span className="chip">
              {track.title} · {completedInTrack}/{trackLessonCount}
            </span>
            <span className="chip">
              Övning {lessonNumber} av {lessonCount}
            </span>
          </>
        )}
        {lesson.isBoss && <span className="chip chip-boss">👑 Boss</span>}
        <span className="chip chip-xp">⭐ {lesson.xp} XP</span>
        {projectMode === 'noHints' && (
          <span className="chip chip-boss">🔥 Utan ledtrådar</span>
        )}
        {isCompleted && <span className="chip chip-done">✓ Klar</span>}
      </p>
      {canTestOut && (
        <button type="button" className="test-out-banner" onClick={onTestOut}>
          ⚡ Kan du redan {track.title}? Testa dig förbi banan och hoppa vidare
        </button>
      )}
      {bossLeft && bossLeft.id !== lesson.id && (
        <button
          type="button"
          className="test-out-banner"
          onClick={() => onGoToBoss(bossLeft)}
        >
          ⚡ Du klarade testet. 👑 Ta bossen{' '}
          {bossLeft.title.replace('Boss: ', '')} för att få {track.reward.emoji}{' '}
          {track.reward.name}
        </button>
      )}
      <h2 id="lesson-title" className="lesson-title">
        {lesson.title}
      </h2>
      <p className="lesson-description">{lesson.description}</p>
      {lesson.isBoss && !isCompleted && (
        <p className="boss-note">
          👑 Besegra bossen så blir {track.title} klar och du får{' '}
          {track.reward.emoji} {track.reward.name}.
        </p>
      )}
      {lesson.explain && (
        // I de allra första övningarna är förklaringen öppen från början,
        // så att den som aldrig kodat hittar den.
        <details className="lesson-explain" open={lessonNumber <= 3}>
          <summary>📖 Ny på det här? Läs mer och se ett exempel</summary>
          {lesson.explain.split('\n\n').map((paragraph, index) => (
            <p key={`explain-${index}`}>
              <CodeText text={paragraph} />
            </p>
          ))}
          <figure>
            <figcaption>Exempel, med andra värden än i uppgiften:</figcaption>
            <pre>
              <code>{lesson.example}</code>
            </pre>
          </figure>
        </details>
      )}
      {project && projectMode === null && (
        <div className="mode-choice">
          <p>
            <strong>Hur vill du bygga {project.title}?</strong> Du kan byta till
            ledtrådar senare om du kör fast.
          </p>
          <button type="button" onClick={() => onChooseProjectMode('hints')}>
            💡 Med ledtrådar
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => onChooseProjectMode('noHints')}
          >
            🔥 Utan ledtrådar, +{noHintsBonusXp} bonus-XP
          </button>
        </div>
      )}
      <p className="lesson-task">
        <CodeText text={lesson.task} />
      </p>
      {track.docs?.length > 0 && (
        <details className="lesson-docs">
          <summary>{texts.docs}</summary>
          <ul>
            {track.docs.map(doc => (
              <li key={doc.url}>
                <a href={doc.url} target="_blank" rel="noreferrer">
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
      {workbench.beforeEditor}
      <CodeEditor
        code={code}
        onCodeChange={handleCodeChange}
        onRun={check}
        {...workbench.editor}
      />
      {workbench.afterEditor}
      <div className="editor-actions">
        <button
          className="primary-button"
          type="button"
          onClick={check}
          disabled={running}
        >
          {running
            ? runtimeReady
              ? 'Kör koden…'
              : texts.starting
            : 'Kolla lösning'}
        </button>
        {workbench.actions}
        <button type="button" onClick={reset}>
          Börja om
        </button>
        {undoCode !== null && (
          <button
            type="button"
            onClick={() => {
              onCodeChange(undoCode);
              setUndoCode(null);
            }}
          >
            ↩ Ångra
          </button>
        )}
      </div>
      {workbench.panels}
      <FeedbackPanel feedback={feedback} stage={stage} />
      {lesson.why && (feedback?.isCorrect || isCompleted) && (
        <aside className="lesson-why">
          <strong>💭 Varför så här?</strong> {lesson.why}
        </aside>
      )}
      {project &&
        isCompleted &&
        lesson.stepNumber === project.steps.length &&
        freeBuildIdeas.length > 0 && (
          <aside className="idea-card">
            <strong>🧪 Bygg helt själv</strong>
            <p>
              Nu när du byggt ett projekt på banan, testa gärna att bygga något
              helt själv på Lekplatsen – utan tester och utan facit. Till
              exempel:
            </p>
            <div className="idea-buttons">
              {freeBuildIdeas.map(idea => (
                <button
                  key={idea.id}
                  type="button"
                  onClick={() => onOpenIdea(idea.id)}
                  title={idea.summary}
                >
                  {idea.emoji} {idea.title}
                </button>
              ))}
            </div>
          </aside>
        )}
      {feedback?.isCorrect && !showSolution && (
        <SolutionCompare code={code} solution={lesson.solution} />
      )}
      {!feedback?.isCorrect && (
        <HintPanel
          hints={project && projectMode !== 'hints' ? [] : lesson.hints}
          failedAttempts={failedAttempts}
          isBoss={lesson.isBoss}
        />
      )}
      {projectMode === 'noHints' && !isCompleted && (
        <button type="button" onClick={() => onChooseProjectMode('hints')}>
          💡 Byt till med ledtrådar (bonusen försvinner)
        </button>
      )}
      {failedAttempts >=
        (projectMode === 'noHints' || lesson.isBoss
          ? SOLUTION_AFTER_NO_HINTS
          : SOLUTION_AFTER) &&
        !showSolution && (
          <button type="button" onClick={handleShowSolution}>
            Visa lösning
            {projectMode === 'noHints' && ' (bonusen försvinner)'}
          </button>
        )}
      {showSolution && (
        <figure className="solution-compare">
          <figcaption>
            Facit – skriv av det och kör, så sitter det bättre:
          </figcaption>
          <pre>
            <code>{lesson.solution}</code>
          </pre>
        </figure>
      )}
      {!isCompleted && (
        <StuckPanel
          resources={resources}
          failedAttempts={failedAttempts}
          onBreakDown={() => onBreakDown(code)}
          aiPrompt={buildAiPrompt({
            course,
            lesson,
            code,
            feedback,
            learnedTracks,
          })}
        />
      )}
      <div className="lesson-navigation">
        <button type="button" onClick={onPrevious} disabled={!canPrevious}>
          {project ? 'Föregående steg' : 'Föregående övning'}
        </button>
        <button type="button" onClick={onNext} disabled={!canNext}>
          {project ? 'Nästa steg' : 'Nästa övning'}
        </button>
      </div>
    </section>
  );
}
