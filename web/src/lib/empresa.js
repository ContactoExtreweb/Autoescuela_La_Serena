// Datos de la autoescuela, sacados de su web actual (laserenaautoescuelas.com, octubre 2026).
// Lo que falta o hay que confirmar con ellos está en docs/ESTADO.md.

export const EMPRESA = {
  nombre: 'La Serena Autoescuelas',
  dominio: 'https://www.laserenaautoescuelas.com',
  email: 'info@laserenaautoescuelas.com',
  desde: 'los años 70',
  facebook: 'https://www.facebook.com/laserenaautoescuelas',
}

// Para los alumnos: el test que ya usan y la consulta de notas de la DGT
export const ENLACES = {
  test: 'http://www.novatest.es/Login/',
  notas: 'https://sedeapl.dgt.gob.es/notasexamen/',
}

// Un solo centro desde octubre de 2026: la autoescuela es independiente y los de Don Benito y Navalvillar de Pela
// han cerrado (dicho por Saúl el 14/10). Sus fotos siguen en src/assets/fotos por si hicieran falta.
export const CENTRO = {
  ciudad: 'Villanueva de la Serena',
  direccion: 'C/ San Francisco, 30',
  cp: '06700',
  telefono: '924 84 36 82',
  foto: 'villanueva-1',
  galeria: ['villanueva-2', 'villanueva-3'],
}

export const tel = (t = CENTRO.telefono) => `tel:+34${t.replace(/\s/g, '')}`
export const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `La Serena Autoescuelas, ${CENTRO.direccion}, ${CENTRO.cp} ${CENTRO.ciudad}`,
)}`
