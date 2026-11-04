// En fråga att klistra in hos valfri AI när man kört fast. AI:n ombeds
// vara handledare, inte ge lösningen, och bara använda det eleven lärt
// sig hittills – annars försvinner lärandet.

function whatHappened(feedback, explainError) {
  if (!feedback) return 'Jag har inte kört koden än.';
  const lines = [];
  if (feedback.error) {
    lines.push(
      `Felmeddelande:\n${feedback.error.message}\n(Förklaring: ${explainError(feedback.error).replace(/`/g, '')})`,
    );
  }
  const failed = (feedback.results ?? []).filter(result => !result.passed);
  if (failed.length > 0) {
    lines.push(
      'Tester som inte gick igenom:\n' +
        failed
          .map(result =>
            result.text
              ? `- ${result.description} (${result.text})`
              : `- ${result.description}`,
          )
          .join('\n'),
    );
  }
  if (feedback.output?.length > 0) {
    lines.push(`Programmet skrev ut:\n${feedback.output.join('\n')}`);
  }
  if (lines.length === 0 && !feedback.isCorrect) lines.push(feedback.message);
  return lines.length > 0 ? lines.join('\n\n') : 'Koden körde utan fel.';
}

// learnedTracks: namnen på banorna fram till och med den här. course är
// kursen (språkets namn, kodstaketet och felförklaringarna).
export function buildAiPrompt({
  course,
  lesson,
  code,
  feedback,
  learnedTracks,
}) {
  const task = lesson.task.replace(/^Uppgift:\s*/, '').replace(/`/g, '');

  return `Hej! Jag lär mig ${course.texts.learning} och har kört fast på en övning. Jag är nybörjare.

Ge mig INTE hela lösningen – jag vill lära mig själv. Hjälp mig så här:
1. Förklara på enkel svenska vad som är fel eller vad jag missar.
2. Ge en ledtråd, eller ställ en fråga som leder mig rätt.
3. Om jag ber om mer hjälp, ge lite mer i taget.

Jag har bara lärt mig det här än så länge: ${learnedTracks.join(', ')}. Använd inget mer avancerat än så.

Övning: ${lesson.title}
Uppgift:
${task.trim()}

Min kod:
\`\`\`${course.editor.codeFence}
${code.trim()}
\`\`\`

Det här hände när jag körde koden:
${whatHappened(feedback, course.errors.explainError)}`;
}
