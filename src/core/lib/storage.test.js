import { beforeEach, describe, expect, it } from 'vitest';
import {
  belongsTo,
  isStringList,
  isStringMap,
  localOwner,
  progressKeys,
  readJson,
  writeJson,
} from './storage';

const store = new Map();
beforeEach(() => {
  store.clear();
  globalThis.localStorage = {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, String(value)),
  };
});

describe('readJson', () => {
  it('läser det som sparats', () => {
    writeJson('a', ['x']);
    expect(readJson('a', [], isStringList)).toEqual(['x']);
  });

  it('tål skräp, fel typ och att nyckeln saknas', () => {
    store.set('trasig', '{inte json');
    store.set('fel', '{"a": 1}');
    expect(readJson('trasig', [], isStringList)).toEqual([]);
    expect(readJson('fel', {}, isStringMap)).toEqual({});
    expect(readJson('saknas', [], isStringList)).toEqual([]);
  });

  it('tål att localStorage kastar fel', () => {
    globalThis.localStorage = {
      getItem: () => {
        throw new Error('blockerad');
      },
      setItem: () => {
        throw new Error('blockerad');
      },
    };
    expect(readJson('a', [], isStringList)).toEqual([]);
    expect(() => writeJson('a', [])).not.toThrow();
  });
});

describe('belongsTo', () => {
  it('framsteg utan ägare hör till den som loggar in', () => {
    expect(belongsTo('x-', 'anna')).toBe(true);
  });

  it('framsteg med en annan ägare hör inte till nästa konto', () => {
    writeJson(progressKeys('x-').owner, 'anna');
    expect(belongsTo('x-', 'anna')).toBe(true);
    expect(belongsTo('x-', 'bo')).toBe(false);
    expect(localOwner('x-')).toBe('anna');
  });
});
