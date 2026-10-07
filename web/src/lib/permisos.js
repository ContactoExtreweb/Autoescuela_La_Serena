// Los permisos que imparte La Serena, con el texto de su web puesto al día.
// Su web tenía errores de copia (descripciones cambiadas de sitio, la del D+E era la del D1+E) y edades
// anteriores a 2013 (AM a los 14, A a los 18). Aquí van las edades del Reglamento General de Conductores:
// confirmarlas con la autoescuela antes de publicar (docs/ESTADO.md).
//
// requiere = permiso que hay que tener antes (dibuja el «camino» en el buscador y en la ficha)
// edadCap  = edad mínima si se saca a la vez el CAP (conductores profesionales)

export const PERMISOS = [
  // Motos
  {
    slug: 'am',
    clase: 'AM',
    nombre: 'Ciclomotor',
    grupo: 'moto',
    edad: 15,
    conduce: ['Ciclomotores de dos o tres ruedas', 'Cuadriciclos ligeros (los «coches sin carné»)'],
    notas: ['Hasta los 16 años no se puede llevar pasajero.'],
  },
  {
    slug: 'a1',
    clase: 'A1',
    nombre: 'Moto de 125',
    grupo: 'moto',
    edad: 16,
    conduce: [
      'Motos de hasta 125 cc y 11 kW',
      'Triciclos de motor de hasta 15 kW',
      'Ciclomotores y vehículos para personas con movilidad reducida',
    ],
  },
  {
    slug: 'a2',
    clase: 'A2',
    nombre: 'Moto de media cilindrada',
    grupo: 'moto',
    edad: 18,
    conduce: [
      'Motos de hasta 35 kW y 0,2 kW/kg, no derivadas de una de más del doble de potencia',
      'Todo lo que permite el A1',
    ],
  },
  {
    slug: 'a',
    clase: 'A',
    nombre: 'Moto sin límite',
    grupo: 'moto',
    edad: 20,
    requiere: 'a2',
    requisitos: ['Dos años de antigüedad con el A2'],
    conduce: ['Motos de cualquier potencia, con o sin sidecar', 'Triciclos de motor', 'Todo lo que permite el A2'],
  },

  // Coche y remolques
  {
    slug: 'b',
    clase: 'B',
    nombre: 'Coche',
    grupo: 'coche',
    edad: 18,
    conduce: [
      'Turismos y furgonetas de hasta 3.500 kg y 9 plazas, con remolque de hasta 750 kg',
      'Coche con remolque más pesado si el conjunto no pasa de 3.500 kg',
      'Triciclos, cuadriciclos y ciclomotores',
    ],
    notas: ['Con tres años de antigüedad, también motos de 125 cc en España.'],
  },
  {
    slug: 'b-e',
    clase: 'B+E',
    nombre: 'Coche con remolque pesado',
    grupo: 'coche',
    edad: 18,
    requiere: 'b',
    conduce: ['Un vehículo de la clase B con un remolque de más de 750 kg (hasta 3.500 kg el remolque)'],
    notas: ['Para caravanas grandes, remolques de caballos, de maquinaria o de barco.'],
  },
  {
    slug: 'b96',
    clase: 'B96',
    nombre: 'Remolque hasta 4.250 kg',
    grupo: 'coche',
    edad: 18,
    requiere: 'b',
    conduce: ['Coche con remolque de más de 750 kg cuando el conjunto pasa de 3.500 kg y no de 4.250 kg'],
    notas: ['No es un permiso nuevo: es una ampliación del B que se anota en tu carné.'],
  },
  {
    slug: 'btp',
    clase: 'BTP',
    nombre: 'Taxi, ambulancia y escolar',
    grupo: 'coche',
    edad: 18,
    requiere: 'b',
    requisitos: [
      'Un año con el permiso B, o un certificado de formación de un centro como el nuestro',
      'Aprobar la prueba de conocimientos',
    ],
    conduce: [
      'Vehículos prioritarios en servicio urgente (ambulancias, bomberos…)',
      'Transporte escolar y transporte público de viajeros (taxi, VTC)',
      'Siempre de hasta 3.500 kg y 9 plazas',
    ],
  },

  // Mercancías
  {
    slug: 'c1',
    clase: 'C1',
    nombre: 'Camión mediano',
    grupo: 'camion',
    edad: 18,
    requiere: 'b',
    conduce: ['Camiones de más de 3.500 kg y hasta 7.500 kg, con remolque de hasta 750 kg'],
    notas: ['Para trabajar de conductor necesitas además el CAP.'],
  },
  {
    slug: 'c1-e',
    clase: 'C1+E',
    nombre: 'Camión mediano con remolque',
    grupo: 'camion',
    edad: 18,
    requiere: 'c1',
    conduce: ['Un camión C1 con remolque de más de 750 kg, sin pasar de 12.000 kg el conjunto'],
  },
  {
    slug: 'c',
    clase: 'C',
    nombre: 'Camión',
    grupo: 'camion',
    edad: 21,
    edadCap: 18,
    requiere: 'b',
    conduce: ['Camiones de más de 3.500 kg, sin límite, con remolque de hasta 750 kg', 'Todo lo que permite el C1'],
    notas: ['Lo sacamos junto con el CAP de 140 horas: así puedes empezar a trabajar a los 18.'],
  },
  {
    slug: 'c-e',
    clase: 'C+E',
    nombre: 'Tráiler',
    grupo: 'camion',
    edad: 21,
    edadCap: 18,
    requiere: 'c',
    conduce: ['Camión de la clase C con remolque o semirremolque de más de 750 kg: el tráiler'],
    notas: ['Incluye el B+E y el C1+E.'],
  },

  // Viajeros
  {
    slug: 'd1',
    clase: 'D1',
    nombre: 'Microbús',
    grupo: 'autobus',
    edad: 21,
    requiere: 'b',
    conduce: ['Vehículos de hasta 16 plazas más el conductor y 8 m de largo, con remolque de hasta 750 kg'],
  },
  {
    slug: 'd1-e',
    clase: 'D1+E',
    nombre: 'Microbús con remolque',
    grupo: 'autobus',
    edad: 21,
    requiere: 'd1',
    conduce: ['Un microbús D1 con remolque de más de 750 kg que no lleve personas'],
  },
  {
    slug: 'd',
    clase: 'D',
    nombre: 'Autobús',
    grupo: 'autobus',
    edad: 24,
    edadCap: 21,
    requiere: 'b',
    conduce: ['Autobuses de más de 9 plazas, sin límite, con remolque de hasta 750 kg', 'Todo lo que permite el D1'],
    notas: ['Lo sacamos junto con el CAP de viajeros.'],
  },
  {
    slug: 'd-e',
    clase: 'D+E',
    nombre: 'Autobús con remolque',
    grupo: 'autobus',
    edad: 24,
    edadCap: 21,
    requiere: 'd',
    conduce: ['Un autobús de la clase D con remolque de más de 750 kg'],
  },

  // Campo
  {
    slug: 'lva',
    clase: 'LVA',
    nombre: 'Tractor y vehículo agrícola',
    grupo: 'tractor',
    edad: 16,
    conduce: [
      'Tractores y vehículos agrícolas autopropulsados, con sus remolques',
      'Siempre que no pasen las medidas y masas de un vehículo normal, o no pasen de 45 km/h',
    ],
    examen: [
      'Un examen teórico específico de 20 preguntas',
      'Un práctico de maniobras: cambio de sentido, estacionar en rampa para cargar y enganchar y desenganchar el remolque',
    ],
  },
]

// Lo que el visitante quiere conducir → los permisos que le sirven (buscador de la portada y /permisos/)
// cursos = cursos que también salen en ese grupo (las máquinas no llevan permiso, sino certificado)
export const GRUPOS = [
  { id: 'coche', nombre: 'Coche', icono: 'car-front', titulo: 'Coche, remolques y taxi' },
  { id: 'moto', nombre: 'Moto', icono: 'motorbike', titulo: 'Motos y ciclomotores' },
  { id: 'camion', nombre: 'Camión', icono: 'truck', titulo: 'Camión (mercancías)' },
  { id: 'autobus', nombre: 'Autobús', icono: 'bus-front', titulo: 'Autobús (viajeros)' },
  {
    id: 'tractor',
    nombre: 'Tractor y máquinas',
    icono: 'tractor',
    titulo: 'Tractor y maquinaria',
    cursos: ['retro', 'carretillero', 'grua', 'plataformas'],
  },
]

export const permiso = (slug) => PERMISOS.find((p) => p.slug === slug)

/** Los permisos que hay que tener antes, del primero al último: C+E → [B, C] */
export function camino(p) {
  const antes = []
  for (let r = p.requiere; r; r = permiso(r).requiere) antes.unshift(permiso(r))
  return antes
}

export const edadTexto = (p) => (p.edadCap ? `${p.edad} años (${p.edadCap} con CAP)` : `${p.edad} años`)

// Cómo se califica el examen práctico (igual en todos los permisos; su web lo copiaba en cada ficha)
export const FALTAS = {
  eliminatorias: [
    'Poner en peligro a los ocupantes o a otros usuarios',
    'No respetar un semáforo, un stop, un agente o la señalización',
    'Velocidad no adaptada o por encima del máximo',
    'No dejar separación lateral suficiente',
    'Confundir mandos o no seguir las indicaciones del examinador',
  ],
  deficientes: [
    'Incorporarse a la circulación mal ejecutado',
    'Carril o separación inadecuados',
    'Posición o velocidad incorrectas en intersecciones',
    'Elegir mal el sitio para parar, estacionar o cambiar de sentido',
  ],
  leves: [
    'No ajustar asiento, espejos o cinturón antes de salir',
    'No señalizar a tiempo',
    'Observación insuficiente en maniobras',
    'Tocar el bordillo',
  ],
}
