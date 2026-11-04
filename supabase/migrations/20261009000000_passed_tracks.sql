-- Banor man klarat i nivåtestet eller med "Testa dig förbi".
alter table public.progress
  add column passed_track_ids text[] not null default '{}';
