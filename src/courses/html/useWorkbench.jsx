import PagePreview from './components/PagePreview';

// HTML har bara förhandsvisningen runt editorn: sidan syns medan man
// skriver, både i övningarna och på Lekplatsen.
export function useWorkbench({ code }) {
  return {
    runOptions: {},
    editor: {},
    panels: <PagePreview code={code} />,
  };
}
