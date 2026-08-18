-- PAES Trainer 2027 - esquema comercial + gamificacion
-- Ejecuta este archivo completo en Supabase > SQL Editor > New query.

create table if not exists public.user_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9._-]{3,40}$'),
  display_name text not null,
  role text not null default 'student' check (role in ('student','admin')),
  active boolean not null default true,
  access_until timestamptz not null,
  device_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_access enable row level security;
drop policy if exists "users read own access" on public.user_access;
create policy "users read own access"
on public.user_access for select
to authenticated
using (auth.uid() = user_id);
grant select on public.user_access to authenticated;

-- Gamificacion sincronizada: XP, racha, protectores, medallas y actividad semanal.
create table if not exists public.user_gamification (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  last_active_date date,
  freeze_count integer not null default 0 check (freeze_count between 0 and 10),
  badges jsonb not null default '[]'::jsonb,
  weekly jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_gamification enable row level security;
drop policy if exists "users read own gamification" on public.user_gamification;
create policy "users read own gamification"
on public.user_gamification for select
to authenticated
using (auth.uid() = user_id);
drop policy if exists "users insert own gamification" on public.user_gamification;
create policy "users insert own gamification"
on public.user_gamification for insert
to authenticated
with check (auth.uid() = user_id);
drop policy if exists "users update own gamification" on public.user_gamification;
create policy "users update own gamification"
on public.user_gamification for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
grant select, insert, update on public.user_gamification to authenticated;

-- El primer equipo que inicia sesion queda vinculado a la licencia.
create or replace function public.claim_device(p_device_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare r public.user_access;
begin
  select * into r from public.user_access where user_id = auth.uid() for update;
  if r.user_id is null then return jsonb_build_object('ok',false,'reason','no_access'); end if;
  if not r.active or r.access_until <= now() then return jsonb_build_object('ok',false,'reason','inactive'); end if;
  if r.device_id is null then
    update public.user_access set device_id=p_device_id, updated_at=now() where user_id=auth.uid();
    return jsonb_build_object('ok',true,'claimed',true);
  end if;
  if r.device_id = p_device_id then return jsonb_build_object('ok',true,'claimed',false); end if;
  return jsonb_build_object('ok',false,'reason','device_mismatch');
end;
$$;
revoke all on function public.claim_device(text) from public;
grant execute on function public.claim_device(text) to authenticated;

-- IMPORTANTE: despues de crear tu primer usuario administrador en Authentication > Users,
-- ejecuta manualmente, reemplazando UUID_DEL_ADMIN:
-- insert into public.user_access(user_id,username,display_name,role,active,access_until)
-- values ('UUID_DEL_ADMIN','admin','Administrador','admin',true,now()+interval '10 years');
