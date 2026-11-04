import { describe, expect, it } from 'vitest';
import { createClock, createStorage } from './fakes';

describe('createStorage', () => {
  it('sparar text och räknar skrivningar', () => {
    const storage = createStorage();
    expect(storage.getItem('a')).toBeNull();
    storage.setItem('a', 5);
    expect(storage.getItem('a')).toBe('5');
    expect(storage.writes).toBe(1);
  });
});

describe('createClock', () => {
  it('kör intervall och timeouts när tiden spolas fram', () => {
    const clock = createClock();
    const log = [];
    const id = clock.setInterval(() => log.push('i'), 1000);
    clock.setTimeout(() => log.push('t'), 1500);
    clock.tick(3000);
    expect(log).toEqual(['i', 't', 'i', 'i']);
    expect(clock.active()).toBe(1);
    clock.clearInterval(id);
    expect(clock.active()).toBe(0);
  });
});
