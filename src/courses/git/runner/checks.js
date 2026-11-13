import { findRepo, statusOf } from './git';
import { createWorld, resolve, runScript } from './shell';

// En kontroll av läget efter elevens kommandon (se docs/kurser/git.md).
// Svarar med { passed, actual, expected }.
function check(world, transcript, test) {
  const repoAt = path => findRepo(world, resolve(world, path ?? '.'));
  const found = () => {
    const at = repoAt(test.repo);
    if (!at) throw new Error('det finns inget Git-repo där');
    return at;
  };
  const head = repo => repo.branches.get(repo.head) ?? null;
  const commitsOn = repo => {
    let count = 0;
    let id = head(repo);
    while (id) {
      count += 1;
      id = repo.commits.get(id).parents[0] ?? null;
    }
    return count;
  };

  if (test.cwd !== undefined) {
    return {
      passed: world.cwd === test.cwd,
      actual: world.cwd,
      expected: test.cwd,
    };
  }
  if (test.exists !== undefined) {
    const actual = world.files.has(resolve(world, test.exists));
    return { passed: actual, actual, expected: true };
  }
  if (test.missing !== undefined) {
    const actual = !world.files.has(resolve(world, test.missing));
    return { passed: actual, actual, expected: true };
  }
  if (test.file !== undefined) {
    const entry = world.files.get(resolve(world, test.file));
    const actual = entry?.type === 'file' ? entry.content : null;
    const expected =
      test.content.endsWith('\n') || test.content === ''
        ? test.content
        : `${test.content}\n`;
    return { passed: actual === expected, actual, expected };
  }
  if (test.output !== undefined) {
    const text = transcript.join('\n');
    return {
      passed: text.includes(test.output),
      actual: text,
      expected: test.output,
    };
  }
  const { root, repo } = found();
  if (test.commits !== undefined) {
    const actual = commitsOn(repo);
    return { passed: actual === test.commits, actual, expected: test.commits };
  }
  if (test.message !== undefined) {
    const id = head(repo);
    const actual = id ? repo.commits.get(id).message : null;
    return { passed: actual === test.message, actual, expected: test.message };
  }
  if (test.clean !== undefined) {
    const { staged, unstaged, untracked } = statusOf(world, root, repo);
    const actual =
      staged.length + unstaged.length + untracked.length === 0 && !repo.merging;
    return { passed: actual === test.clean, actual, expected: test.clean };
  }
  if (test.staged !== undefined) {
    const actual = statusOf(world, root, repo)
      .staged.map(([, path]) => path)
      .sort();
    const expected = [...test.staged].sort();
    return {
      passed: JSON.stringify(actual) === JSON.stringify(expected),
      actual,
      expected,
    };
  }
  if (test.tracked !== undefined) {
    const actual = [...repo.index.keys()].sort();
    const expected = [...test.tracked].sort();
    return {
      passed: JSON.stringify(actual) === JSON.stringify(expected),
      actual,
      expected,
    };
  }
  if (test.branch !== undefined) {
    return {
      passed: repo.head === test.branch,
      actual: repo.head,
      expected: test.branch,
    };
  }
  if (test.branches !== undefined) {
    const actual = [...repo.branches.keys()].sort();
    const expected = [...test.branches].sort();
    return {
      passed: JSON.stringify(actual) === JSON.stringify(expected),
      actual,
      expected,
    };
  }
  if (test.merged !== undefined) {
    // Senaste commit har två föräldrar: en sammanslagning.
    const id = head(repo);
    const actual = Boolean(id && repo.commits.get(id).parents.length === 2);
    return { passed: actual === test.merged, actual, expected: test.merged };
  }
  if (test.pushed !== undefined) {
    const url = repo.remotes.get('origin');
    const remote = url && world.servers.get(url.replace(/\.git$/, ''));
    const actual = Boolean(
      remote && remote.branches.get(repo.head) === head(repo),
    );
    return { passed: actual === test.pushed, actual, expected: test.pushed };
  }
  throw new Error(`okänd kontroll: ${JSON.stringify(test)}`);
}

// Kör övningens setup (osynligt) och sedan elevens kommandon, och kontrollerar
// läget. Samma form som de andra kursernas run: output, error och tests.
export function runGit({ code, setup = '', tests = [] }) {
  const world = createWorld();
  if (setup) {
    const prepared = runScript(world, setup, { echo: false });
    if (prepared.error)
      throw new Error(`Övningens setup stoppade: ${prepared.error.message}`);
  }
  const { transcript, error } = runScript(world, code);
  const results = error
    ? []
    : tests.map(test => {
        try {
          return check(world, transcript, test);
        } catch (failure) {
          return { passed: false, error: failure.message };
        }
      });
  return { output: transcript, error, tests: results, cwd: world.cwd };
}
