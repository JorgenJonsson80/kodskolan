// Slår ihop framstegen i webbläsaren med de som sparats i kontot, så att
// inget försvinner när man loggar in första gången.

// En övning som är klar på något av ställena räknas som klar.
export function mergeCompleted(local, remote) {
  return [...new Set([...(remote ?? []), ...local])];
}

// Kod som skrivits i webbläsaren vinner över sparad kod för samma övning.
export function mergeDrafts(local, remote) {
  const saved =
    remote && typeof remote === 'object' && !Array.isArray(remote)
      ? remote
      : {};
  return { ...saved, ...local };
}
