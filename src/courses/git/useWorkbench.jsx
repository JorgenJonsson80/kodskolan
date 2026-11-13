// Terminalkursens verktyg runt editorn: övningens setup (projektet som
// redan finns) följer med varje körning. På Lekplatsen börjar man tomt.
export function useWorkbench({ lesson, idea }) {
  const source = lesson ?? idea;
  return {
    runOptions: { setup: source?.setup ?? '' },
    beforeEditor: source?.setupNote && (
      <p className="muted input-note">{source.setupNote}</p>
    ),
  };
}
