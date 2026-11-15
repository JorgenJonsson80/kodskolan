import { supabase } from '../../core/lib/supabase';

// AI-delen av Byggstudion (supabase/functions/app-builder): bygger en ny
// app från en beskrivning, eller ändrar en app med egna ord. Ger
// { html, summary, remaining } eller kastar ett fel med en text att visa.
export async function askBuilder({ mode, request, html }) {
  const { data, error } = await supabase.functions.invoke('app-builder', {
    body: { mode, request, html },
  });
  if (error) {
    let message = 'AI:n svarar inte just nu. Försök igen om en stund.';
    try {
      message = (await error.context.json()).error ?? message;
    } catch {
      // Inget svar att läsa – den allmänna texten får duga.
    }
    throw new Error(message);
  }
  if (!data?.html) throw new Error('AI:n gav ingen app tillbaka. Försök igen.');
  return data;
}

export const EXAMPLES = [
  'En lista över böckerna jag läst, med betyg från 1 till 5',
  'Ett veckoschema för middagar, med en inköpslista',
  'En fikakassa där jag skriver in vem som betalat',
  'Ett quiz med tio frågor om Sveriges huvudstäder',
];
