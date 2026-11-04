import Preview from './Preview';

// Komponenten koden ritar, efter Kolla lösning och på Lekplatsen.
export default function ResultPreview({ result }) {
  return result.previewSource ? (
    <Preview source={result.previewSource} />
  ) : null;
}
