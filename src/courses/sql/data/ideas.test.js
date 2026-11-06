import { describe, expect, it } from 'vitest';
import { nodeRunSql } from '../test/nodeSql';
import { DATABASES, setupFor } from './databases';
import { IDEAS, ideaStarterCode } from './ideas';
import { RESOURCES } from './resources';
import { TRACKS } from './tracks';

describe('idéer och resurser', () => {
  it('varje bana har minst två ämnen med länkar', () => {
    for (const track of TRACKS) {
      expect(RESOURCES[track.id]?.length, track.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('varje bana har tre idéer med en databas', () => {
    for (const track of TRACKS) {
      const ideas = IDEAS.filter(idea => idea.track === track.id);
      expect(ideas, track.id).toHaveLength(3);
      for (const idea of ideas) {
        expect(idea.db in DATABASES || Boolean(idea.setup)).toBe(true);
      }
    }
  });

  it('idéerna har mål, extra och unika id', () => {
    for (const idea of IDEAS) {
      expect(idea.goals.length).toBeGreaterThan(0);
      expect(idea.extra).toBeTruthy();
    }
    expect(new Set(IDEAS.map(idea => idea.id)).size).toBe(IDEAS.length);
  });

  it('startkoden visar målen som kommentarer och går att köra', () => {
    for (const idea of IDEAS) {
      const code = ideaStarterCode(idea);
      expect(code).toMatch(/^-- \S+ /);
      const run = nodeRunSql({ code, setup: setupFor(idea) });
      expect(run.syntaxError ?? run.error).toBeNull();
    }
    const free = nodeRunSql({
      code: ideaStarterCode(null),
      setup: setupFor({ db: 'butik' }),
    });
    expect(free.table.total).toBe(10);
  });
});
