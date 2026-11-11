import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar, som i de andra kurserna.
// Fylls på bana för bana (docs/kurser/data.md).
export const PROJECTS = [];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
