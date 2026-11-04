-- HTML Academys framsteg: en rad per användare. Egen tabell, så att
-- JS Academy, Python Academy och HTML Academy kan dela inloggning men inte skriver över
-- varandras framsteg.
-- completed_ids är id:n på klarade övningar och projektsteg, drafts är kod
-- som inte är klar med övningens id som nyckel, project_modes hur man valt
-- att bygga varje projekt ('hints' eller 'noHints').
create table public.html_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed_ids text[] not null default '{}',
  drafts jsonb not null default '{}',
  project_modes jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Varje användare kan bara läsa och ändra sin egen rad.
alter table public.html_progress enable row level security;

create policy "Läsa sina egna Python-framsteg"
  on public.html_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Skapa sina egna Python-framsteg"
  on public.html_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Ändra sina egna Python-framsteg"
  on public.html_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
