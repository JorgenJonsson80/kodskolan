import { useCourse } from '../course';
import CodeText from './CodeText';

// Språkets eget felmeddelande, och under det en förklaring på svenska.
export default function ErrorBox({ error }) {
  const { errors } = useCourse();
  return (
    <div className="error-box">
      <p className="error-title">
        <span aria-hidden="true">{errors.icon}</span>{' '}
        {errors.errorTitle(error, error.isSyntax)}
      </p>
      <p className="error-explain">
        <CodeText text={errors.explainError(error)} />
      </p>
      <pre className="error-raw">{error.message}</pre>
    </div>
  );
}
