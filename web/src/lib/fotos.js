// Las fotos de src/assets/fotos por su nombre (sin .jpg). Astro las optimiza en el build (webp y tamaños).
const FOTOS = import.meta.glob('../assets/fotos/*.jpg', { eager: true, import: 'default' })

export const foto = (nombre) => FOTOS[`../assets/fotos/${nombre}.jpg`]
