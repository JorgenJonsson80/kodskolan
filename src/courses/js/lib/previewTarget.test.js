import { describe, expect, it } from 'vitest';
import { previewTarget } from './previewTarget';

describe('previewTarget', () => {
  it('väljer App i första hand', () => {
    expect(
      previewTarget(
        'function Button() { return <button />; }\nexport default function App() { return <Button />; }',
      ),
    ).toBe('<App />');
  });

  it('tar default-exporten eller den sista komponenten', () => {
    expect(
      previewTarget(
        'export default function Card() { return <div />; }\nconst Tag = () => <b />;',
      ),
    ).toBe('<Card />');
    expect(previewTarget('const Tag = ({ text }) => <b>{text}</b>;')).toBe(
      '<Tag />',
    );
  });

  it('ger null för vanlig JavaScript', () => {
    expect(
      previewTarget('const total = 1 + 2;\nconsole.log(total);'),
    ).toBeNull();
    expect(previewTarget('function add(a, b) { return a < b; }')).toBeNull();
  });
});
