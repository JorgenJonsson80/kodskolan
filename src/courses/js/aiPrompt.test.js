import { describe, expect, it } from 'vitest';
import { buildAiPrompt as build } from '../../core/lib/aiPrompt';
import course from '.';

// AI-frågan i kärnan, med JS-kursens språk, kodblock och felförklaringar.
const buildAiPrompt = options => build({ course, ...options });

const lesson = {
  title: 'Hej världen!',
  task: 'Uppgift: Skriv ut texten "Hej världen!" med `console.log`.',
};

describe('buildAiPrompt', () => {
  it('ber AI:n att inte ge lösningen och håller sig till det eleven kan', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: "console.log('fel')",
      feedback: null,
      learnedTracks: ['Grunderna i JavaScript'],
    });
    expect(prompt).toContain('Ge mig INTE hela lösningen');
    expect(prompt).toContain(
      'lärt mig det här än så länge: Grunderna i JavaScript',
    );
    expect(prompt).toContain('Skriv ut texten "Hej världen!" med console.log.');
    expect(prompt).toContain("```js\nconsole.log('fel')\n```");
    expect(prompt).toContain('Jag har inte kört koden än.');
  });

  it('tar med fel, tester och konsol från senaste körningen', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: "console.log('fel')",
      feedback: {
        error: null,
        output: ['fel'],
        results: [
          {
            description: 'Konsolen visar "Hej världen!"',
            passed: false,
            text: 'konsolen visade fel men skulle visa Hej världen!',
          },
          { description: 'Något annat', passed: true },
        ],
      },
      learnedTracks: ['Grunderna i JavaScript'],
    });
    expect(prompt).toContain(
      '- Konsolen visar "Hej världen!" (konsolen visade fel men skulle visa Hej världen!)',
    );
    expect(prompt).not.toContain('Något annat');
    expect(prompt).toContain('Programmet skrev ut:\nfel');
  });

  it('säger React när eleven kommit dit', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: 'function App() {}',
      feedback: null,
      learnedTracks: ['Grunderna i JavaScript', 'React: JSX'],
    });
    expect(prompt).toContain('Jag lär mig JavaScript och React');
    expect(prompt).toContain('```jsx');
  });
});
