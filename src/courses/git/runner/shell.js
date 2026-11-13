// En låtsasterminal med ett filsystem i minnet och en förenklad Git
// (git.js). Allt är förutsägbart: ingen slump och ingen klocka, så att
// samma kommandon alltid ger samma utskrift och samma commit-id.
// docs/kurser/git.md beskriver vad som finns.
import { gitCommand } from './git';

export const HOME = '/hem';

// Ett fel som stoppar körningen. kind används av friendlyErrors.js för att
// förklara felet på svenska.
export class ShellError extends Error {
  constructor(kind, message, details = {}) {
    super(message);
    this.kind = kind;
    this.details = details;
  }
}

export function createWorld() {
  return {
    files: new Map([
      ['/', { type: 'dir' }],
      [HOME, { type: 'dir' }],
    ]),
    cwd: HOME,
    repos: new Map(), // reporot -> git-läget
    servers: new Map(), // https://github.com/... -> serverns läge
    clock: 0, // minuter sedan 2026-01-05 09:00, en per commit
  };
}

// --- Sökvägar ---

export function resolve(world, path = '.') {
  const start = path.startsWith('/')
    ? ''
    : path.startsWith('~')
      ? HOME
      : world.cwd;
  const rest = path.startsWith('~') ? path.slice(1) : path;
  const parts = [];
  for (const part of `${start}/${rest}`.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  return `/${parts.join('/')}`;
}

export const parentOf = path =>
  path === '/' ? '/' : path.slice(0, path.lastIndexOf('/')) || '/';
export const nameOf = path => path.slice(path.lastIndexOf('/') + 1);

export const childrenOf = (world, dir) =>
  [...world.files.keys()]
    .filter(path => path !== dir && parentOf(path) === dir)
    .sort();

// Alla filer under en mapp, med sökvägar relativa till mappen.
export function filesUnder(world, dir) {
  const prefix = dir === '/' ? '/' : `${dir}/`;
  const found = new Map();
  for (const [path, entry] of world.files) {
    if (entry.type === 'file' && path.startsWith(prefix)) {
      found.set(path.slice(prefix.length), entry.content);
    }
  }
  return found;
}

function requireDir(world, path, shown) {
  const entry = world.files.get(path);
  if (!entry)
    throw new ShellError('notFound', `${shown}: No such file or directory`, {
      path: shown,
    });
  if (entry.type !== 'dir')
    throw new ShellError('notDir', `${shown}: Not a directory`, {
      path: shown,
    });
}

export function writeFile(world, path, content, shown = path) {
  const parent = parentOf(path);
  if (!world.files.has(parent)) {
    throw new ShellError('notFound', `${shown}: No such file or directory`, {
      path: shown,
    });
  }
  if (world.files.get(path)?.type === 'dir') {
    throw new ShellError('isDir', `${shown}: Is a directory`, { path: shown });
  }
  world.files.set(path, { type: 'file', content });
}

export function removeTree(world, path) {
  const prefix = `${path}/`;
  for (const key of [...world.files.keys()]) {
    if (key === path || key.startsWith(prefix)) world.files.delete(key);
  }
}

function copyTree(world, from, to) {
  const prefix = `${from}/`;
  for (const [key, entry] of [...world.files]) {
    if (key === from || key.startsWith(prefix)) {
      world.files.set(to + key.slice(from.length), { ...entry });
    }
  }
}

// --- Att läsa en kommandorad ---

// Delar upp en rad i ord. Citattecken håller ihop text med mellanslag, och
// > och >> blir egna ord.
export function tokenize(line) {
  const words = [];
  let word = null;
  let quote = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === quote) quote = null;
      else word += char;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      word ??= '';
      continue;
    }
    if (char === '>') {
      if (word !== null) words.push(word);
      word = null;
      if (line[i + 1] === '>') {
        words.push('>>');
        i += 1;
      } else words.push('>');
      continue;
    }
    if (/\s/.test(char)) {
      if (word !== null) words.push(word);
      word = null;
      continue;
    }
    word = (word ?? '') + char;
  }
  if (quote) throw new ShellError('quote', 'Ett citattecken är inte stängt');
  if (word !== null) words.push(word);
  return words;
}

const COMMANDS = [
  'pwd',
  'ls',
  'cd',
  'mkdir',
  'touch',
  'cat',
  'echo',
  'cp',
  'mv',
  'rm',
  'clear',
  'git',
];

// Det närmaste kommandot, för "menade du …?".
export function closest(word, candidates) {
  const distance = (a, b) => {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const saved = row[j];
        row[j] = Math.min(
          row[j] + 1,
          row[j - 1] + 1,
          previous + (a[i - 1] === b[j - 1] ? 0 : 1),
        );
        previous = saved;
      }
    }
    return row[b.length];
  };
  const best = candidates
    .map(candidate => [candidate, distance(word, candidate)])
    .sort((a, b) => a[1] - b[1])[0];
  return best && best[1] <= 2 ? best[0] : null;
}

// --- Kommandona ---

function flagsAndArgs(args) {
  const flags = new Set();
  const rest = [];
  for (const arg of args) {
    if (/^-[a-zA-Z]+$/.test(arg)) [...arg.slice(1)].forEach(f => flags.add(f));
    else rest.push(arg);
  }
  return { flags, rest };
}

function runCommand(world, words, out) {
  const [command, ...args] = words;
  // > och >> skickar utskriften till en fil i stället.
  const redirect = args.findIndex(word => word === '>' || word === '>>');
  if (redirect !== -1) {
    const target = args[redirect + 1];
    if (!target)
      throw new ShellError('redirect', 'Efter > ska det stå ett filnamn');
    const captured = [];
    runCommand(world, [command, ...args.slice(0, redirect)], captured);
    const path = resolve(world, target);
    const before =
      args[redirect] === '>>' ? (world.files.get(path)?.content ?? '') : '';
    const text = captured.length > 0 ? `${captured.join('\n')}\n` : '';
    writeFile(world, path, before + text, target);
    return;
  }

  const { flags, rest } = flagsAndArgs(args);
  switch (command) {
    case 'pwd':
      out.push(world.cwd);
      return;
    case 'echo':
      out.push(args.join(' '));
      return;
    case 'clear':
      out.length = 0;
      return;
    case 'cd': {
      const target = resolve(world, rest[0] ?? '~');
      requireDir(world, target, rest[0] ?? '~');
      world.cwd = target;
      return;
    }
    case 'ls': {
      const target = resolve(world, rest[0] ?? '.');
      const entry = world.files.get(target);
      if (!entry)
        throw new ShellError(
          'notFound',
          `ls: ${rest[0]}: No such file or directory`,
          { path: rest[0] },
        );
      if (entry.type === 'file') {
        out.push(rest[0]);
        return;
      }
      const names = childrenOf(world, target)
        .map(nameOf)
        .filter(name => flags.has('a') || !name.startsWith('.'));
      const shown = flags.has('a') ? ['.', '..', ...names] : names;
      if (shown.length > 0) out.push(shown.join('  '));
      return;
    }
    case 'mkdir': {
      if (rest.length === 0)
        throw new ShellError('missingArg', 'mkdir: missing operand', {
          command,
        });
      for (const name of rest) {
        const path = resolve(world, name);
        if (world.files.has(path)) {
          if (flags.has('p')) continue;
          throw new ShellError('exists', `mkdir: ${name}: File exists`, {
            path: name,
          });
        }
        if (flags.has('p')) {
          const parts = path.split('/').filter(Boolean);
          let current = '';
          for (const part of parts) {
            current += `/${part}`;
            if (!world.files.has(current))
              world.files.set(current, { type: 'dir' });
          }
        } else {
          requireDir(
            world,
            parentOf(path),
            parentOf(name) === '/' ? name : name,
          );
          world.files.set(path, { type: 'dir' });
        }
      }
      return;
    }
    case 'touch': {
      if (rest.length === 0)
        throw new ShellError('missingArg', 'touch: missing file operand', {
          command,
        });
      for (const name of rest) {
        const path = resolve(world, name);
        if (!world.files.has(path)) writeFile(world, path, '', name);
      }
      return;
    }
    case 'cat': {
      if (rest.length === 0)
        throw new ShellError('missingArg', 'cat: missing file operand', {
          command,
        });
      for (const name of rest) {
        const entry = world.files.get(resolve(world, name));
        if (!entry)
          throw new ShellError(
            'notFound',
            `cat: ${name}: No such file or directory`,
            { path: name },
          );
        if (entry.type === 'dir')
          throw new ShellError('isDir', `cat: ${name}: Is a directory`, {
            path: name,
          });
        if (entry.content) out.push(entry.content.replace(/\n$/, ''));
      }
      return;
    }
    case 'rm': {
      if (rest.length === 0)
        throw new ShellError('missingArg', 'rm: missing operand', { command });
      for (const name of rest) {
        const path = resolve(world, name);
        const entry = world.files.get(path);
        if (!entry) {
          if (flags.has('f')) continue;
          throw new ShellError(
            'notFound',
            `rm: ${name}: No such file or directory`,
            { path: name },
          );
        }
        if (entry.type === 'dir' && !flags.has('r')) {
          throw new ShellError('rmDir', `rm: ${name}: is a directory`, {
            path: name,
          });
        }
        if (path === world.cwd || world.cwd.startsWith(`${path}/`)) {
          throw new ShellError('rmCwd', `rm: ${name}: you are inside it`, {
            path: name,
          });
        }
        removeTree(world, path);
        world.repos.delete(path);
      }
      return;
    }
    case 'cp':
    case 'mv': {
      if (rest.length < 2)
        throw new ShellError(
          'missingArg',
          `${command}: missing destination file operand`,
          { command },
        );
      const [from, to] = rest;
      const source = resolve(world, from);
      const entry = world.files.get(source);
      if (!entry)
        throw new ShellError(
          'notFound',
          `${command}: ${from}: No such file or directory`,
          { path: from },
        );
      if (entry.type === 'dir' && command === 'cp' && !flags.has('r')) {
        throw new ShellError(
          'cpDir',
          `cp: ${from} is a directory (not copied)`,
          { path: from },
        );
      }
      let target = resolve(world, to);
      if (world.files.get(target)?.type === 'dir')
        target = `${target}/${nameOf(source)}`;
      requireDir(world, parentOf(target), to);
      copyTree(world, source, target);
      if (command === 'mv') removeTree(world, source);
      return;
    }
    case 'git':
      gitCommand(world, args, out);
      return;
    default: {
      const suggestion = closest(command, COMMANDS);
      throw new ShellError('unknownCommand', `${command}: command not found`, {
        command,
        suggestion,
      });
    }
  }
}

// Kör en rad. Tomma rader och # kommentarer hoppas över.
export function runLine(world, line, out) {
  const trimmed = line.trim();
  if (trimmed === '' || trimmed.startsWith('#')) return false;
  runCommand(world, tokenize(trimmed), out);
  return true;
}

// Kör flera rader och samlar utskriften som i en terminal: "$ kommando"
// följt av det kommandot skrev. Stoppar vid första fel.
export function runScript(world, code, { echo = true } = {}) {
  const transcript = [];
  const lines = code.split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const out = [];
    try {
      const ran = runLine(world, line, out);
      if (ran && echo) transcript.push(`$ ${line.trim()}`);
      if (line.trim() === 'clear') transcript.length = 0;
      transcript.push(...out.flatMap(text => text.split('\n')));
    } catch (error) {
      if (!(error instanceof ShellError)) throw error;
      if (echo) transcript.push(`$ ${line.trim()}`);
      transcript.push(...error.message.split('\n'));
      return {
        transcript,
        error: {
          ...error.details,
          kind: error.kind,
          message: error.message,
          line: index + 1,
        },
      };
    }
  }
  return { transcript, error: null };
}
