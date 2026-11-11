import AppPreview from './AppPreview';

// Det programmet ritade, under feedbacken och på Lekplatsen: diagram från
// matplotlib (PNG från harness.py) och Streamlit-appen.
export default function ResultPreview({ result }) {
  const figures = result.figures ?? [];
  return (
    <>
      {figures.map((png, index) => (
        <figure className="plot-figure" key={`figur-${index}`}>
          <img
            src={`data:image/png;base64,${png}`}
            alt={`Diagram ${index + 1} som koden ritade`}
          />
        </figure>
      ))}
      <AppPreview elements={result.app} />
    </>
  );
}
