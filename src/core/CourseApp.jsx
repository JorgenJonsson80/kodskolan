import { useEffect, useMemo, useState } from 'react';
import AccountPanel from './components/AccountPanel';
import { trackEvent } from './lib/analytics';
import SiteFooter from './components/SiteFooter';
import Avatar from './components/Avatar';
import Collection from './components/Collection';
import HelpDialog from './components/HelpDialog';
import HeroCard from './components/HeroCard';
import LessonPanel from './components/LessonPanel';
import DiplomaDialog from './components/DiplomaDialog';
import DailyGoal from './components/DailyGoal';
import ReviewDialog from './components/ReviewDialog';
import PaywallCard from './components/PaywallCard';
import LevelUp from './components/LevelUp';
import Playground from './components/Playground';
import Quiz from './components/Quiz';
import TrackList from './components/TrackList';
import { CourseContext } from './course';
import { copyToPlayground, PLAYGROUND_COPY } from './lib/playground';
import { facitId, keyStatus } from './lib/keys';
import { FREE_TRACKS, isPaidTrack } from './lib/access';
import { useAccess } from './lib/useAccess';
import { recordExercise } from './lib/activity';
import { useActivity } from './lib/useActivity';
import {
  answerQuestion,
  dueQuestions,
  isReviewState,
  SESSION_SIZE,
} from './lib/review';
import { mergeCompleted } from './lib/progress';
import {
  isStringList,
  isStringMap,
  progressKeys,
  readJson,
  writeJson,
} from './lib/storage';
import { useCloudProgress } from './lib/useCloudProgress';
import { isProjectComplete, noHintsBonusXp, noHintsId } from './projects';
import { passedId, passedTrackIdsFrom } from './quiz';
import { getGrowth, trackProgress } from './stages';
import { courseCompletion, courseDiplomaDetails } from './lib/completion';

const isModeMap = value =>
  isStringMap(value) &&
  Object.values(value).every(mode => mode === 'hints' || mode === 'noHints');

// En kurs. Allt som beror på språket kommer från course, se Kontraktet i
// SPEC.md. Komponenterna under når kursen med useCourse().
export default function CourseApp({ course }) {
  return (
    <CourseContext.Provider value={course}>
      <Academy course={course} />
    </CourseContext.Provider>
  );
}

function Academy({ course }) {
  const {
    tracks: TRACKS,
    lessons: LESSONS,
    projects: PROJECTS,
    projectSteps: PROJECT_STEPS,
    ideas: IDEAS,
    quiz: QUIZ,
    resources: RESOURCES,
  } = course.content;
  const { runtime } = course;
  const KEYS = useMemo(() => progressKeys(course.storagePrefix), [course]);
  // Övningarna och projektstegen i en lista, så att samma editor och
  // rättning används för båda.
  const EXERCISES = useMemo(
    () => [...LESSONS, ...PROJECT_STEPS],
    [LESSONS, PROJECT_STEPS],
  );

  // Öppna övningen man senast arbetade med.
  const [lessonId, setLessonId] = useState(() => {
    const saved = readJson(KEYS.current, null, id => typeof id === 'string');
    return EXERCISES.some(item => item.id === saved) ? saved : LESSONS[0].id;
  });
  // legacyCompleted: klara id:n som en äldre version av kursen sparade
  // på annat sätt (JS Academys klarade quiz), så att inget tappas.
  const [completedIds, setCompletedIds] = useState(() =>
    mergeCompleted(
      readJson(KEYS.completed, [], isStringList),
      course.progress?.legacyCompleted?.() ?? [],
    ),
  );
  const [drafts, setDrafts] = useState(() =>
    readJson(KEYS.drafts, {}, isStringMap),
  );
  // Hur man valt att bygga varje projekt: 'hints' eller 'noHints'.
  const [projectModes, setProjectModes] = useState(() =>
    readJson(KEYS.projectModes, {}, isModeMap),
  );
  const [showHelp, setShowHelp] = useState(
    () => !readJson(KEYS.helpSeen, false, value => value === true),
  );
  const [celebration, setCelebration] = useState(null);
  const [status, setStatus] = useState('idle');
  // Lekplatsen visas i stället för övningen. Idén man bygger finns kvar
  // när man går tillbaka, null betyder fri kod.
  const [showPlayground, setShowPlayground] = useState(false);
  const [playgroundIdeaId, setPlaygroundIdeaId] = useState(null);
  // Ökar vid utloggning, så att övningen börjar om utan gammal feedback.
  const [signOuts, setSignOuts] = useState(0);
  // null när inget test visas, annars { trackId } för Testa dig förbi
  // eller {} för nivåtestet.
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showDiploma, setShowDiploma] = useState(false);
  // Repetitionen: läget per fråga, och frågorna i en pågående omgång.
  const [review, setReview] = useState(() =>
    readJson(KEYS.review, {}, isReviewState),
  );
  const [reviewing, setReviewing] = useState(null);

  useEffect(
    () => writeJson(KEYS.completed, completedIds),
    [KEYS, completedIds],
  );
  useEffect(() => writeJson(KEYS.drafts, drafts), [KEYS, drafts]);
  useEffect(() => writeJson(KEYS.current, lessonId), [KEYS, lessonId]);
  useEffect(
    () => writeJson(KEYS.projectModes, projectModes),
    [KEYS, projectModes],
  );

  // Språket startas direkt i bakgrunden, så att det är varmt när eleven
  // trycker på Kolla lösning första gången. En kurs utan något att starta
  // (HTML rättas i webbläsaren direkt) saknar onStatus.
  useEffect(() => {
    if (!runtime.onStatus) return;
    const stop = runtime.onStatus(setStatus);
    runtime.warmUp().catch(() => {});
    return stop;
  }, [runtime]);

  const account = useCloudProgress({
    courseId: course.id,
    storagePrefix: course.storagePrefix,
    completedIds,
    setCompletedIds,
    drafts,
    setDrafts,
    projectModes,
    setProjectModes,
  });

  const { access } = useAccess(account.user);
  const activity = useActivity(account.user);
  const freeTracks = course.freeTracks ?? FREE_TRACKS;

  // Betalbanorna låses först när tillgången hämtats (access är null
  // medan den hämtas), så att den som har tillgång inte ser låset blinka.
  function isTrackPaid(trackId) {
    if (access === null) return false;
    return isPaidTrack(
      TRACKS.findIndex(item => item.id === trackId),
      { freeTracks, access, courseId: course.id },
    );
  }

  // Efter utloggning töms webbläsaren, så att nästa person som loggar in
  // här inte får med sig dina framsteg. De finns kvar i ditt konto.
  async function handleSignOut() {
    await account.signOut();
    writeJson(KEYS.owner, null);
    setCompletedIds([]);
    setDrafts({});
    setProjectModes({});
    setLessonId(LESSONS[0].id);
    setShowPlayground(false);
    setSignOuts(count => count + 1);
  }

  // Inloggningen visas först när eleven klarat en övning: då finns något
  // att spara. Första gången frågar en ruta ovanför övningen, tills man
  // loggar in eller säger Inte nu.
  const lessonsDone = LESSONS.filter(item =>
    completedIds.includes(item.id),
  ).length;
  const [saveNudgeDismissed, setSaveNudgeDismissed] = useState(() =>
    readJson(KEYS.saveNudge, false, value => typeof value === 'boolean'),
  );
  const showSaveNudge =
    account.isAvailable &&
    !account.user &&
    lessonsDone > 0 &&
    !saveNudgeDismissed &&
    !showPlayground;
  const showAccountPanel =
    Boolean(account.user) || (lessonsDone > 0 && !showSaveNudge);

  function dismissSaveNudge() {
    setSaveNudgeDismissed(true);
    writeJson(KEYS.saveNudge, true);
  }

  const lesson = EXERCISES.find(item => item.id === lessonId);
  const project = PROJECTS.find(item => item.id === lesson.project) ?? null;
  const lessonIndex = LESSONS.indexOf(lesson);
  const track = TRACKS.find(item => item.id === lesson.track);
  const trackLessons = LESSONS.filter(item => item.track === track.id);
  const totalXp =
    EXERCISES.filter(item => completedIds.includes(item.id)).reduce(
      (sum, item) => sum + item.xp,
      0,
    ) +
    PROJECTS.filter(item => completedIds.includes(noHintsId(item))).reduce(
      (sum, item) => sum + noHintsBonusXp(item),
      0,
    );
  // Banor man testat sig förbi. De sparas bland de klara id:na.
  const passedTrackIds = passedTrackIdsFrom(completedIds, TRACKS);
  const growth = getGrowth(TRACKS, LESSONS, completedIds, passedTrackIds);
  const completion = courseCompletion(
    TRACKS,
    LESSONS,
    completedIds,
    course.plannedTracks,
  );
  const statusFor = (ids, passed) =>
    Object.fromEntries(
      TRACKS.map(item => [item.id, trackProgress(item, LESSONS, ids, passed)]),
    );
  const trackStatusById = statusFor(completedIds, passedTrackIds);
  const testedOutTrackIds = TRACKS.filter(
    item => trackStatusById[item.id].viaTest,
  ).map(item => item.id);
  const completedTrackIds = TRACKS.filter(
    item => trackStatusById[item.id].isComplete,
  ).map(item => item.id);
  const dueReview = QUIZ ? dueQuestions(QUIZ, completedTrackIds, review) : [];

  // null tills man valt. Har man redan klarat ett steg utan att välja
  // bygger man med ledtrådar.
  const projectMode = project
    ? (projectModes[project.id] ??
      (project.steps.some((_, index) =>
        completedIds.includes(`${project.id}-${index + 1}`),
      )
        ? 'hints'
        : null))
    : null;

  function handleChooseProjectMode(mode) {
    setProjectModes(previous => ({ ...previous, [project.id]: mode }));
  }

  function isTrackUnlocked(trackId) {
    if (isTrackPaid(trackId)) return false;
    const index = TRACKS.findIndex(item => item.id === trackId);
    if (index <= 0) return index === 0;
    // En bana man redan nått låses inte igen, även om en tidigare bana
    // fått nya övningar.
    const hasReached = LESSONS.some(
      item =>
        completedIds.includes(item.id) &&
        TRACKS.findIndex(other => other.id === item.track) >= index,
    );
    const previous = TRACKS[index - 1].id;
    return (
      hasReached ||
      passedTrackIds.includes(previous) ||
      trackStatusById[previous].isComplete
    );
  }

  // Projekten på en bana låses upp när banan är klar. Har man redan
  // byggt på något av dem låses de inte igen när banan fått en boss i
  // efterhand.
  function areProjectsUnlocked(trackId) {
    return (
      trackStatusById[trackId].isComplete ||
      PROJECT_STEPS.some(
        step => step.track === trackId && completedIds.includes(step.id),
      )
    );
  }

  // Varje projektsteg låses upp när förra steget är klart.
  function isExerciseUnlocked(item) {
    if (!isTrackUnlocked(item.track)) return false;
    if (!item.project) return true;
    if (!areProjectsUnlocked(item.track)) return false;
    if (item.stepNumber === 1) return true;
    return completedIds.includes(`${item.project}-${item.stepNumber - 1}`);
  }

  // Idéerna på Lekplatsen låses upp när ett av banans projekt är byggt.
  function canBuildFreely(trackId) {
    return PROJECTS.some(
      item => item.track === trackId && isProjectComplete(item, completedIds),
    );
  }
  const ideasWithStatus = IDEAS.map(idea => ({
    ...idea,
    trackTitle: TRACKS.find(item => item.id === idea.track).title,
    unlocked: canBuildFreely(idea.track),
  }));

  // Ett projektsteg man inte påbörjat börjar med koden man skrev i
  // förra steget, så att man bygger vidare på sitt eget projekt.
  function startCodeFor(item) {
    if (drafts[item.id] !== undefined) return drafts[item.id];
    const previousDraft =
      item.project && drafts[`${item.project}-${item.stepNumber - 1}`];
    if (!previousDraft) return item.starterCode;
    const step = `Steg ${item.stepNumber}: ${item.title.split(': ').at(-1).toLowerCase()}`;
    return `${previousDraft.trimEnd()}\n\n${course.editor.comment(step)}\n`;
  }

  // force: direkt efter ett godkänt test, innan de nya framstegen syns i
  // isExerciseUnlocked.
  function selectLesson(id, force = false) {
    const item = EXERCISES.find(other => other.id === id);
    if (!item) return;
    // En betalbana går att öppna: då visas PaywallCard i stället för
    // övningen.
    if (!force && !isExerciseUnlocked(item) && !isTrackPaid(item.track)) {
      return;
    }
    setShowPlayground(false);
    setLessonId(id);
    window.scrollTo({ top: 0 });
  }

  // Föregående och nästa håller sig inom övningarna, eller inom
  // projektet man arbetar med.
  function neighbour(offset) {
    const list = project
      ? PROJECT_STEPS.filter(item => item.project === project.id)
      : LESSONS;
    const item = list[list.indexOf(lesson) + offset];
    return item && isExerciseUnlocked(item) ? item.id : null;
  }

  // Öppnar första steget i projektet som inte är klart.
  function selectProject(projectId) {
    const steps = PROJECT_STEPS.filter(item => item.project === projectId);
    const step =
      steps.find(item => !completedIds.includes(item.id)) ?? steps[0];
    selectLesson(step.id);
  }

  // Utan ideaId öppnas idén man byggde senast.
  function openPlayground(ideaId) {
    if (ideaId !== undefined) setPlaygroundIdeaId(ideaId);
    setShowPlayground(true);
    window.scrollTo({ top: 0 });
  }

  // Facit kostar en nyckel, en gång per övning.
  const facitKeys = keyStatus(completedIds, EXERCISES);
  function handleUseFacit(item) {
    const id = facitId(item.id);
    trackEvent('facit_anvant', { kurs: course.id, ovning: item.id });
    setCompletedIds(previous =>
      previous.includes(id) ? previous : [...previous, id],
    );
  }

  function handleSolved(solved, failedAttempts = 0) {
    if (completedIds.includes(solved.id)) return;
    const newIds = [...completedIds, solved.id];
    recordExercise(account.user);
    trackEvent('ovning_klar', {
      kurs: course.id,
      ovning: solved.id,
      bana: solved.track,
      forsok: failedAttempts + 1,
      boss: Boolean(solved.isBoss),
      projekt: Boolean(project),
    });
    const projectDone = project && isProjectComplete(project, newIds);
    const withoutHints = projectDone && projectMode === 'noHints';
    if (withoutHints) newIds.push(noHintsId(project));
    setCompletedIds(newIds);
    celebrate(
      newIds,
      projectDone
        ? [{ ...project, bonusXp: withoutHints ? noHintsBonusXp(project) : 0 }]
        : [],
    );
  }

  // Blev en bana eller ett projekt klart nu? Då firar vi och visar hur
  // figuren växt.
  function celebrate(newIds, doneProjects = []) {
    const passed = passedTrackIdsFrom(newIds, TRACKS);
    const newStatus = statusFor(newIds, passed);
    const doneTracks = TRACKS.filter(
      item =>
        !trackStatusById[item.id].isComplete && newStatus[item.id].isComplete,
    );
    doneTracks.forEach(item =>
      trackEvent('bana_klar', { kurs: course.id, bana: item.id }),
    );
    if (
      doneTracks.length > 0 &&
      TRACKS.every(item => newStatus[item.id].isComplete)
    ) {
      trackEvent('kurs_klar', { kurs: course.id });
    }
    if (doneTracks.length === 0 && doneProjects.length === 0) return;
    const newGrowth = getGrowth(TRACKS, LESSONS, newIds, passed);
    setCelebration({
      tracks: doneTracks,
      projects: doneProjects,
      unlockedProjects: PROJECTS.filter(item =>
        doneTracks.some(done => done.id === item.track),
      ),
      stage: newGrowth.stage,
      hasGrown: newGrowth.stageIndex > growth.stageIndex,
    });
  }

  // Man kan testa sig förbi en upplåst bana som inte är klar och vars test
  // man inte redan klarat.
  function canTestOut(trackId) {
    return (
      Boolean(QUIZ[trackId]) &&
      isTrackUnlocked(trackId) &&
      !trackStatusById[trackId].isComplete &&
      !passedTrackIds.includes(trackId)
    );
  }

  // Bossen som är kvar i en bana man klarat testet för.
  function bossLeftIn(trackId) {
    if (!passedTrackIds.includes(trackId)) return null;
    return trackStatusById[trackId].bossesLeft[0] ?? null;
  }

  // En bana man testat sig förbi är klar först när bossen är klar.
  function handleQuizFinish(passed) {
    if (passed.length > 0) {
      trackEvent('test_klarat', { kurs: course.id, banor: passed.join(',') });
    }
    const newIds = [...new Set([...completedIds, ...passed.map(passedId)])];
    setCompletedIds(newIds);
    celebrate(newIds);
  }

  // Efter ett godkänt test hoppar man till banans boss, om man valde det,
  // eller till banan efter den sista man klarat.
  function handleQuizClose(passed, choice) {
    setActiveQuiz(null);
    if (!passed?.length) return;
    const lastTrack = passed.at(-1);
    if (choice === 'boss') {
      const boss = LESSONS.find(
        item =>
          item.track === lastTrack &&
          item.isBoss &&
          !completedIds.includes(item.id),
      );
      if (boss) selectLesson(boss.id, true);
      return;
    }
    const nextTrack =
      TRACKS[TRACKS.findIndex(item => item.id === lastTrack) + 1];
    const first =
      nextTrack && LESSONS.find(item => item.track === nextTrack.id);
    if (first) selectLesson(first.id, true);
  }

  const nextUncompleted = LESSONS.find(
    item => !completedIds.includes(item.id) && isTrackUnlocked(item.track),
  );
  const learnedTracks = TRACKS.slice(
    0,
    TRACKS.findIndex(item => item.id === track.id) + 1,
  ).map(item => item.title);

  return (
    <>
      <header className="app-header">
        <h1>
          <a
            className="home-link"
            href={import.meta.env.BASE_URL}
            aria-label="Kodskolan"
          >
            <img
              className="brand-mark"
              src={`${import.meta.env.BASE_URL}logo-mark.png`}
              alt=""
              width="32"
              height="32"
            />
            <span className="header-label">Kodskolan</span>
          </a>
          <span aria-hidden="true"> › {course.icon}</span> {course.name}
        </h1>
        {runtime.statusText && (
          <p
            className={`runtime-status runtime-status-${status}`}
            role="status"
          >
            {runtime.statusText[status]}
          </p>
        )}
        <nav className="header-nav" aria-label="Verktyg">
          <button
            type="button"
            onClick={() => openPlayground()}
            aria-current={showPlayground ? 'page' : undefined}
            aria-label="Lekplats"
          >
            🧪<span className="header-label"> Lekplats</span>
          </button>
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            aria-label="Hjälp"
          >
            ❓<span className="header-label"> Hjälp</span>
          </button>
        </nav>
        <p className="header-stats">
          <Avatar stage={growth.stage} size={28} />
          <span className="header-label">{growth.stage.title}</span>
          {activity.streak > 0 && (
            <span
              className="chip chip-streak"
              title={`${activity.streak} dagar i rad`}
            >
              🔥 {activity.streak}
            </span>
          )}
          <span className="chip chip-xp">⭐ {totalXp} XP</span>
        </p>
      </header>
      <main>
        <div className="academy-layout">
          <aside aria-label="Banor och progression">
            {showAccountPanel && (
              <AccountPanel account={account} onSignOut={handleSignOut} />
            )}
            <HeroCard
              growth={growth}
              totalXp={totalXp}
              completedCount={
                LESSONS.filter(item => completedIds.includes(item.id)).length
              }
              lessonCount={LESSONS.length}
              moreComing={completion.moreComing}
            />
            <DailyGoal {...activity} />
            {dueReview.length > 0 && (
              <button
                className="quiz-start"
                type="button"
                onClick={() => setReviewing(dueReview.slice(0, SESSION_SIZE))}
              >
                🔁 Repetera ({Math.min(dueReview.length, SESSION_SIZE)} frågor)
              </button>
            )}
            <button
              className="primary-button continue-button"
              type="button"
              onClick={() => selectLesson(nextUncompleted.id)}
              disabled={!nextUncompleted}
            >
              Fortsätt träna →
            </button>
            {completion.isComplete && (
              <button
                className="primary-button diploma-button"
                type="button"
                onClick={() => setShowDiploma(true)}
              >
                🎓 Hämta ditt diplom
              </button>
            )}
            {!trackStatusById[TRACKS[0].id].isComplete && (
              <button
                className="quiz-start"
                type="button"
                onClick={() => setActiveQuiz({})}
              >
                🎯 Kan du redan lite? Gör nivåtestet och hoppa fram
              </button>
            )}
            <Collection
              tracks={TRACKS}
              completedTrackIds={completedTrackIds}
              testedOutTrackIds={testedOutTrackIds}
              projects={PROJECTS}
              completedIds={completedIds}
            />
            <TrackList
              tracks={TRACKS}
              lessons={LESSONS}
              completedIds={completedIds}
              drafts={drafts}
              trackStatusById={trackStatusById}
              passedTrackIds={passedTrackIds}
              isTrackUnlocked={isTrackUnlocked}
              isTrackPaid={isTrackPaid}
              freeTracks={freeTracks}
              activeTrackId={track.id}
              activeLessonId={lesson.id}
              onSelectTrack={trackId => {
                const first = LESSONS.find(item => item.track === trackId);
                if (first) selectLesson(first.id);
              }}
              onSelectLesson={selectLesson}
              projects={PROJECTS}
              projectSteps={PROJECT_STEPS}
              onSelectProject={selectProject}
              areProjectsUnlocked={areProjectsUnlocked}
              canBuildFreely={canBuildFreely}
              onOpenIdeas={trackId =>
                openPlayground(
                  IDEAS.find(idea => idea.track === trackId)?.id ?? null,
                )
              }
            />
          </aside>
          {showPlayground ? (
            <Playground
              ideas={ideasWithStatus}
              ideaId={playgroundIdeaId}
              onSelectIdea={setPlaygroundIdeaId}
              onBack={() => setShowPlayground(false)}
            />
          ) : isTrackPaid(lesson.track) ? (
            <div className="lesson-column">
              <PaywallCard
                track={track}
                freeTracks={freeTracks}
                isSignedIn={Boolean(account.user)}
                onBack={() => selectLesson((nextUncompleted ?? LESSONS[0]).id)}
              />
            </div>
          ) : (
            <div className="lesson-column">
              <LessonPanel
                key={`lesson-${signOuts}-${lesson.id}`}
                lesson={lesson}
                track={track}
                lessonNumber={lessonIndex + 1}
                lessonCount={LESSONS.length}
                completedInTrack={
                  trackLessons.filter(item => completedIds.includes(item.id))
                    .length
                }
                trackLessonCount={trackLessons.length}
                isCompleted={completedIds.includes(lesson.id)}
                facitPaid={completedIds.includes(facitId(lesson.id))}
                facitKeys={facitKeys}
                onUseFacit={() => handleUseFacit(lesson)}
                code={startCodeFor(lesson)}
                tutor={{ user: account.user, access }}
                onCodeChange={newCode =>
                  setDrafts(previous => ({ ...previous, [lesson.id]: newCode }))
                }
                onSolved={handleSolved}
                runtimeReady={status === 'ready'}
                stage={growth.stage}
                onPrevious={() => selectLesson(neighbour(-1))}
                onNext={() => selectLesson(neighbour(1))}
                canPrevious={neighbour(-1) !== null}
                canNext={neighbour(1) !== null}
                project={project}
                projectMode={projectMode}
                onChooseProjectMode={handleChooseProjectMode}
                noHintsBonusXp={project ? noHintsBonusXp(project) : 0}
                resources={RESOURCES[track.id] ?? []}
                learnedTracks={learnedTracks}
                onBreakDown={code => {
                  copyToPlayground(course, code, lesson.title);
                  openPlayground(PLAYGROUND_COPY);
                }}
                freeBuildIdeas={
                  project && canBuildFreely(project.track)
                    ? IDEAS.filter(idea => idea.track === project.track)
                    : []
                }
                onOpenIdea={openPlayground}
                canTestOut={!project && canTestOut(lesson.track)}
                onTestOut={() => setActiveQuiz({ trackId: lesson.track })}
                bossLeft={project ? null : bossLeftIn(lesson.track)}
                onGoToBoss={boss => selectLesson(boss.id)}
              />
              {showSaveNudge && (
                <section
                  className="card save-nudge"
                  aria-label="Spara dina framsteg"
                >
                  <p>
                    🎉 <strong>Snyggt, din första övning är klar!</strong> Vill
                    du spara framstegen? Med ett konto följer de med till andra
                    datorer. Det är gratis, och du kan fortsätta utan.
                  </p>
                  <AccountPanel
                    account={account}
                    onSignOut={handleSignOut}
                    compact
                  />
                  <button type="button" onClick={dismissSaveNudge}>
                    Inte nu
                  </button>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter course={course} lesson={lesson} />
      {showHelp && (
        <HelpDialog
          onClose={() => {
            setShowHelp(false);
            writeJson(KEYS.helpSeen, true);
          }}
        />
      )}
      {activeQuiz && (
        <Quiz
          tracks={TRACKS}
          trackId={activeQuiz.trackId}
          hasBoss={
            Boolean(activeQuiz.trackId) &&
            trackStatusById[activeQuiz.trackId].bossesLeft.length > 0
          }
          onFinish={handleQuizFinish}
          onClose={handleQuizClose}
        />
      )}
      {reviewing && (
        <ReviewDialog
          questions={reviewing}
          tracks={TRACKS}
          onAnswer={(key, correct) =>
            setReview(state => {
              const next = answerQuestion(state, key, correct);
              writeJson(KEYS.review, next);
              return next;
            })
          }
          onClose={() => setReviewing(null)}
        />
      )}
      {showDiploma && (
        <DiplomaDialog
          kind="course"
          subject={course.id}
          title={`kursen ${course.name}`}
          details={courseDiplomaDetails(course, completion)}
          account={account}
          onClose={() => setShowDiploma(false)}
        />
      )}
      {celebration && !activeQuiz && (
        <LevelUp
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}
    </>
  );
}
