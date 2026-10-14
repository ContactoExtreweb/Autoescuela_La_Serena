// Lo que la autoescuela sube desde /admin (Supabase). La web lo lee con fetch y la clave pública (anon):
// el RLS solo deja ver lo publicado y las novedades sin caducar. Si Supabase no está configurado o falla,
// se devuelve una lista vacía y la sección no sale: la web nunca se rompe por esto.
// Las listas de categorías y etiquetas están también en supabase/migrations (check): cambiar las dos.

export const API = import.meta.env.PUBLIC_SUPABASE_URL
export const CLAVE = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const ETIQUETAS = {
  curso: 'Curso',
  intensivo: 'Intensivo',
  oferta: 'Oferta',
  aviso: 'Aviso',
}

export const CATEGORIAS = {
  instalaciones: 'Instalaciones',
  coche: 'Alumnos de coche',
  moto: 'Alumnos de moto',
  camion: 'Alumnos de camión',
  autobus: 'Alumnos de autobús',
  cursos: 'Cursos',
  otros: 'Otros',
}

/** Caché del CDN de Netlify: 2 minutos, y mientras se renueva se sirve la anterior. */
export const CACHE = 'public, max-age=0, s-maxage=120, stale-while-revalidate=3600'

async function leer(tabla, consulta) {
  if (!API || !CLAVE) return []
  try {
    const res = await fetch(`${API}/rest/v1/${tabla}?${consulta}`, {
      headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}` },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) throw new Error(`${tabla}: ${res.status} ${await res.text()}`)
    return await res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

/** Novedades publicadas: primero las que tienen fecha (la más próxima), luego las más recientes. */
export const novedades = () =>
  leer('novedades', 'select=*&order=fecha.asc.nullslast,created_at.desc&limit=12')

/** Una novedad publicada por su id, o null si no existe, está oculta o ha caducado (el RLS no la deja ver). */
export async function novedad(id) {
  if (!/^[0-9a-f-]{36}$/i.test(id ?? '')) return null
  return (await leer('novedades', `select=*&id=eq.${id}`))[0] ?? null
}

export const fotos = () => leer('fotos', 'select=*&order=created_at.desc&limit=500')

/** Vehículos publicados; con `permiso`, solo los de esa clase (slug de permisos.js). */
export const vehiculos = (permiso) =>
  leer('vehiculos', `select=*&order=orden.asc,created_at.asc${permiso ? `&permisos=cs.{${permiso}}` : ''}`)

/** URL pública de una imagen del bucket, o de su miniatura (la misma ruta acabada en `_m.jpg`). */
export const urlImagen = (ruta) => `${API}/storage/v1/object/public/web/${ruta}`
export const urlMiniatura = (ruta) => urlImagen(ruta.replace(/\.jpg$/, '_m.jpg'))

/** «2026-10-20» → «martes 20 de octubre» */
export const fechaConDia = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

/** «2026-10-20» → «20 de octubre» */
export const fechaLarga = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
