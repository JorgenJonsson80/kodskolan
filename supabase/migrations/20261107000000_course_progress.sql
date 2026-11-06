-- Kodskolans framsteg: en rad per användare och kurs, så att ett konto
-- räcker till alla kurser och en ny kurs inte behöver en ny tabell.
-- course_id är kursens id i appen ('python', 'html', 'js' …).
-- completed_ids är id:n på klarade övningar, projektsteg och banor man
-- testat sig förbi (<bana>-testad), drafts kod som inte är klar med
-- övningens id som nyckel, project_modes hur man valt att bygga varje
-- projekt ('hints' eller 'noHints').
create table if not exists public.course_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  completed_ids text[] not null default '{}',
  drafts jsonb not null default '{}',
  project_modes jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

-- Varje användare kan bara läsa och ändra sina egna rader.
alter table public.course_progress enable row level security;

drop policy if exists "Läsa sina egna kursframsteg" on public.course_progress;
create policy "Läsa sina egna kursframsteg"
  on public.course_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Skapa sina egna kursframsteg" on public.course_progress;
create policy "Skapa sina egna kursframsteg"
  on public.course_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Ändra sina egna kursframsteg" on public.course_progress;
create policy "Ändra sina egna kursframsteg"
  on public.course_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Flytta över framstegen från akademiernas egna tabeller. De gamla
-- tabellerna ligger kvar orörda. Går att köra flera gånger: klara id:n
-- slås ihop, och utkast som redan finns här vinner.
insert into public.course_progress
  (user_id, course_id, completed_ids, drafts, project_modes, updated_at)
select user_id, 'python', completed_ids, drafts, project_modes, updated_at
from public.py_progress
union all
select user_id, 'html', completed_ids, drafts, project_modes, updated_at
from public.html_progress
union all
-- JS Academy sparade klarade quiz i en egen kolumn och hade inga
-- projektlägen.
select
  user_id,
  'js',
  completed_ids
    || array(select track_id || '-testad' from unnest(passed_track_ids) as track_id),
  drafts,
  '{}',
  updated_at
from public.progress
on conflict (user_id, course_id) do update set
  completed_ids = array(
    select distinct unnest(course_progress.completed_ids || excluded.completed_ids)
  ),
  drafts = excluded.drafts || course_progress.drafts,
  project_modes = excluded.project_modes || course_progress.project_modes;
