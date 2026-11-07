import ResponseView from '../../flask/components/ResponseView';
import Preview from '../../js/components/Preview';

// Det körningen gav: svaret på 📮 Anropa (app.py) och sidan, som pratar
// med appen på riktigt. Klicka i den, så går anropen till Flask-appen.
export default function FullstackResult({ result }) {
  return (
    <>
      {result.response && <ResponseView result={result} />}
      {result.previewSource && (
        <section className="fullstack-page">
          <h3>🖥️ Sidan, kopplad till Flask-appen</h3>
          <Preview source={result.previewSource} />
        </section>
      )}
    </>
  );
}
