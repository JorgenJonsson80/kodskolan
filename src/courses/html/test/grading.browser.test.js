import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { runPage } from '../runner/page';
import { LESSONS } from '../data/lessons';
import { PROJECT_STEPS } from '../data/projects';

const check = async (item, code) =>
  evaluate(item, code, await runPage({ code, tests: item.tests }));

// Samma rättning som eleven får, i riktig Chrome: för alla övningar och
// projektsteg, inte bara de som mäter layout.
describe.each([...LESSONS, ...PROJECT_STEPS].map(item => [item.id, item]))(
  '%s i Chrome',
  (_, item) => {
    it('facit klarar sina tester utan varningar', async () => {
      const result = await check(item, item.solution);
      expect(result.results.filter(entry => !entry.passed)).toEqual([]);
      expect(result.warnings).toEqual([]);
      expect(result.isCorrect).toBe(true);
    });

    it('startkoden underkänns', async () => {
      expect((await check(item, item.starterCode)).isCorrect).toBe(false);
    });
  },
);
