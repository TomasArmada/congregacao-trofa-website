-- Perfis e permissões do sistema. Execute esta migração no SQL Editor do Supabase.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  -- O perfil só é criado depois de a pessoa concluir o primeiro acesso.
  approved boolean not null default true,
  can_access_meetings boolean not null default false,
  can_access_ministry boolean not null default false,
  can_access_assignments boolean not null default false,
  can_access_territories boolean not null default false,
  can_access_reports boolean not null default false,
  can_access_communication boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated using ((select auth.uid()) = id);

create policy "Users can create their own initial profile"
  on public.profiles for insert to authenticated with check (
    (select auth.uid()) = id
    and approved = true
    and can_access_meetings = false
    and can_access_ministry = false
    and can_access_assignments = false
    and can_access_territories = false
    and can_access_reports = false
    and can_access_communication = false
  );

-- Atualizações de aprovação e permissões devem ser feitas por uma conta de serviço
-- ou pelo painel administrativo, nunca diretamente a partir deste cliente público.
