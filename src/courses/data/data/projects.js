import { projectSteps } from '../../../core/projects';
import { PROJECTS_A } from './projectsA';
import { PROJECTS_B } from './projectsB';
import { PROJECTS_C } from './projectsC';

// Projekt som låses upp när en bana är klar, som i de andra kurserna:
// tre per bana med tre steg, där varje steg bygger vidare på förra
// stegets kod. Facit följer samma regler som övningarna (test/concepts.js).
export const PROJECTS = [...PROJECTS_A, ...PROJECTS_B, ...PROJECTS_C];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
