// En förenklad Git för kursen: index, commits, grenar, sammanslagning med
// konflikter och en låtsasserver för push, pull och clone. Utskrifterna
// liknar riktiga Git (på engelska, som eleven kommer att se dem), men är
// kortare. Felen förklaras på svenska i friendlyErrors.js.
import {
  filesUnder,
  nameOf,
  parentOf,
  removeTree,
  resolve,
  ShellError,
  writeFile,
} from './shell';

const AUTHOR = 'Du <du@kodskolan.nu>';
const SERVER = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+?(\.git)?$/;

// --- Hjälpare ---

// Ett kort, stabilt id ur innehållet (FNV-1a), som Gits sha.
function hash(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  let g = 0x1234567;
  for (let i = text.length - 1; i >= 0; i -= 1) {
    g ^= text.charCodeAt(i);
    g = Math.imul(g, 0x01000193) >>> 0;
  }
  return (
    h.toString(16).padStart(8, '0') + g.toString(16).padStart(8, '0')
  ).slice(0, 12);
}

const short = id => id.slice(0, 7);
const sameTree = (a, b) =>
  a.size === b.size && [...a].every(([path, text]) => b.get(path) === text);

function dateText(minutes) {
  const date = new Date(Date.UTC(2026, 0, 5, 9, minutes));
  return date.toISOString().slice(0, 16).replace('T', ' ');
}

// Repot som cwd ligger i, närmast först.
export function findRepo(world, from = world.cwd) {
  let dir = from;
  for (;;) {
    if (world.repos.has(dir)) return { root: dir, repo: world.repos.get(dir) };
    if (dir === '/') return null;
    dir = parentOf(dir);
  }
}

function requireRepo(world) {
  const found = findRepo(world);
  if (!found)
    throw new ShellError(
      'notRepo',
      'fatal: not a git repository (or any of the parent directories): .git',
    );
  return found;
}

const headId = repo => repo.branches.get(repo.head) ?? null;
const treeOf = (repo, id) => (id ? repo.commits.get(id).tree : new Map());

// .gitignore: rader som "hemligt.txt", "*.log" eller "node_modules/".
function ignored(patterns, path) {
  return patterns.some(pattern => {
    if (pattern.endsWith('/'))
      return path.startsWith(pattern) || path.includes(`/${pattern}`);
    if (pattern.startsWith('*.')) return path.endsWith(pattern.slice(1));
    return path === pattern || nameOf(`/${path}`) === pattern;
  });
}

function workingTree(world, root) {
  const files = filesUnder(world, root);
  for (const path of [...files.keys()]) {
    if (path.startsWith('.git/')) files.delete(path);
  }
  const rules = (files.get('.gitignore') ?? '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
  return { files, isIgnored: path => ignored(rules, path) };
}

// Vad som skiljer index från senaste commit, och arbetskopian från index.
export function statusOf(world, root, repo) {
  const head = treeOf(repo, headId(repo));
  const { files, isIgnored } = workingTree(world, root);
  const staged = [];
  for (const [path, text] of repo.index) {
    if (!head.has(path)) staged.push(['new file', path]);
    else if (head.get(path) !== text) staged.push(['modified', path]);
  }
  for (const path of head.keys()) {
    if (!repo.index.has(path)) staged.push(['deleted', path]);
  }
  const unstaged = [];
  for (const [path, text] of repo.index) {
    if (!files.has(path)) unstaged.push(['deleted', path]);
    else if (files.get(path) !== text) unstaged.push(['modified', path]);
  }
  const untracked = [...files.keys()]
    .filter(path => !repo.index.has(path) && !isIgnored(path))
    .sort();
  return {
    staged: staged.sort((a, b) => a[1].localeCompare(b[1])),
    unstaged,
    untracked,
  };
}

// Skriv ett träd till arbetskopian: ta bort filer som följer med Git men
// inte finns i trädet, och skriv resten.
function checkoutTree(world, root, repo, from, to) {
  for (const path of from.keys()) {
    if (!to.has(path)) world.files.delete(`${root}/${path}`);
  }
  for (const [path, text] of to) {
    const full = `${root}/${path}`;
    let dir = parentOf(full);
    const missing = [];
    while (!world.files.has(dir)) {
      missing.unshift(dir);
      dir = parentOf(dir);
    }
    missing.forEach(path => world.files.set(path, { type: 'dir' }));
    world.files.set(full, { type: 'file', content: text });
  }
  repo.index = new Map(to);
}

function ancestors(repo, id) {
  const seen = new Set();
  const stack = id ? [id] : [];
  while (stack.length > 0) {
    const current = stack.pop();
    if (seen.has(current)) continue;
    seen.add(current);
    stack.push(...repo.commits.get(current).parents);
  }
  return seen;
}

function mergeBase(repo, a, b) {
  const fromA = ancestors(repo, a);
  // Bredden först från b: den första som också nås från a.
  const queue = [b];
  const seen = new Set();
  while (queue.length > 0) {
    const current = queue.shift();
    if (fromA.has(current)) return current;
    if (seen.has(current)) continue;
    seen.add(current);
    queue.push(...repo.commits.get(current).parents);
  }
  return null;
}

function newCommit(world, repo, message, parents) {
  world.clock += 1;
  const tree = new Map([...repo.index].sort());
  const id = hash(JSON.stringify([parents, message, [...tree], world.clock]));
  repo.commits.set(id, { id, message, parents, tree, time: world.clock });
  repo.branches.set(repo.head, id);
  return id;
}

function changedCount(before, after) {
  const paths = new Set([...before.keys(), ...after.keys()]);
  return [...paths].filter(path => before.get(path) !== after.get(path)).length;
}

// En rad-för-rad-diff (längsta gemensamma delföljden), som i git diff.
function lineDiff(before, after) {
  const a = before === '' ? [] : before.replace(/\n$/, '').split('\n');
  const b = after === '' ? [] : after.replace(/\n$/, '').split('\n');
  const table = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0),
  );
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      table[i][j] =
        a[i] === b[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const lines = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      lines.push(` ${a[i]}`);
      i += 1;
      j += 1;
    } else if (
      j < b.length &&
      (i === a.length || table[i][j + 1] >= table[i + 1][j])
    ) {
      lines.push(`+${b[j]}`);
      j += 1;
    } else {
      lines.push(`-${a[i]}`);
      i += 1;
    }
  }
  return lines;
}

function showDiff(out, pairs) {
  for (const [path, before, after] of pairs) {
    out.push(`diff --git a/${path} b/${path}`);
    out.push(before === null ? '--- /dev/null' : `--- a/${path}`);
    out.push(after === null ? '+++ /dev/null' : `+++ b/${path}`);
    out.push(...lineDiff(before ?? '', after ?? ''));
  }
}

// Konflikt: gemensam början och slut behålls, mitten markeras.
function conflictText(base, ours, theirs, branch) {
  const split = text => (text ?? '').replace(/\n$/, '').split('\n');
  const [b, o, t] = [split(base), split(ours), split(theirs)];
  let start = 0;
  while (start < o.length && start < t.length && o[start] === t[start])
    start += 1;
  let end = 0;
  while (
    end < o.length - start &&
    end < t.length - start &&
    o[o.length - 1 - end] === t[t.length - 1 - end]
  ) {
    end += 1;
  }
  const lines = [
    ...o.slice(0, start),
    '<<<<<<< HEAD',
    ...o.slice(start, o.length - end),
    '=======',
    ...t.slice(start, t.length - end),
    `>>>>>>> ${branch}`,
    ...o.slice(o.length - end),
  ];
  void b;
  return `${lines.join('\n')}\n`;
}

// --- Underkommandona ---

function parseMessage(args) {
  const index = args.findIndex(arg => arg === '-m' || arg === '-am');
  if (index === -1) return null;
  const message = args[index + 1];
  if (!message)
    throw new ShellError('noMessage', "error: switch `m' requires a value");
  return message;
}

function add(world, root, repo, paths) {
  if (paths.length === 0) {
    throw new ShellError('addNothing', 'Nothing specified, nothing added.');
  }
  const { files, isIgnored } = workingTree(world, root);
  for (const given of paths) {
    const all = given === '.' || given === '-A' || given === '--all';
    const full = all ? world.cwd : resolve(world, given);
    const prefix = full === root ? '' : `${full.slice(root.length + 1)}`;
    const matches = path =>
      all
        ? path.startsWith(prefix ? `${prefix}/` : '') || prefix === ''
        : path === prefix || path.startsWith(`${prefix}/`);
    let found = false;
    for (const [path, text] of files) {
      if (matches(path) && (!isIgnored(path) || path === prefix)) {
        repo.index.set(path, text);
        found = true;
      }
    }
    for (const path of [...repo.index.keys()]) {
      if (matches(path) && !files.has(path)) {
        repo.index.delete(path);
        found = true;
      }
    }
    repo.unmerged?.forEach(path => {
      if (matches(path)) repo.unmerged.delete(path);
    });
    if (!found && !all) {
      throw new ShellError(
        'pathspec',
        `fatal: pathspec '${given}' did not match any files`,
        { path: given },
      );
    }
  }
}

function commit(world, root, repo, args, out) {
  const message = parseMessage(args);
  if (message === null) {
    throw new ShellError(
      'noMessage',
      'Aborting commit due to empty commit message.',
    );
  }
  if (args.includes('-a') || args.includes('-am')) {
    const { files } = workingTree(world, root);
    for (const path of [...repo.index.keys()]) {
      if (files.has(path)) repo.index.set(path, files.get(path));
      else repo.index.delete(path);
    }
  }
  if (repo.unmerged?.size > 0) {
    throw new ShellError(
      'unmerged',
      'error: Committing is not possible because you have unmerged files.',
      {
        paths: [...repo.unmerged],
      },
    );
  }
  const parentId = headId(repo);
  const before = treeOf(repo, parentId);
  if (!repo.merging && sameTree(before, repo.index)) {
    const { unstaged, untracked } = statusOf(world, root, repo);
    out.push(`On branch ${repo.head}`);
    out.push(
      unstaged.length > 0
        ? 'no changes added to commit (use "git add")'
        : untracked.length > 0
          ? 'nothing added to commit but untracked files present (use "git add" to track)'
          : 'nothing to commit, working tree clean',
    );
    return;
  }
  const parents = parentId ? [parentId] : [];
  if (repo.merging) parents.push(repo.merging.theirs);
  const id = newCommit(world, repo, message, parents);
  repo.merging = null;
  const count = changedCount(before, repo.index);
  out.push(
    `[${repo.head}${parentId ? '' : ' (root-commit)'} ${short(id)}] ${message}`,
  );
  out.push(` ${count} file${count === 1 ? '' : 's'} changed`);
}

function status(world, root, repo, out) {
  const { staged, unstaged, untracked } = statusOf(world, root, repo);
  out.push(`On branch ${repo.head}`);
  if (!headId(repo)) out.push('', 'No commits yet');
  if (repo.merging) {
    out.push(
      'You have unmerged paths.',
      '  (fix conflicts and run "git commit")',
    );
  }
  if (repo.unmerged?.size > 0) {
    out.push(
      '',
      'Unmerged paths:',
      '  (use "git add <file>..." to mark resolution)',
    );
    [...repo.unmerged].forEach(path => out.push(`\tboth modified:   ${path}`));
  }
  const conflicted = repo.unmerged ?? new Set();
  if (staged.length > 0) {
    out.push(
      '',
      'Changes to be committed:',
      '  (use "git restore --staged <file>..." to unstage)',
    );
    staged.forEach(([kind, path]) =>
      out.push(`\t${`${kind}:`.padEnd(12)}${path}`),
    );
  }
  const notStaged = unstaged.filter(([, path]) => !conflicted.has(path));
  if (notStaged.length > 0) {
    out.push(
      '',
      'Changes not staged for commit:',
      '  (use "git add <file>..." to update what will be committed)',
    );
    notStaged.forEach(([kind, path]) =>
      out.push(`\t${`${kind}:`.padEnd(12)}${path}`),
    );
  }
  if (untracked.length > 0) {
    out.push(
      '',
      'Untracked files:',
      '  (use "git add <file>..." to include in what will be committed)',
    );
    untracked.forEach(path => out.push(`\t${path}`));
  }
  if (
    staged.length + notStaged.length + untracked.length + conflicted.size ===
    0
  ) {
    out.push(
      headId(repo)
        ? 'nothing to commit, working tree clean'
        : 'nothing to commit (create/copy files and use "git add" to track)',
    );
  }
}

function log(repo, args, out) {
  const id = headId(repo);
  if (!id) {
    throw new ShellError(
      'noCommits',
      `fatal: your current branch '${repo.head}' does not have any commits yet`,
    );
  }
  const labels = commitId =>
    [...repo.branches]
      .filter(([, target]) => target === commitId)
      .map(([name]) => (name === repo.head ? `HEAD -> ${name}` : name));
  const oneline = args.includes('--oneline');
  let current = id;
  while (current) {
    const entry = repo.commits.get(current);
    const tags = labels(current);
    const decoration = tags.length > 0 ? ` (${tags.join(', ')})` : '';
    if (oneline) {
      out.push(`${short(current)}${decoration} ${entry.message}`);
    } else {
      out.push(`commit ${current}${decoration}`);
      if (entry.parents.length > 1)
        out.push(`Merge: ${entry.parents.map(short).join(' ')}`);
      out.push(
        `Author: ${AUTHOR}`,
        `Date:   ${dateText(entry.time)}`,
        '',
        `    ${entry.message}`,
        '',
      );
    }
    current = entry.parents[0] ?? null;
  }
  if (!oneline) out.pop();
}

function diff(world, root, repo, args, out) {
  const stagedOnly = args.includes('--staged') || args.includes('--cached');
  const pairs = [];
  if (stagedOnly) {
    const head = treeOf(repo, headId(repo));
    const paths = new Set([...head.keys(), ...repo.index.keys()]);
    [...paths].sort().forEach(path => {
      const before = head.get(path) ?? null;
      const after = repo.index.get(path) ?? null;
      if (before !== after) pairs.push([path, before, after]);
    });
  } else {
    const { files } = workingTree(world, root);
    [...repo.index.keys()].sort().forEach(path => {
      const before = repo.index.get(path);
      const after = files.get(path) ?? null;
      if (before !== after) pairs.push([path, before, after]);
    });
  }
  showDiff(out, pairs);
}

function restore(world, root, repo, args) {
  const staged = args.includes('--staged');
  const paths = args.filter(arg => !arg.startsWith('--'));
  if (paths.length === 0)
    throw new ShellError(
      'pathspec',
      'fatal: you must specify path(s) to restore',
    );
  const head = treeOf(repo, headId(repo));
  for (const given of paths) {
    const path = resolve(world, given).slice(root.length + 1);
    if (staged) {
      if (head.has(path)) repo.index.set(path, head.get(path));
      else if (repo.index.has(path)) repo.index.delete(path);
      else
        throw new ShellError(
          'pathspec',
          `error: pathspec '${given}' did not match any file(s) known to git`,
          { path: given },
        );
    } else {
      if (!repo.index.has(path)) {
        throw new ShellError(
          'pathspec',
          `error: pathspec '${given}' did not match any file(s) known to git`,
          { path: given },
        );
      }
      writeFile(world, `${root}/${path}`, repo.index.get(path), given);
    }
  }
}

function hasChanges(world, root, repo) {
  const { staged, unstaged } = statusOf(world, root, repo);
  return staged.length > 0 || unstaged.length > 0;
}

function switchTo(world, root, repo, name, out) {
  if (!repo.branches.has(name)) {
    throw new ShellError('noBranch', `fatal: invalid reference: ${name}`, {
      branch: name,
    });
  }
  if (name === repo.head) {
    out.push(`Already on '${name}'`);
    return;
  }
  const from = treeOf(repo, headId(repo));
  const to = treeOf(repo, repo.branches.get(name));
  if (!sameTree(from, to) && hasChanges(world, root, repo)) {
    throw new ShellError(
      'dirtySwitch',
      'error: Your local changes to the following files would be overwritten by checkout.\nPlease commit your changes or stash them before you switch branches.',
    );
  }
  checkoutTree(world, root, repo, from, to);
  repo.head = name;
  out.push(`Switched to branch '${name}'`);
}

function createBranch(repo, name) {
  if (!/^[\p{L}\p{N}_./-]+$/u.test(name))
    throw new ShellError(
      'badBranch',
      `fatal: '${name}' is not a valid branch name`,
      { branch: name },
    );
  if (repo.branches.has(name))
    throw new ShellError(
      'branchExists',
      `fatal: a branch named '${name}' already exists`,
      { branch: name },
    );
  if (!headId(repo))
    throw new ShellError(
      'noCommits',
      `fatal: Not a valid object name: '${repo.head}'.`,
    );
  repo.branches.set(name, headId(repo));
}

function branch(repo, args, out) {
  const { flags, names } = {
    flags: args.filter(arg => arg.startsWith('-')),
    names: args.filter(arg => !arg.startsWith('-')),
  };
  if (flags.includes('-d') || flags.includes('-D')) {
    for (const name of names) {
      if (!repo.branches.has(name))
        throw new ShellError('noBranch', `error: branch '${name}' not found.`, {
          branch: name,
        });
      if (name === repo.head)
        throw new ShellError(
          'deleteCurrent',
          `error: Cannot delete branch '${name}' checked out`,
          { branch: name },
        );
      const merged = ancestors(repo, headId(repo)).has(repo.branches.get(name));
      if (!merged && !flags.includes('-D')) {
        throw new ShellError(
          'notMerged',
          `error: The branch '${name}' is not fully merged.`,
          { branch: name },
        );
      }
      out.push(
        `Deleted branch ${name} (was ${short(repo.branches.get(name))}).`,
      );
      repo.branches.delete(name);
    }
    return;
  }
  if (names.length > 0) {
    createBranch(repo, names[0]);
    return;
  }
  [...repo.branches.keys()]
    .sort()
    .forEach(name => out.push(`${name === repo.head ? '*' : ' '} ${name}`));
  if (!repo.branches.has(repo.head)) out.unshift(`* ${repo.head}`);
}

function mergeCommits(world, root, repo, theirsId, label, out) {
  const oursId = headId(repo);
  if (!theirsId)
    throw new ShellError(
      'noBranch',
      `merge: ${label} - not something we can merge`,
      { branch: label },
    );
  if (hasChanges(world, root, repo)) {
    throw new ShellError(
      'dirtyMerge',
      'error: Your local changes would be overwritten by merge.\nPlease commit your changes or stash them before you merge.',
    );
  }
  if (ancestors(repo, oursId).has(theirsId)) {
    out.push('Already up to date.');
    return;
  }
  const from = treeOf(repo, oursId);
  if (!oursId || ancestors(repo, theirsId).has(oursId)) {
    const to = treeOf(repo, theirsId);
    out.push(
      `Updating ${oursId ? short(oursId) : '0000000'}..${short(theirsId)}`,
      'Fast-forward',
    );
    checkoutTree(world, root, repo, from, to);
    repo.branches.set(repo.head, theirsId);
    out.push(
      ` ${changedCount(from, to)} file${changedCount(from, to) === 1 ? '' : 's'} changed`,
    );
    return;
  }
  const base = treeOf(repo, mergeBase(repo, oursId, theirsId));
  const theirs = treeOf(repo, theirsId);
  const result = new Map();
  const conflicts = [];
  const paths = new Set([...base.keys(), ...from.keys(), ...theirs.keys()]);
  for (const path of [...paths].sort()) {
    const [b, o, t] = [base.get(path), from.get(path), theirs.get(path)];
    if (o === t || t === b) {
      if (o !== undefined) result.set(path, o);
    } else if (o === b) {
      if (t !== undefined) result.set(path, t);
    } else {
      conflicts.push(path);
      result.set(path, conflictText(b, o, t, label));
    }
  }
  checkoutTree(world, root, repo, from, result);
  if (conflicts.length > 0) {
    repo.merging = { theirs: theirsId };
    repo.unmerged = new Set(conflicts);
    conflicts.forEach(path => {
      repo.index.set(path, from.get(path) ?? '');
      out.push(
        `Auto-merging ${path}`,
        `CONFLICT (content): Merge conflict in ${path}`,
      );
    });
    out.push(
      'Automatic merge failed; fix conflicts and then commit the result.',
    );
    return;
  }
  const id = newCommit(world, repo, `Merge branch '${label}'`, [
    oursId,
    theirsId,
  ]);
  out.push(
    `Merge made by the 'ort' strategy.`,
    ` ${changedCount(from, result)} file${changedCount(from, result) === 1 ? '' : 's'} changed`,
  );
  void id;
}

// git revert: en ny commit som tar tillbaka det en tidigare commit
// ändrade. Historiken skrivs aldrig om, så det går bra även efter push.
function revert(world, root, repo, args, out) {
  const given = args.find(arg => !arg.startsWith('-'));
  if (!given)
    throw new ShellError('missingArg', 'usage: git revert <commit>', {
      command: 'git revert',
    });
  const id =
    given === 'HEAD'
      ? headId(repo)
      : [...repo.commits.keys()].find(key => key.startsWith(given));
  if (!id)
    throw new ShellError('badRevision', `fatal: bad revision '${given}'`, {
      revision: given,
    });
  if (hasChanges(world, root, repo)) {
    throw new ShellError(
      'dirtyMerge',
      'error: your local changes would be overwritten by revert.',
    );
  }
  const target = repo.commits.get(id);
  const before = treeOf(repo, target.parents[0] ?? null);
  const current = treeOf(repo, headId(repo));
  const next = new Map(current);
  const paths = new Set([...before.keys(), ...target.tree.keys()]);
  for (const path of paths) {
    if (before.get(path) === target.tree.get(path)) continue;
    if (before.has(path)) next.set(path, before.get(path));
    else next.delete(path);
  }
  checkoutTree(world, root, repo, current, next);
  const message = `Revert "${target.message}"`;
  const newId = newCommit(world, repo, message, [headId(repo)]);
  out.push(
    `[${repo.head} ${short(newId)}] ${message}`,
    ` ${changedCount(current, next)} file${changedCount(current, next) === 1 ? '' : 's'} changed`,
  );
}

// --- Servern (GitHub på låtsas) ---

function server(world, url) {
  if (!SERVER.test(url)) {
    throw new ShellError('badUrl', `fatal: repository '${url}' not found`, {
      url,
    });
  }
  const key = url.replace(/\.git$/, '');
  if (!world.servers.has(key))
    world.servers.set(key, { commits: new Map(), branches: new Map() });
  return world.servers.get(key);
}

function remoteUrl(repo, name) {
  const url = repo.remotes.get(name);
  if (!url)
    throw new ShellError(
      'noRemote',
      `fatal: '${name}' does not appear to be a git repository`,
      { remote: name },
    );
  return url;
}

function push(world, repo, args, out) {
  const rest = args.filter(arg => !arg.startsWith('-'));
  const remote = rest[0] ?? repo.upstream?.remote ?? 'origin';
  const name = rest[1] ?? repo.head;
  const url = remoteUrl(repo, remote);
  const target = server(world, url);
  const local = repo.branches.get(name);
  if (!local)
    throw new ShellError(
      'noBranch',
      `error: src refspec ${name} does not match any`,
      { branch: name },
    );
  const there = target.branches.get(name);
  if (there && !ancestors(repo, local).has(there)) {
    throw new ShellError(
      'rejected',
      `To ${url}\n ! [rejected]        ${name} -> ${name} (fetch first)\nerror: failed to push some refs to '${url}'`,
    );
  }
  for (const id of ancestors(repo, local))
    target.commits.set(id, repo.commits.get(id));
  target.branches.set(name, local);
  if (args.includes('-u')) repo.upstream = { remote, branch: name };
  out.push(`To ${url}`);
  out.push(
    there === local
      ? 'Everything up-to-date'
      : there
        ? `   ${short(there)}..${short(local)}  ${name} -> ${name}`
        : ` * [new branch]      ${name} -> ${name}`,
  );
}

function pull(world, root, repo, args, out) {
  const rest = args.filter(arg => !arg.startsWith('-'));
  const remote = rest[0] ?? repo.upstream?.remote ?? 'origin';
  const name = rest[1] ?? repo.upstream?.branch ?? repo.head;
  const source = server(world, remoteUrl(repo, remote));
  const theirs = source.branches.get(name);
  if (!theirs)
    throw new ShellError(
      'noBranch',
      `fatal: couldn't find remote ref ${name}`,
      { branch: name },
    );
  for (const [id, entry] of source.commits) repo.commits.set(id, entry);
  out.push(`From ${repo.remotes.get(remote)}`);
  mergeCommits(world, root, repo, theirs, `${remote}/${name}`, out);
}

function clone(world, args, out) {
  const url = args.find(arg => !arg.startsWith('-'));
  if (!url)
    throw new ShellError(
      'missingArg',
      'fatal: You must specify a repository to clone.',
      { command: 'git clone' },
    );
  const source = server(world, url);
  if (!source.branches.has('main')) {
    throw new ShellError('badUrl', `fatal: repository '${url}' not found`, {
      url,
    });
  }
  const name = (
    args.filter(arg => !arg.startsWith('-'))[1] ?? nameOf(url)
  ).replace(/\.git$/, '');
  const root = resolve(world, name);
  if (world.files.has(root)) {
    throw new ShellError(
      'exists',
      `fatal: destination path '${name}' already exists and is not an empty directory.`,
      { path: name },
    );
  }
  world.files.set(root, { type: 'dir' });
  world.files.set(`${root}/.git`, { type: 'dir' });
  const repo = {
    head: 'main',
    index: new Map(),
    commits: new Map(source.commits),
    branches: new Map([['main', source.branches.get('main')]]),
    remotes: new Map([['origin', url]]),
    upstream: { remote: 'origin', branch: 'main' },
  };
  world.repos.set(root, repo);
  checkoutTree(world, root, repo, new Map(), treeOf(repo, headId(repo)));
  out.push(`Cloning into '${name}'...`);
}

// --- In i Git ---

export function gitCommand(world, args, out) {
  const [sub, ...rest] = args;
  if (!sub) {
    out.push('usage: git <command> [<args>]');
    return;
  }
  if (sub === 'init') {
    if (world.repos.has(world.cwd)) {
      out.push(`Reinitialized existing Git repository in ${world.cwd}/.git/`);
      return;
    }
    world.files.set(`${world.cwd === '/' ? '' : world.cwd}/.git`, {
      type: 'dir',
    });
    world.repos.set(world.cwd, {
      head: 'main',
      index: new Map(),
      commits: new Map(),
      branches: new Map(),
      remotes: new Map(),
    });
    out.push(`Initialized empty Git repository in ${world.cwd}/.git/`);
    return;
  }
  if (sub === 'clone') {
    clone(world, rest, out);
    return;
  }
  if (sub === '--version') {
    out.push('git version 2.47.0 (Kodskolan)');
    return;
  }
  const KNOWN = [
    'add',
    'commit',
    'status',
    'log',
    'diff',
    'restore',
    'branch',
    'switch',
    'checkout',
    'merge',
    'remote',
    'push',
    'pull',
    'rm',
    'mv',
    'revert',
  ];
  if (!KNOWN.includes(sub)) {
    throw new ShellError(
      'unknownGit',
      `git: '${sub}' is not a git command. See 'git --help'.`,
      {
        command: sub,
        suggestion: (() => {
          for (const known of [...KNOWN, 'init', 'clone']) {
            if (known.startsWith(sub.slice(0, 3))) return known;
          }
          return null;
        })(),
      },
    );
  }
  const { root, repo } = requireRepo(world);
  switch (sub) {
    case 'add':
      add(world, root, repo, rest);
      return;
    case 'commit':
      commit(world, root, repo, rest, out);
      return;
    case 'status':
      status(world, root, repo, out);
      return;
    case 'log':
      log(repo, rest, out);
      return;
    case 'diff':
      diff(world, root, repo, rest, out);
      return;
    case 'restore':
      restore(world, root, repo, rest);
      return;
    case 'branch':
      branch(repo, rest, out);
      return;
    case 'switch':
    case 'checkout': {
      const create = rest.includes('-c') || rest.includes('-b');
      const name = rest.find(arg => !arg.startsWith('-'));
      if (!name)
        throw new ShellError('missingArg', `fatal: missing branch name`, {
          command: `git ${sub}`,
        });
      if (create) {
        createBranch(repo, name);
        repo.head = name;
        out.push(`Switched to a new branch '${name}'`);
        return;
      }
      switchTo(world, root, repo, name, out);
      return;
    }
    case 'merge': {
      const name = rest.find(arg => !arg.startsWith('-'));
      if (!name)
        throw new ShellError(
          'missingArg',
          'fatal: No remote for the current branch.',
          { command: 'git merge' },
        );
      mergeCommits(world, root, repo, repo.branches.get(name), name, out);
      return;
    }
    case 'remote': {
      if (rest[0] === 'add') {
        const [, name, url] = rest;
        if (!name || !url)
          throw new ShellError(
            'missingArg',
            'usage: git remote add <name> <url>',
            { command: 'git remote add' },
          );
        if (repo.remotes.has(name))
          throw new ShellError(
            'remoteExists',
            `error: remote ${name} already exists.`,
            { remote: name },
          );
        server(world, url);
        repo.remotes.set(name, url);
        return;
      }
      [...repo.remotes].forEach(([name, url]) =>
        out.push(
          rest.includes('-v')
            ? `${name}\t${url} (fetch)\n${name}\t${url} (push)`
            : name,
        ),
      );
      return;
    }
    case 'push':
      push(world, repo, rest, out);
      return;
    case 'revert':
      revert(world, root, repo, rest, out);
      return;
    case 'pull':
      pull(world, root, repo, rest, out);
      return;
    case 'rm': {
      const cached = rest.includes('--cached');
      for (const given of rest.filter(arg => !arg.startsWith('-'))) {
        const full = resolve(world, given);
        const path = full.slice(root.length + 1);
        if (!repo.index.has(path))
          throw new ShellError(
            'pathspec',
            `fatal: pathspec '${given}' did not match any files`,
            { path: given },
          );
        repo.index.delete(path);
        if (!cached) removeTree(world, full);
        out.push(`rm '${path}'`);
      }
      return;
    }
    case 'mv': {
      const [from, to] = rest;
      const fromPath = resolve(world, from).slice(root.length + 1);
      if (!repo.index.has(fromPath))
        throw new ShellError(
          'pathspec',
          `fatal: not under version control, source=${from}`,
          { path: from },
        );
      const toFull = resolve(world, to);
      writeFile(
        world,
        toFull,
        world.files.get(`${root}/${fromPath}`).content,
        to,
      );
      world.files.delete(`${root}/${fromPath}`);
      repo.index.set(toFull.slice(root.length + 1), repo.index.get(fromPath));
      repo.index.delete(fromPath);
      return;
    }
    default:
  }
}
