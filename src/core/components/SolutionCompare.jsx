import { isNoticeablyLonger } from '../runner/compare';

// Visas när svaret är rätt men märkbart längre än facit, så att eleven
// ser att det går att skriva kortare.
function SolutionCompare({ code, solution }) {
  if (!isNoticeablyLonger(code, solution)) return null;

  return (
    <figure className="solution-compare">
      <figcaption>
        Din lösning fungerar! Den går att skriva kortare. Så här ser facit ut:
      </figcaption>
      <pre>
        <code>{solution}</code>
      </pre>
    </figure>
  );
}

export default SolutionCompare;
