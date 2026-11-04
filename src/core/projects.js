// Projektens steg som vanliga övningar, så att samma editor och rättning
// används. Ett steg utan startkod börjar med förra stegets facit.
// comment gör en rad till en kommentar i kursens språk.
export const projectSteps = (projects, comment) =>
  projects.flatMap(project =>
    project.steps.map((step, index) => ({
      ...step,
      id: `${project.id}-${index + 1}`,
      title: `${project.title}: ${step.title}`,
      track: project.track,
      project: project.id,
      stepNumber: index + 1,
      files: step.files ?? project.files,
      starterCode:
        step.starterCode ??
        `${project.steps[index - 1].solution}\n${comment(`Steg ${index + 1}: ${step.title.toLowerCase()}`)}\n`,
    })),
  );

export function isProjectComplete(project, completedIds) {
  return project.steps.every((_, index) =>
    completedIds.includes(`${project.id}-${index + 1}`),
  );
}

// Ett projekt som byggs klart utan ledtrådar sparas som ett eget id
// bland de klara, så att bonusen följer med som allt annat.
export function noHintsId(project) {
  return `${project.id}-utan-ledtradar`;
}

// Bonusen för att bygga utan ledtrådar: hälften av projektets XP.
export function noHintsBonusXp(project) {
  const xp = project.steps.reduce((sum, step) => sum + step.xp, 0);
  return Math.round(xp / 2);
}
