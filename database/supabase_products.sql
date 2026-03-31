create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  type text not null,
  capacity_oz numeric(6,2) not null,
  price integer not null,
  min_qty integer not null default 1,
  production_time text not null,
  description text not null,
  image_url text,
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 100,
  updated_at timestamptz not null default now()
);

create index if not exists products_active_sort_idx
  on public.products (active, sort_order, updated_at desc);
