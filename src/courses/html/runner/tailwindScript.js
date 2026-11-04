// Raden som laddar Tailwind på riktiga sajter. Eleven skriver den, men
// skriptet körs aldrig: tailwind.js gör CSS:en här i appen i stället, så
// att inget skript behöver köras i rättningen och allt fungerar utan nät.
export const TAILWIND_SCRIPT =
  /<script\b[^>]*\bsrc\s*=\s*["'][^"']*@tailwindcss\/browser[^"']*["'][^>]*>\s*<\/script>/i;

export const usesTailwind = code => TAILWIND_SCRIPT.test(code);
