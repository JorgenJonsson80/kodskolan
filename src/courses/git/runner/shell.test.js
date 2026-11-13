import { describe, expect, it } from 'vitest';
import { runGit } from './checks';
import { tokenize } from './shell';

const run = (code, tests = [], setup = '') => runGit({ code, tests, setup });

describe('terminalen', () => {
  it('läser citattecken och >', () => {
    expect(tokenize('echo "Hej du" > a.txt')).toEqual([
      'echo',
      'Hej du',
      '>',
      'a.txt',
    ]);
    expect(tokenize("echo 'x'>>b")).toEqual(['echo', 'x', '>>', 'b']);
  });

  it('mappar, filer och sökvägar', () => {
    const result = run(
      'pwd\nmkdir projekt\ncd projekt\ntouch tom.txt\necho "Hej" > hej.txt\necho "då" >> hej.txt\ncat hej.txt\ncd ..\nls\nls projekt',
      [
        { cwd: '/hem' },
        { file: 'projekt/hej.txt', content: 'Hej\ndå\n' },
        { exists: 'projekt/tom.txt' },
      ],
    );
    expect(result.error).toBeNull();
    expect(result.output).toEqual([
      '$ pwd',
      '/hem',
      '$ mkdir projekt',
      '$ cd projekt',
      '$ touch tom.txt',
      '$ echo "Hej" > hej.txt',
      '$ echo "då" >> hej.txt',
      '$ cat hej.txt',
      'Hej',
      'då',
      '$ cd ..',
      '$ ls',
      'projekt',
      '$ ls projekt',
      'hej.txt  tom.txt',
    ]);
    expect(result.tests.every(test => test.passed)).toBe(true);
  });

  it('cp, mv, rm och dolda filer', () => {
    const result = run(
      'echo a > a.txt\ncp a.txt b.txt\nmkdir arkiv\nmv b.txt arkiv\ntouch .dold\nls\nls -a\nrm a.txt\nrm -r arkiv',
      [{ missing: 'a.txt' }, { missing: 'arkiv' }, { exists: '.dold' }],
    );
    expect(result.output).toContain('a.txt  arkiv');
    expect(result.output).toContain('.  ..  .dold  a.txt  arkiv');
    expect(result.tests.every(test => test.passed)).toBe(true);
  });

  it('stoppar vid fel och säger vilken rad', () => {
    const result = run('mkdir a\ncd b\nmkdir c');
    expect(result.error).toMatchObject({ kind: 'notFound', line: 2 });
    expect(run('ld').error).toMatchObject({
      kind: 'unknownCommand',
      suggestion: 'ls',
    });
    expect(run('rm a', [], 'mkdir a').error.kind).toBe('rmDir');
    expect(run('echo "hej').error.kind).toBe('quote');
  });
});

describe('git', () => {
  const START =
    'mkdir projekt\ncd projekt\ngit init\necho "# Projekt" > README.md\n';

  it('första commit och status', () => {
    const result = run(
      `${START}git status\ngit add README.md\ngit commit -m "Första commit"\ngit status\ngit log --oneline`,
      [{ commits: 1 }, { message: 'Första commit' }, { clean: true }],
    );
    expect(result.error).toBeNull();
    expect(result.output).toContain('Untracked files:');
    expect(result.output.join('\n')).toMatch(
      /\[main \(root-commit\) [0-9a-f]{7}\] Första commit/,
    );
    expect(result.output).toContain('nothing to commit, working tree clean');
    expect(result.output.at(-1)).toMatch(
      /^[0-9a-f]{7} \(HEAD -> main\) Första commit$/,
    );
    expect(result.tests.every(test => test.passed)).toBe(true);
  });

  it('samma kommandon ger samma commit-id', () => {
    const code = `${START}git add .\ngit commit -m "A"\ngit log --oneline`;
    expect(run(code).output.at(-1)).toBe(run(code).output.at(-1));
  });

  it('diff, restore och .gitignore', () => {
    const result = run(
      `${START}git add .\ngit commit -m "A"\necho "Ny rad" >> README.md\ngit diff\ngit restore README.md\necho "x" > hemligt.txt\necho "hemligt.txt" > .gitignore\ngit status`,
      [{ file: 'README.md', content: '# Projekt' }],
    );
    expect(result.output).toContain('+Ny rad');
    expect(result.output).toContain('\t.gitignore');
    expect(result.output).not.toContain('\themligt.txt');
    expect(result.tests[0].passed).toBe(true);
  });

  it('grenar och snabbspolning', () => {
    const result = run(
      `${START}git add .\ngit commit -m "A"\ngit switch -c ny\necho "x" > ny.txt\ngit add ny.txt\ngit commit -m "B"\ngit switch main\nls\ngit merge ny\nls\ngit branch -d ny`,
      [{ commits: 2 }, { branches: ['main'] }, { exists: 'ny.txt' }],
    );
    expect(result.error).toBeNull();
    expect(result.output).toContain('Fast-forward');
    expect(result.tests.every(test => test.passed)).toBe(true);
  });

  it('konflikt, lagning och sammanslagning', () => {
    const result = run(
      `${START}echo "rad 1" > a.txt\necho "färg: blå" >> a.txt\ngit add .\ngit commit -m "A"\ngit switch -c röd\necho "rad 1" > a.txt\necho "färg: röd" >> a.txt\ngit commit -am "Röd"\ngit switch main\necho "rad 1" > a.txt\necho "färg: grön" >> a.txt\ngit commit -am "Grön"\ngit merge röd\ncat a.txt`,
    );
    expect(result.output).toContain(
      'CONFLICT (content): Merge conflict in a.txt',
    );
    expect(result.output.slice(-6)).toEqual([
      'rad 1',
      '<<<<<<< HEAD',
      'färg: grön',
      '=======',
      'färg: röd',
      '>>>>>>> röd',
    ]);
    const commitEarly = run(`${START.replace(/\n$/, '')}`);
    void commitEarly;
    const fixed = run(
      `${START}echo "rad 1" > a.txt\necho "färg: blå" >> a.txt\ngit add .\ngit commit -m "A"\ngit switch -c röd\necho "färg: röd" > a.txt\ngit commit -am "Röd"\ngit switch main\necho "färg: grön" > a.txt\ngit commit -am "Grön"\ngit merge röd\necho "färg: lila" > a.txt\ngit add a.txt\ngit commit -m "Lila"`,
      [
        { merged: true },
        { file: 'a.txt', content: 'färg: lila' },
        { clean: true },
      ],
    );
    expect(fixed.error).toBeNull();
    expect(fixed.tests.every(test => test.passed)).toBe(true);
  });

  it('kan inte committa med olagade konflikter', () => {
    const result = run(
      `${START}echo a > a.txt\ngit add .\ngit commit -m A\ngit switch -c x\necho b > a.txt\ngit commit -am B\ngit switch main\necho c > a.txt\ngit commit -am C\ngit merge x\ngit commit -m "Klar"`,
    );
    expect(result.error.kind).toBe('unmerged');
  });

  it('push, clone och pull mot låtsasservern', () => {
    const url = 'https://github.com/ada/projekt';
    const result = run(
      `${START}git add .\ngit commit -m "A"\ngit remote add origin ${url}\ngit push -u origin main\ncd ..\ngit clone ${url} kopia\ncd kopia\necho "x" > x.txt\ngit add .\ngit commit -m "B"\ngit push\ncd ../projekt\ngit pull\nls`,
      [
        { cwd: '/hem/projekt' },
        { commits: 2 },
        { exists: 'x.txt' },
        { pushed: true },
      ],
    );
    expect(result.error).toBeNull();
    expect(result.output).toContain(' * [new branch]      main -> main');
    expect(result.tests.every(test => test.passed)).toBe(true);
  });

  it('push nekas när servern har nyare commits', () => {
    const url = 'https://github.com/ada/p';
    const setup = `mkdir a\ncd a\ngit init\necho 1 > f\ngit add .\ngit commit -m 1\ngit remote add origin ${url}\ngit push origin main\ncd ..\ngit clone ${url} b\ncd b\necho 2 > g\ngit add .\ngit commit -m 2\ngit push\ncd ../a`;
    expect(
      run(
        'echo 3 > h\ngit add .\ngit commit -m 3\ngit push origin main',
        [],
        setup,
      ).error.kind,
    ).toBe('rejected');
  });

  it('säger till utanför ett repo och vid okända git-kommandon', () => {
    expect(run('git status').error.kind).toBe('notRepo');
    expect(run('git comit -m x', [], 'git init').error).toMatchObject({
      kind: 'unknownGit',
      suggestion: 'commit',
    });
  });
});

describe('git revert', () => {
  it('ångrar en commit med en ny commit', () => {
    const result = runGit({
      code: 'git init\necho "blå" > f.txt\ngit add .\ngit commit -m "A"\necho "röd" > f.txt\ntouch ny.txt\ngit add .\ngit commit -m "B"\ngit revert HEAD',
      tests: [
        { file: 'f.txt', content: 'blå' },
        { missing: 'ny.txt' },
        { commits: 3 },
        { message: 'Revert "B"' },
      ],
    });
    expect(result.error).toBeNull();
    expect(result.tests.every(test => test.passed)).toBe(true);
  });
});
