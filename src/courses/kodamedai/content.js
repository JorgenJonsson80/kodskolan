// Övningarna och projekten – det enda stället som laddar dem. I bygget med
// betalvägg byts filen ut mot en genererad (scripts/content.mjs): där
// finns betalbanornas övningar bara som skal, och resten hämtas krypterat
// när eleven har tillgång. CONTENT_LOCK säger var den krypterade filen
// ligger (null här, där allt finns med).
export { LESSONS } from './data/lessons';
export { PROJECTS, PROJECT_STEPS } from './data/projects';
export const CONTENT_LOCK = null;
