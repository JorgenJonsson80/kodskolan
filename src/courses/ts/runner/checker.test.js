import { describe, expect, it } from 'vitest';
import { createChecker, toJavaScript } from './checker';
import { LIB_FILES } from './libs';

const checker = createChecker(LIB_FILES);

describe('checker', () => {
  it('godkänner rätt kod', () => {
    const result = checker.check('const pris: number = 5;\n');
    expect(result.syntaxErrors).toEqual([]);
    expect(result.typeErrors).toEqual([]);
  });

  it('hittar typfel med rad', () => {
    const result = checker.check('const a = 1;\nconst pris: number = "5";\n');
    expect(result.typeErrors).toHaveLength(1);
    expect(result.typeErrors[0]).toMatchObject({ code: 2322, line: 2 });
  });

  it('rättar typtester, även de som ska ge fel', () => {
    const code = "type Storlek = 'liten' | 'stor';\n";
    const result = checker.check(code, [
      { description: 'liten', code: "const s: Storlek = 'liten';" },
      {
        description: 'jätte',
        code: "const s: Storlek = 'jätte';",
        fails: true,
      },
      {
        description: 'stor ger fel',
        code: "const s: Storlek = 'stor';",
        fails: true,
      },
    ]);
    expect(result.typeTests.map(t => t.passed)).toEqual([true, true, false]);
  });

  it('kollar strikt null och implicit any', () => {
    const result = checker.check('function f(x) { return x; }\n');
    expect(result.typeErrors[0].code).toBe(7006);
  });

  it('syntaxfel', () => {
    const result = checker.check('function f( {\n');
    expect(result.syntaxErrors.length).toBeGreaterThan(0);
    expect(result.syntaxErrors[0].line).toBe(1);
  });

  it('React med typade props', () => {
    const code = `import { useState } from 'react';
type Props = { namn: string };
export function Hej({ namn }: Props) {
  const [antal, setAntal] = useState(0);
  return <button onClick={() => setAntal(antal + 1)}>{namn} {antal}</button>;
}
function Fel() { return <Hej namn={5} />; }
function Input() { return <input onChange={e => console.log(e.target.value)} />; }
`;
    const result = checker.check(code);
    expect(result.syntaxErrors).toEqual([]);
    expect(result.typeErrors.map(e => [e.line, e.code])).toEqual([[7, 2322]]);
  });

  it('hover visar typen', () => {
    const info = checker.quickInfo('const pris = 5;\n', 7);
    expect(info.text).toBe('const pris: 5');
  });

  it('förslag efter punkt', () => {
    const labels = checker
      .completions("const s = 'hej';\ns.", 19)
      .map(e => e.label);
    expect(labels).toContain('toUpperCase');
  });

  it('fetch, console och Promise finns', () => {
    const code = `async function hamta(): Promise<number> {
  const svar = await fetch('/api');
  const data: unknown = await svar.json();
  console.log(data);
  return [1, 2, 3].findLast(x => x > 1) ?? 0;
}\n`;
    expect(checker.check(code).typeErrors).toEqual([]);
  });

  it('gör om till JavaScript', () => {
    expect(toJavaScript('const a: number = 1;\ntype T = string;\n')).toBe(
      'const a = 1;\n',
    );
  });
});
