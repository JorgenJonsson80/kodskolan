import { describe, expect, it } from 'vitest';
import { explainBlocks } from '../../../core/lib/explainBlocks';
import { LESSONS as FASTAPI } from '../../fastapi/data/lessons';
import { LESSONS } from './lessons';

// FastAPI- och AI-kursen har kodblock (```) i förklaringarna. Varje block
// ska bli kod, och inga ``` får bli kvar i texten.
describe('förklaringarna', () => {
  it('har inga kvarglömda ```', () => {
    for (const lesson of [...FASTAPI, ...LESSONS]) {
      for (const block of explainBlocks(lesson.explain ?? '')) {
        const text = block.text ?? block.items?.join('\n') ?? '';
        expect(text.includes('```'), lesson.id).toBe(false);
      }
    }
  });
});
