-- Felrapporter från övningarna: "Något är fel i den här övningen". Vem som
-- helst får skicka, även utan konto. Ingen kan läsa andras rapporter;
-- de läses i Supabase. En inloggad ser sina egna (till nedladdningen av
-- sin data), och de raderas med kontot.
create table if not exists public.lesson_feedback (
  id bigint generated always as identity primary key,
  course_id text not null check (char_length(course_id) between 1 and 40),
  lesson_id text not null check (char_length(lesson_id) between 1 and 80),
  kind text not null check (kind in ('fel', 'facit', 'oklar', 'annat')),
  message text not null check (char_length(btrim(message)) between 1 and 2000),
  code text check (char_length(code) <= 20000),
  user_id uuid default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.lesson_feedback enable row level security;

-- Skicka: bara som sig själv, eller utan konto.
drop policy if exists "Skicka felrapport" on public.lesson_feedback;
create policy "Skicka felrapport"
  on public.lesson_feedback for insert
  to anon, authenticated
  with check (user_id is not distinct from (select auth.uid()));

drop policy if exists "Läsa sina egna felrapporter" on public.lesson_feedback;
create policy "Läsa sina egna felrapporter"
  on public.lesson_feedback for select
  to authenticated
  using ((select auth.uid()) = user_id);

grant insert on public.lesson_feedback to anon, authenticated;
