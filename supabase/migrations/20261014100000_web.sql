-- Contenido que La Serena gestiona desde /admin: novedades (carteles de cursos, avisos), galería de fotos
-- y vehículos de prácticas. La web (rol anon) solo lee lo publicado; el panel entra con la cuenta de la
-- autoescuela (rol authenticated). Registro público desactivado en Authentication → Sign In / Providers.
-- Las categorías y etiquetas tienen su lista también en web/src/lib/contenido.js: si cambia una, cambiar las dos.

create table public.novedades (
  id uuid primary key default gen_random_uuid(),
  titulo text not null check (length(trim(titulo)) > 0),
  texto text,
  etiqueta text not null default 'curso' check (etiqueta in ('curso', 'intensivo', 'oferta', 'aviso')),
  -- Ruta en el bucket `web` (null = novedad sin cartel). La miniatura es la misma ruta acabada en `_m.jpg`.
  imagen text,
  ancho integer check (ancho > 0),
  alto integer check (alto > 0),
  -- Cuándo empieza el curso (opcional) y hasta cuándo se enseña (opcional: pasado ese día deja de salir)
  fecha date,
  caduca date,
  centro text check (centro in ('villanueva', 'don-benito', 'navalvillar')), -- null = todos
  publicada boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.fotos (
  id uuid primary key default gen_random_uuid(),
  imagen text not null unique,
  ancho integer not null check (ancho > 0),
  alto integer not null check (alto > 0),
  categoria text not null
    check (categoria in ('instalaciones', 'coche', 'moto', 'camion', 'autobus', 'cursos', 'otros')),
  pie text,
  publicada boolean not null default true,
  created_at timestamptz not null default now()
);
create index on public.fotos (categoria, created_at desc);

create table public.vehiculos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (length(trim(nombre)) > 0),
  descripcion text,
  imagen text not null,
  ancho integer not null check (ancho > 0),
  alto integer not null check (alto > 0),
  -- Clases de permiso con las que se usa, como en web/src/lib/permisos.js: {b, b-e, c-e…}
  permisos text[] not null default '{}',
  orden integer not null default 0,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS ----------------------------------------------------------------------

alter table public.novedades enable row level security;
alter table public.fotos enable row level security;
alter table public.vehiculos enable row level security;

-- La web: solo lo publicado (y las novedades sin caducar)
create policy novedades_web on public.novedades for select to anon
  using (publicada and (caduca is null or caduca >= current_date));
create policy fotos_web on public.fotos for select to anon using (publicada);
create policy vehiculos_web on public.vehiculos for select to anon using (publicado);

-- El panel: una única cuenta de la autoescuela, que lo puede todo
create policy novedades_panel on public.novedades for all to authenticated using (true) with check (true);
create policy fotos_panel on public.fotos for all to authenticated using (true) with check (true);
create policy vehiculos_panel on public.vehiculos for all to authenticated using (true) with check (true);

-- Storage ------------------------------------------------------------------
-- Bucket público: las fotos se sirven por URL sin sesión. Solo JPEG (el panel comprime antes de subir), 5 MB.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('web', 'web', true, 5242880, array['image/jpeg']);

create policy web_ver on storage.objects for select to authenticated using (bucket_id = 'web');
create policy web_subir on storage.objects for insert to authenticated with check (bucket_id = 'web');
create policy web_borrar on storage.objects for delete to authenticated using (bucket_id = 'web');
