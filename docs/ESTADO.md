# La Serena Autoescuelas · boceto de web nueva

Cliente potencial (reunión de Pedro, 07/10/2026). Web actual: laserenaautoescuelas.com (Joomla, de ~2014).
Boceto hecho desde cero con **su** contenido: textos, fotos, permisos y cursos de su web.

**Un solo centro (14/10/2026):** la autoescuela es independiente y solo queda el de **Villanueva de la Serena**
(C/ San Francisco, 30 · 924 84 36 82); Don Benito y Navalvillar de Pela han cerrado. En el código es `CENTRO`
(`lib/empresa.js`). /centros/ pasó a /donde-estamos/ (301 en `_redirects`). Las fotos de los centros cerrados
siguen en `src/assets/fotos` sin usarse; la columna `novedades.centro` de la base ya no se usa.

## Cómo verlo

```
cd web
npm install      # solo la primera vez
npm run dev      # http://localhost:4321
```

Desde extreweb hay una entrada `laserena-dev-4340` en `.claude/launch.json` (puerto 4340).
`npm run build` → `dist/` estático (32 páginas), listo para Netlify. Si al crear un archivo nuevo sus estilos no
salen en `npm run dev`, reiniciar el servidor (Tailwind no lo había escaneado).

## Despliegue

GitHub `ContactoExtreweb/Autoescuela_La_Serena` (rama `main`) → Netlify, automático en cada push.
⚠️ El repo tiene que ser **público**: con el plan gratuito, en un repo privado Netlify bloquea los commits de
autores que no son miembros de la cuenta («Unrecognized Git contributor»). Tras pasarlo a público hizo falta un
push nuevo: «Retry» repite el despliegue ya bloqueado.

## Stack (igual que IMTEX)

Astro 7 + Tailwind 4 con el adaptador de Netlify: casi todo estático; la portada, /galeria/, las fichas de
permiso y /autoescuela/ se sirven bajo demanda (leen Supabase) con 2 min de caché en el CDN. Formulario con Netlify Forms. Fuente Overpass (nace de la letra de
las señales de carretera). Iconos de Lucide copiados en `src/lib/iconos.js` (sin dependencia).

- Datos en `src/lib/`: `empresa.js` (centro, teléfono, enlaces), `permisos.js` (17 permisos y grupos),
  `cursos.js`. Las páginas de cada permiso y curso salen de ahí.
- Fotos en `src/assets/fotos/` (las suyas; Astro las pasa a webp).
- `public/_redirects`: 301 de todas sus URLs viejas de Joomla a las nuevas.
- Hay dos `netlify.toml` con los mismos ajustes: el de la raíz (base = "web") para Netlify y `web/netlify.toml`
  para `npm run dev` (con solo el de la raíz, el plugin de Netlify buscaba web/web y el servidor se caía).

## Panel /admin (14/10/2026)

La autoescuela gestiona sola, sin tocar código, desde `/admin/` (noindex; móvil primero):

- **Novedades**: carteles de cursos (CAP, intensivos de teórica…), ofertas y avisos, con fecha de inicio, centro y
  «quitar de la web el…» (pasado ese día deja de salir sola). Salen en la portada **justo debajo del hero**, en
  tarjetas que se deslizan; cada una abre **su página** (`/novedades/<id>/`): cartel grande, todo el texto, «Quiero
  información» (contacto con ese curso escrito), llamar y compartir. Es página y no ventana para poder compartirla por
  WhatsApp/Facebook con el cartel de vista previa (og:image) y que Google la encuentre. Oculta o caducada → 404.
- **Galería**: fotos por categoría (instalaciones, alumnos de coche, moto, camión, autobús, cursos, otros).
  Se suben varias a la vez. En `/galeria/` se filtran con enlaces (`?categoria=moto`), sin JS.
- **Vehículos**: foto, nombre, descripción y los permisos con los que se usa. Salen en la ficha de cada permiso
  («Con qué vehículo aprendes») y en /autoescuela/.
- Todo se puede editar, ocultar/publicar y borrar (borrar quita también la foto del almacén).
- Las fotos se comprimen en el navegador antes de subir: JPEG de 1.800 px + miniatura de 600 px (`lib/imagenes.js`).
- Los cambios salen en la web en 1–2 minutos (caché del CDN, `CACHE` en `lib/contenido.js`).
- Sin Supabase configurado, las secciones nuevas no salen y /admin avisa: la web no se rompe.

Código: `supabase/migrations/20261014100000_web.sql` (tablas, RLS, bucket), `web/src/lib/contenido.js` (lectura
pública con fetch y la clave publicable, como IMTEX), `web/src/pages/admin.astro` (panel, con supabase-js),
componentes `Novedades`, `Vehiculos` y `Visor`. Las categorías y tipos están en `contenido.js` y en el `check`
del SQL: si cambia uno, cambiar el otro.

### Puesta en marcha de Supabase (una vez)

1. Crear el proyecto en Supabase (región Europa). Ojo: el plan gratis permite 2 proyectos activos por organización.
2. SQL Editor → pegar y ejecutar `supabase/migrations/20261014100000_web.sql` (o `npx supabase db push` enlazado).
3. Authentication → Sign In / Providers: desactivar «Allow new users to sign up».
4. Authentication → Users → Add user: la cuenta de la autoescuela (email + contraseña). Es la única que entra.
5. Netlify → Site configuration → Environment variables: `PUBLIC_SUPABASE_URL` y
   `PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Project Settings → API; la publicable/anon, **nunca** la secreta) y redesplegar.
   En local, lo mismo en `web/.env` (plantilla en `web/.env.example`).
6. El proyecto gratis se pausa tras una semana sin uso: si la web deja de enseñar novedades, mirar eso primero.

Probado el 14/10 contra un Supabase falso en local (API, login y almacenamiento): entrar, contraseña mala,
crear/editar/ocultar/publicar/borrar novedades, subir varias fotos y cambiar su categoría, vehículos con permisos,
que la web solo enseñe lo publicado y sin caducar, y el visor. **Falta probarlo contra el Supabase real.**

## Qué tiene

- **Buscador «¿Qué quieres conducir?»** (portada y /permisos/): eliges vehículo y edad → qué permiso necesitas,
  qué tienes que tener antes y si ya puedes sacártelo («Te faltan 2 años», «Ya puedes, con CAP»). «Lo quiero»
  abre el formulario con el permiso ya elegido.
- **Accesos de alumno**: test online (su Novatest) y nota del examen (DGT), a un toque.
- **Contador de faltas** del práctico (/permisos/#examen): sumas faltas y te dice apto / no apto.
- Ficha de cada permiso: qué conduces, requisitos, «tu camino» (B → C → C+E) y aviso del CAP en los profesionales.
- Cursos (CAP, ADR, carretillero, grúa…), formación gratuita (SEXPE) y bonificada (FUNDAE).
- La autoescuela (historia familiar, flota, aulas, sellos), «Dónde estamos» con «Llamar» y «Cómo llegar».
- Contacto: formulario corto (nombre, teléfono, qué le interesa, cuándo llamarle) + teléfono y dirección.
- Claro / oscuro, móvil primero, datos estructurados `DrivingSchool` con su dirección.

## Argumentos para la reunión (lo que falla en su web actual)

- No se ve bien en el móvil (es de ~2014, menú de imágenes, presentación de diapositivas que no carga).
- **Datos desactualizados:** dice que el AM es a los 14 años (desde 2013 son 15) y que el A es a los 18 (son 20
  con 2 años de A2); habla de la «Fundación Tripartita» (hoy FUNDAE) y de ISO 9001:2008.
- **Errores de copia:** en la página de permisos cada descripción va debajo del permiso que no es; la del D+E es la
  del D1+E; varias fichas repiten la misma lista de faltas.
- Páginas vacías (plataformas elevadoras, retroexcavadora) y noticias de 2015.
- «Más de 30 años de experiencia» cuando nacieron en los 70.
- El email sale oculto («protegido contra spambots») y no hay forma de pedir información sin llamar.

## Pendiente de confirmar con ellos (antes de publicar)

1. **Edades y requisitos de los permisos** (`lib/permisos.js`): puestos con el Reglamento General de Conductores;
   que los revise un profesor. Sobre todo D1, D, BTP y B96.
2. **Precios y horarios**: no hay ninguno en su web y no se han inventado. ¿Quieren enseñar precios o «desde»?
3. **WhatsApp**: ¿tienen un móvil con WhatsApp? Sería el botón principal.
4. **Sellos** ISO 9001 / 14001, CNAE, SEXPE y CAP: ¿siguen vigentes?
5. **Logo en vector** (el boceto lo redibuja en `components/Logo.astro`).
6. **Fotos nuevas**: las actuales son de 2014. Una sesión de fotos de la flota y los profesores lucería mucho.
7. **Reseñas de Google** del centro (no se han puesto: no inventamos).
8. Textos de **plataformas elevadoras y retroexcavadora** (su web los tenía vacíos; los nuestros son genéricos).
9. ¿Siguen con **Novatest** para los test? (enlace en `lib/empresa.js`).
10. Datos para **aviso legal y privacidad** (razón social, NIF, dirección). Hoy `/privacidad/` es un borrador.
11. **Facebook**: tienen dos páginas (`autoescuela.laserena` y `laserenaautoescuelas`); ¿cuál es la buena? ¿Instagram?
12. Dominio y correo: ¿quién los gestiona? (para el cambio y las redirecciones).

## Ideas si sale adelante (no hechas)

- Botón de WhatsApp fijo en el móvil.
- Analítica propia de extreweb (`v.js`) y alta en la tabla `sitios`.
- Páginas locales («carnet de camión en Villanueva», «autoescuela cerca de Don Benito») para SEO.
