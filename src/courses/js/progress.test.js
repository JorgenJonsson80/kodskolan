import { describe, expect, it } from 'vitest';
import course from '.';

const { cloud } = course.progress;

// JS Academys tabell har klarade quiz i en egen kolumn och inga
// projektlägen. Kursen gör om dem till <bana>-testad och tillbaka.
describe('JS-kursens framsteg i kontot', () => {
  it('läser klarade quiz som <bana>-testad', () => {
    const saved = cloud.fromRow({
      completed_ids: ['js-log-01'],
      passed_track_ids: ['js-basics'],
      drafts: { 'js-log-01': 'kod' },
    });
    expect(saved.completedIds).toEqual(['js-log-01', 'js-basics-testad']);
    expect(saved.drafts).toEqual({ 'js-log-01': 'kod' });
  });

  it('sparar tillbaka i JS Academys kolumner, utan projektlägen', () => {
    const row = cloud.toRow({
      completedIds: ['js-log-01', 'js-basics-testad'],
      drafts: {},
      projectModes: { 'proj-x': 'hints' },
    });
    expect(row).toEqual({
      completed_ids: ['js-log-01'],
      passed_track_ids: ['js-basics'],
      drafts: {},
    });
  });

  it('klarar ett konto utan sparade framsteg', () => {
    expect(cloud.fromRow(null).completedIds).toEqual([]);
  });
});
