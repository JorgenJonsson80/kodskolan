// Övningens regler för låtsasmodellen (modell) skickas som en fil, så att
// harness-filen kan läsa dem vid varje anrop. Samma i webbläsaren och i
// testerna i Node.
export const MODEL_FILE = '.modell.json';

export function withModel({ modell, files, ...job }) {
  return {
    ...job,
    files: { ...files, [MODEL_FILE]: JSON.stringify(modell ?? []) },
  };
}
