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

export const CENTROS = [
  {
    id: 'villanueva',
    ciudad: 'Villanueva de la Serena',
    direccion: 'C/ San Francisco, 30',
    cp: '06700',
    telefono: '924 84 36 82',
    foto: 'villanueva-1',
    galeria: ['villanueva-2', 'villanueva-3'],
  },
  {
    id: 'don-benito',
    ciudad: 'Don Benito',
    direccion: 'Avda. de la Constitución, 35',
    cp: '06400',
    telefono: '924 81 33 80',
    foto: 'donbenito-1',
    galeria: ['donbenito-2', 'donbenito-3'],
  },
  {
    id: 'navalvillar',
    ciudad: 'Navalvillar de Pela',
    direccion: 'C/ Cantarranas, 97',
    cp: '06760',
    telefono: '924 86 05 49',
    foto: 'navalvillar-1',
    galeria: ['navalvillar-2', 'navalvillar-3'],
  },
]

export const tel = (t) => `tel:+34${t.replace(/\s/g, '')}`
export const mapa = (c) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`La Serena Autoescuelas, ${c.direccion}, ${c.cp} ${c.ciudad}`)}`
