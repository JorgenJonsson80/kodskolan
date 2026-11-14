import { useEffect, useMemo, useState } from 'react';
import { hasAccess } from './access';
import { decodeContent, mergeById } from './contentCodec';
import { supabase } from './supabase';

// Betalbanornas innehåll, för den som har tillgång. I bygget med betalvägg
// är övningarna där bara skal (scripts/content.mjs), och resten ligger
// krypterat i course.content.lock.url. Nyckeln lämnas bara ut av
// databasen (content_key) till den som har tillgång till kursen.
const cache = new Map();

const fromHex = hex =>
  new Uint8Array(hex.match(/../g).map(pair => parseInt(pair, 16)));

async function download(lock) {
  const { data: keyHex, error } = await supabase.rpc('content_key', {
    p_course: lock.courseId,
  });
  if (error) throw error;
  const response = await fetch(lock.url);
  if (!response.ok)
    throw new Error(`Kunde inte hämta kursen (${response.status})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  const key = await crypto.subtle.importKey(
    'raw',
    fromHex(keyHex),
    'AES-GCM',
    false,
    ['decrypt'],
  );
  const zipped = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: bytes.slice(0, 12) },
    key,
    bytes.slice(12),
  );
  const text = await new Response(
    new Blob([zipped]).stream().pipeThrough(new DecompressionStream('gzip')),
  ).text();
  return decodeContent(JSON.parse(text));
}

// Samma kurs hämtas bara en gång per besök. Ett fel sparas inte, så att
// "Försök igen" hämtar på nytt.
function fullContent(lock) {
  if (!cache.has(lock.url)) {
    const promise = download(lock);
    cache.set(lock.url, promise);
    promise.catch(() => cache.delete(lock.url));
  }
  return cache.get(lock.url);
}

// status: 'open' (allt finns redan), 'waiting' (tillgången hämtas),
// 'locked' (ingen tillgång – betalbanorna visar låset), 'loading',
// 'ready' eller 'error'.
export function useCourseContent(course, access) {
  const lock = course.content.lock;
  const allowed =
    Boolean(lock) && access !== null && hasAccess(access, course.id);
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState({ key: null, full: null, error: null });
  const key = allowed ? `${lock.url}-${attempt}` : null;

  useEffect(() => {
    if (!key) return;
    let ignore = false;
    fullContent(lock).then(
      full => !ignore && setLoaded({ key, full, error: null }),
      error => !ignore && setLoaded({ key, full: null, error }),
    );
    return () => {
      ignore = true;
    };
  }, [key, lock]);

  const full = loaded.key === key ? loaded.full : null;
  const merged = useMemo(() => {
    if (!full) return course;
    const { content } = course;
    return {
      ...course,
      content: {
        ...content,
        lessons: mergeById(content.lessons, full.lessons),
        projects: mergeById(content.projects, full.projects),
        projectSteps: mergeById(content.projectSteps, full.projectSteps),
      },
    };
  }, [course, full]);

  let status = 'open';
  if (lock) {
    if (access === null) status = 'waiting';
    else if (!allowed) status = 'locked';
    else if (full) status = 'ready';
    else if (loaded.key === key && loaded.error) status = 'error';
    else status = 'loading';
  }
  return {
    course: merged,
    status,
    retry: () => setAttempt(count => count + 1),
  };
}
