import { previewTarget } from '../js/lib/previewTarget';
import { isTsx } from './runner/checker';

// TypeScript-kursens verktyg runt editorn: filnamnet (.ts eller .tsx), som
// också styr editorns språk, och komponenten som Lekplatsen ska visa.
// lesson är null på Lekplatsen.
export function useWorkbench({ code, lesson }) {
  const tsx = isTsx(code);
  return {
    runOptions: lesson
      ? {
          typeTests: lesson.typeTests,
          sourceChecks: lesson.sourceChecks,
          lessonPreview: lesson.preview,
        }
      : { preview: previewTarget(code) },
    editor: {
      fileName: tsx ? 'main.tsx' : 'main.ts',
      context: tsx ? 'tsx' : 'ts',
    },
  };
}
