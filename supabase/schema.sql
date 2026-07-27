-- ─────────────────────────────────────────────────────────────
-- Valeloquesale — esquema Fase 1
-- Pegar TODO este bloque en el SQL Editor de Supabase y ejecutar.
-- ─────────────────────────────────────────────────────────────

-- VENDEDORES (tu diferencial: avalar al que cumple)
create table if not exists public.vendedores (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  nombre        text not null,
  ml_seller_id  text,                       -- id del vendedor en Mercado Libre (opcional)
  cumple        boolean not null default true,   -- el sello "Vendedor que cumple"
  reputacion    text,                        -- ej: "MercadoLíder Platinum", "verde"
  nota          text,                        -- tu comentario sobre el vendedor
  created_at    timestamptz not null default now()
);

-- PRODUCTOS (el catálogo curado)
create table if not exists public.productos (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  titulo              text not null,
  descripcion         text,
  categoria           text,
  precio              numeric(12,2),
  moneda              text default 'ARS',
  fotos               jsonb not null default '[]'::jsonb,   -- array de URLs
  link_afiliado       text not null,                        -- tu link de afiliado ML
  comision_estimada   numeric(5,2),                         -- % de comisión estimada
  veredicto           text not null default 'gold' check (veredicto in ('gold','trash')),
  texto_recomendacion text,                                 -- veredicto redactado (Claude)
  vendedor_id         uuid references public.vendedores(id) on delete set null,
  estado              text not null default 'borrador' check (estado in ('borrador','publicado')),
  destacado           boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- CLICKS (tracking propio del redirect /go/[id])
create table if not exists public.clicks (
  id           bigint generated always as identity primary key,
  producto_id  uuid references public.productos(id) on delete cascade,
  created_at   timestamptz not null default now(),
  referrer     text,
  user_agent   text
);

-- SUGERENCIAS (los usuarios proponen productos para que probemos)
create table if not exists public.sugerencias (
  id          bigint generated always as identity primary key,
  texto       text not null,          -- link de ML o nombre del producto
  comentario  text,                   -- por qué lo quiere ver probado
  contacto    text,                   -- email/usuario opcional para avisarle
  estado      text not null default 'nueva' check (estado in ('nueva','en_prueba','publicada','descartada')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_productos_estado    on public.productos (estado);
create index if not exists idx_productos_categoria on public.productos (categoria);
create index if not exists idx_productos_vendedor  on public.productos (vendedor_id);
create index if not exists idx_clicks_producto     on public.clicks (producto_id);
create index if not exists idx_sugerencias_estado  on public.sugerencias (estado);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.vendedores  enable row level security;
alter table public.productos   enable row level security;
alter table public.clicks      enable row level security;
alter table public.sugerencias enable row level security;

-- Lectura pública: solo productos publicados
drop policy if exists "productos_select_publicos" on public.productos;
create policy "productos_select_publicos" on public.productos
  for select to anon, authenticated
  using (estado = 'publicado');

-- Lectura pública de vendedores (info no sensible)
drop policy if exists "vendedores_select_all" on public.vendedores;
create policy "vendedores_select_all" on public.vendedores
  for select to anon, authenticated
  using (true);

-- clicks y sugerencias: sin políticas anon → solo el service role (server) escribe/lee.
-- (el redirect /go y el form /sugerir usan la service key vía /api, que saltea RLS)
