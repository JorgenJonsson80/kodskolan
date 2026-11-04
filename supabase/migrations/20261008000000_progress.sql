-- Elevens framsteg: en rad per användare.
-- completed_ids är id:n på klarade övningar, drafts är kod som inte är klar,
-- med lektionens id som nyckel.
create table public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed_ids text[] not null default '{}',
  drafts jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Varje användare kan bara läsa och ändra sin egen rad.
alter table public.progress enable row level security;

create policy "Läsa sina egna framsteg"
  on public.progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Skapa sina egna framsteg"
  on public.progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Ändra sina egna framsteg"
  on public.progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
