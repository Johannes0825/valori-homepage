-- Valori timeregistrering – kjør hele filen i Supabase SQL Editor.
-- Idempotent: trygt å kjøre flere ganger.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- Profiler (én per bruker i auth.users)
-- ---------------------------------------------------------------
create table if not exists public.profiles (
    id         uuid primary key references auth.users (id) on delete cascade,
    navn       text not null,
    epost      text not null,
    created_at timestamptz not null default now()
);

-- Opprett profil automatisk når en bruker inviteres/opprettes.
-- Navn: metadata "navn" hvis satt, ellers e-postens lokaldel med stor forbokstav
-- (hanne@valori.no -> Hanne).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    v_navn text;
begin
    v_navn := coalesce(
        nullif(new.raw_user_meta_data ->> 'navn', ''),
        initcap(split_part(new.email, '@', 1))
    );
    insert into public.profiles (id, navn, epost)
    values (new.id, v_navn, new.email)
    on conflict (id) do update set epost = excluded.epost;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- Hold navn i sync hvis det oppdateres via auth.updateUser({ data: { navn } })
create or replace function public.handle_user_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    if nullif(new.raw_user_meta_data ->> 'navn', '') is not null then
        update public.profiles
           set navn = new.raw_user_meta_data ->> 'navn',
               epost = new.email
         where id = new.id;
    end if;
    return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
    after update on auth.users
    for each row execute function public.handle_user_updated();

-- Backfill for brukere som allerede finnes
insert into public.profiles (id, navn, epost)
select id,
       coalesce(nullif(raw_user_meta_data ->> 'navn', ''), initcap(split_part(email, '@', 1))),
       email
from auth.users
on conflict (id) do nothing;

-- ---------------------------------------------------------------
-- Prosjekter
-- ---------------------------------------------------------------
create table if not exists public.projects (
    id         uuid primary key default gen_random_uuid(),
    navn       text not null,
    kunde      text not null,
    timepris   numeric(10, 2) not null default 0,
    ramme      numeric(10, 2) not null default 0,
    aktiv      boolean not null default true,
    farge      text not null default '#2E4ACA',
    created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Timeføringer
-- ---------------------------------------------------------------
create table if not exists public.time_entries (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references public.profiles (id) on delete cascade,
    project_id  uuid not null references public.projects (id) on delete restrict,
    dato        date not null,
    timer       numeric(6, 2) not null check (timer > 0),
    reise       numeric(6, 2) not null default 0 check (reise >= 0),
    beskrivelse text not null default '',
    fakturerbar boolean not null default true,
    created_at  timestamptz not null default now()
);

create index if not exists time_entries_dato_idx    on public.time_entries (dato desc);
create index if not exists time_entries_user_idx    on public.time_entries (user_id);
create index if not exists time_entries_project_idx on public.time_entries (project_id);

-- ---------------------------------------------------------------
-- Row Level Security
--   Alle innloggede ser alt (3 kolleger).
--   Føringer kan bare opprettes/endres/slettes av eieren.
-- ---------------------------------------------------------------
alter table public.profiles     enable row level security;
alter table public.projects     enable row level security;
alter table public.time_entries enable row level security;

drop policy if exists "profiles: les alle"        on public.profiles;
drop policy if exists "profiles: oppdater egen"   on public.profiles;
drop policy if exists "projects: les alle"        on public.projects;
drop policy if exists "projects: opprett"         on public.projects;
drop policy if exists "projects: oppdater"        on public.projects;
drop policy if exists "entries: les alle"         on public.time_entries;
drop policy if exists "entries: opprett egne"     on public.time_entries;
drop policy if exists "entries: oppdater egne"    on public.time_entries;
drop policy if exists "entries: slett egne"       on public.time_entries;

create policy "profiles: les alle"
    on public.profiles for select to authenticated using (true);
create policy "profiles: oppdater egen"
    on public.profiles for update to authenticated
    using (id = auth.uid()) with check (id = auth.uid());

create policy "projects: les alle"
    on public.projects for select to authenticated using (true);
create policy "projects: opprett"
    on public.projects for insert to authenticated with check (true);
create policy "projects: oppdater"
    on public.projects for update to authenticated using (true) with check (true);

create policy "entries: les alle"
    on public.time_entries for select to authenticated using (true);
create policy "entries: opprett egne"
    on public.time_entries for insert to authenticated
    with check (user_id = auth.uid());
create policy "entries: oppdater egne"
    on public.time_entries for update to authenticated
    using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "entries: slett egne"
    on public.time_entries for delete to authenticated
    using (user_id = auth.uid());
