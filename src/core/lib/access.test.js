import { describe, expect, it } from 'vitest';
import { accessSummary, hasAccess, isPaidTrack } from './access';

const NOW = new Date('2026-11-10T12:00:00Z');
const LATER = '2026-12-10T12:00:00Z';
const EARLIER = '2026-11-01T12:00:00Z';

describe('hasAccess', () => {
  it('gäller kursen eller alla kurser, tills sista dagen', () => {
    expect(
      hasAccess([{ course_id: '*', valid_until: LATER }], 'sql', NOW),
    ).toBe(true);
    expect(
      hasAccess([{ course_id: 'python', valid_until: null }], 'sql', NOW),
    ).toBe(false);
    expect(
      hasAccess([{ course_id: 'sql', valid_until: EARLIER }], 'sql', NOW),
    ).toBe(false);
    expect(hasAccess([], 'sql', NOW)).toBe(false);
  });
});

describe('isPaidTrack', () => {
  const base = { access: [], courseId: 'sql', paywall: true };

  it('låser banorna efter gratisbanorna', () => {
    expect(isPaidTrack(1, base)).toBe(false);
    expect(isPaidTrack(2, base)).toBe(true);
    expect(isPaidTrack(2, { ...base, freeTracks: 3 })).toBe(false);
  });

  it('låser inget med tillgång eller när låsningen är av', () => {
    expect(
      isPaidTrack(5, {
        ...base,
        access: [{ course_id: '*', valid_until: null }],
      }),
    ).toBe(false);
    expect(isPaidTrack(5, { ...base, paywall: false })).toBe(false);
  });
});

describe('accessSummary', () => {
  it('visar den tillgång som räcker längst per kurs', () => {
    expect(
      accessSummary([
        { course_id: '*', valid_until: EARLIER },
        { course_id: '*', valid_until: LATER },
        { course_id: 'python', valid_until: null },
        { course_id: 'python', valid_until: LATER },
      ]),
    ).toEqual([
      { courseId: '*', until: new Date(LATER) },
      { courseId: 'python', until: null },
    ]);
  });
});
