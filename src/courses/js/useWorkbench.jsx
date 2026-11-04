import FileView from './components/FileView';
import StepPanel from './components/StepPanel';
import { tracks } from './data/tracks';
import { previewTarget } from './lib/previewTarget';
import { exampleCall, useStepper } from './lib/useStepper';

// Kör rad för rad finns för JavaScript-banorna, fram till och med
// felsökningsbanan. I React-banorna renderar koden i stället.
const LAST_STEP_TRACK = tracks.findIndex(item => item.id === 'debug-js');
const canStepIn = trackId =>
  tracks.findIndex(item => item.id === trackId) <= LAST_STEP_TRACK;

// JS-kursens verktyg runt editorn: filerna övningen importerar från,
// filnamnet, Kör rad för rad och komponenten som ska förhandsvisas.
// lesson är null på Lekplatsen.
export function useWorkbench({ code, lesson, busy }) {
  const preview = lesson ? null : previewTarget(code);
  const stepper = useStepper(
    code,
    lesson
      ? {
          fileName: lesson.fileName,
          files: lesson.files,
          example: exampleCall(lesson.tests),
        }
      : undefined,
  );
  const canStep = lesson ? canStepIn(lesson.track) : !preview;

  return {
    runOptions: lesson
      ? {
          sourceChecks: lesson.sourceChecks,
          fileName: lesson.fileName,
          lessonPreview: lesson.preview,
        }
      : { preview },
    editor: { activeLine: stepper.activeLine, fileName: lesson?.fileName },
    beforeEditor: Object.entries(lesson?.files ?? {}).map(
      ([fileName, source]) => (
        <FileView
          key={`file-${fileName}`}
          fileName={fileName}
          source={source}
        />
      ),
    ),
    actions: canStep && stepper.frames === null && (
      <button
        type="button"
        onClick={stepper.start}
        disabled={stepper.isRunning || busy}
        title="Se koden köras en rad i taget, med variablernas värden"
      >
        {stepper.isRunning ? 'Kör…' : '👣 Kör rad för rad'}
      </button>
    ),
    panels: stepper.frames && <StepPanel stepper={stepper} />,
  };
}
