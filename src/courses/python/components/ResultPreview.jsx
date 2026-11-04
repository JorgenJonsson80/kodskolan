import AppPreview from './AppPreview';

// Det Streamlit-appen visade, under feedbacken och på Lekplatsen.
export default function ResultPreview({ result }) {
  return <AppPreview elements={result.app} />;
}
