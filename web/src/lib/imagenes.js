// Las fotos se comprimen en el navegador antes de subirlas (como en IMTEX): JPEG con el lado largo a
// 1.800 px como mucho y una miniatura de 600 px. Una foto de móvil de 5 MB se queda en ~300 KB.

const LADO = 1800
const LADO_MINI = 600
const CALIDAD = 0.82

function aJpeg(imagen, maximo) {
  const escala = Math.min(1, maximo / Math.max(imagen.width, imagen.height))
  const ancho = Math.round(imagen.width * escala)
  const alto = Math.round(imagen.height * escala)
  const lienzo = document.createElement('canvas')
  lienzo.width = ancho
  lienzo.height = alto
  const ctx = lienzo.getContext('2d')
  // Fondo blanco: un PNG con transparencia saldría negro en JPEG
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, ancho, alto)
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(imagen, 0, 0, ancho, alto)
  return new Promise((ok, mal) =>
    lienzo.toBlob((blob) => (blob ? ok({ blob, ancho, alto }) : mal(new Error('No se ha podido comprimir la imagen.'))), 'image/jpeg', CALIDAD),
  )
}

/** { foto, mini }: cada una { blob, ancho, alto } */
export async function comprimir(archivo) {
  let imagen
  try {
    // Gira las fotos verticales del móvil según su EXIF
    imagen = await createImageBitmap(archivo, { imageOrientation: 'from-image' })
  } catch {
    throw new Error(`«${archivo.name}» no se puede leer. Prueba con una foto JPG o PNG.`)
  }
  try {
    return { foto: await aJpeg(imagen, LADO), mini: await aJpeg(imagen, LADO_MINI) }
  } finally {
    imagen.close()
  }
}
