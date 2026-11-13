// Gemensamt för AI-kursens projekt. Varje steg bygger vidare på förra
// stegets facit: start är koden överst (importer och klient), add det
// steget lägger till och change ändringar i koden som redan finns, som
// [gammalt, nytt]. modell (låtsasmodellens regler) gäller hela projektet,
// om steget inte har egna.
export const M = 'claude-opus-5-5';
export const IMPORT = 'import anthropic\n\nclient = anthropic.Anthropic()\n';

export function project({ start = IMPORT, modell, steps, ...rest }) {
  let previous = start;
  return {
    ...rest,
    steps: steps.map(
      ({ add = '', change = [], modell: own, ...step }, index) => {
        let base = previous;
        for (const [from, to] of change) {
          if (!base.includes(from)) {
            throw new Error(
              `${rest.id} steg ${index + 1}: hittar inte ${from}`,
            );
          }
          base = base.replace(from, to);
        }
        const solution = add ? `${base}\n${add}` : base;
        const starterCode = `${previous}\n# Steg ${index + 1}: ${step.title.toLowerCase()}\n`;
        previous = solution;
        return { ...step, modell: own ?? modell, starterCode, solution };
      },
    ),
  };
}
