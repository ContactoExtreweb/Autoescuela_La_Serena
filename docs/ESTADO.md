# La Serena Autoescuelas · boceto de web nueva

Cliente potencial (reunión de Pedro, 07/10/2026). Web actual: laserenaautoescuelas.com (Joomla, de ~2014).
Boceto hecho desde cero con **su** contenido: textos, fotos, centros, permisos y cursos de su web.

## Cómo verlo

```
cd web
npm install      # solo la primera vez
npm run dev      # http://localhost:4321
```

Desde extreweb hay una entrada `laserena-dev-4340` en `.claude/launch.json` (puerto 4340).
`npm run build` → `dist/` estático (32 páginas), listo para Netlify. Si al crear un archivo nuevo sus estilos no
salen en `npm run dev`, reiniciar el servidor (Tailwind no lo había escaneado).

## Stack (igual que IMTEX)

Astro 7 + Tailwind 4, estático, sin adaptador. Formulario con Netlify Forms. Fuente Overpass (nace de la letra de
las señales de carretera). Iconos de Lucide copiados en `src/lib/iconos.js` (sin dependencia).

- Datos en `src/lib/`: `empresa.js` (centros, teléfonos, enlaces), `permisos.js` (17 permisos y grupos),
  `cursos.js`. Las páginas de cada permiso y curso salen de ahí.
- Fotos en `src/assets/fotos/` (las suyas; Astro las pasa a webp).
- `public/_redirects`: 301 de todas sus URLs viejas de Joomla a las nuevas.

## Qué tiene

- **Buscador «¿Qué quieres conducir?»** (portada y /permisos/): eliges vehículo y edad → qué permiso necesitas,
  qué tienes que tener antes y si ya puedes sacártelo («Te faltan 2 años», «Ya puedes, con CAP»). «Lo quiero»
  abre el formulario con el permiso ya elegido.
- **Accesos de alumno**: test online (su Novatest) y nota del examen (DGT), a un toque.
- **Contador de faltas** del práctico (/permisos/#examen): sumas faltas y te dice apto / no apto.
- Ficha de cada permiso: qué conduces, requisitos, «tu camino» (B → C → C+E) y aviso del CAP en los profesionales.
- Cursos (CAP, ADR, carretillero, grúa…), formación gratuita (SEXPE) y bonificada (FUNDAE).
- La autoescuela (historia familiar, flota, aulas, sellos), 3 centros con «Llamar» y «Cómo llegar».
- Contacto: formulario corto (nombre, teléfono, qué le interesa, centro) + teléfonos de los tres centros.
- Claro / oscuro, móvil primero, datos estructurados `DrivingSchool` con los 3 centros.

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
3. **WhatsApp**: en la fachada de Navalvillar sale el **605 257 352**. ¿Es de WhatsApp? Sería el botón principal.
4. **Sellos** ISO 9001 / 14001, CNAE, SEXPE y CAP: ¿siguen vigentes?
5. **Logo en vector** (el boceto lo redibuja en `components/Logo.astro`).
6. **Fotos nuevas**: las actuales son de 2014. Una sesión de fotos de la flota y los profesores lucería mucho.
7. **Reseñas de Google** de los 3 centros (no se han puesto: no inventamos).
8. Textos de **plataformas elevadoras y retroexcavadora** (su web los tenía vacíos; los nuestros son genéricos).
9. ¿Siguen con **Novatest** para los test? (enlace en `lib/empresa.js`).
10. Datos para **aviso legal y privacidad** (razón social, NIF, dirección). Hoy `/privacidad/` es un borrador.
11. **Facebook**: tienen dos páginas (`autoescuela.laserena` y `laserenaautoescuelas`); ¿cuál es la buena? ¿Instagram?
12. Dominio y correo: ¿quién los gestiona? (para el cambio y las redirecciones).

## Ideas si sale adelante (no hechas)

- Próximas fechas de cursos CAP / ADR editables desde un panel.
- Botón de WhatsApp fijo en el móvil.
- Analítica propia de extreweb (`v.js`) y alta en la tabla `sitios`.
- Páginas locales («autoescuela en Don Benito», «carnet de camión en Villanueva») para SEO.
