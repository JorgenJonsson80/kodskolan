import { runGit } from './checks';

// Terminalen körs direkt i sidan: den är liten och snabb, så ingen worker
// behövs. Svaret har samma form som de andra kursernas run.
export const TIMEOUT_MS = 3000;

export function runTerminal(job) {
  return new Promise(resolve => {
    setTimeout(() => resolve(runGit(job)), 0);
  });
}
