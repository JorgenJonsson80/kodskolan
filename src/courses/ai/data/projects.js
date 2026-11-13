import { projectSteps } from '../../../core/projects';
import { PROJECTS_A } from './projectsA';
import { PROJECTS_B } from './projectsB';

// Projekt som låses upp när en bana är klar, som i de andra kurserna:
// tre per bana med tre steg, där varje steg bygger vidare på förra
// stegets kod (se projectHelper.js). Låtsasmodellens regler följer med
// varje steg som modell.
export const PROJECTS = [...PROJECTS_A, ...PROJECTS_B];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
