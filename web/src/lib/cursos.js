// Cursos de La Serena, sacados de su web. Las páginas de plataformas y retro estaban vacías:
// su texto es nuestro y hay que validarlo con ellos (docs/ESTADO.md).

export const CURSOS = [
  {
    slug: 'cap',
    nombre: 'CAP',
    largo: 'Certificado de Aptitud Profesional',
    icono: 'badge-check',
    resumen: 'Obligatorio para trabajar conduciendo camiones o autobuses en toda la Unión Europea.',
    texto: [
      'El CAP acredita que un conductor profesional ha superado la formación y los exámenes que exige la Unión Europea.',
      'Estamos autorizados para impartir la cualificación inicial y la formación continua, de mercancías y de viajeros, en nuestros centros de Villanueva de la Serena y Don Benito.',
    ],
    datos: [
      ['Cualificación inicial', '140 horas'],
      ['Formación continua (renovación)', '35 horas'],
      ['Horario', 'Adaptado, también fines de semana'],
    ],
    permisos: ['c', 'c-e', 'd', 'd-e'],
  },
  {
    slug: 'capacitacion-transportista',
    nombre: 'Capacitación de transportista',
    largo: 'Competencia profesional para el transporte por carretera',
    icono: 'container',
    resumen: 'Para montar tu propia empresa de transporte de mercancías o de viajeros.',
    texto: [
      'Preparamos el examen del título de competencia profesional para el transporte por carretera, de mercancías y de viajeros.',
    ],
  },
  {
    slug: 'adr',
    nombre: 'Mercancías peligrosas (ADR)',
    largo: 'Autorización para transportar mercancías peligrosas',
    icono: 'shield-check',
    resumen: 'Obtención y renovación de todas las especialidades: básico y cisternas.',
    texto: [
      'Autorización para conducir vehículos que transportan mercancías peligrosas. Obtención y renovación de todas las especialidades: básico y cisternas.',
      'El objetivo: aplicar la legislación vigente y que el conductor conozca los riesgos del transporte de mercancías peligrosas por carretera.',
    ],
  },
  {
    slug: 'carretillero',
    nombre: 'Carretillero',
    largo: 'Certificado de operador de carretilla elevadora',
    icono: 'forklift',
    resumen: 'Obligatorio por prevención de riesgos laborales y lo piden casi todas las ofertas del sector.',
    texto: [
      'El certificado de carretillero es obligatorio según la Ley de Prevención de Riesgos Laborales y es requisito en la gran mayoría de ofertas de trabajo de almacén y logística.',
    ],
  },
  {
    slug: 'grua',
    nombre: 'Grúa autocargante',
    largo: 'Operador de grúa hidráulica sobre camión',
    icono: 'construction',
    resumen: 'El certificado que piden para manejar la pluma de un camión grúa.',
    texto: [
      'El certificado de operador de grúa hidráulica sobre camión es obligatorio según la Ley de Prevención de Riesgos Laborales y es requisito en la mayoría de ofertas de trabajo del sector.',
    ],
  },
  {
    slug: 'plataformas',
    nombre: 'Plataformas elevadoras',
    largo: 'Operador de plataformas elevadoras móviles de personal',
    icono: 'construction',
    resumen: 'Para trabajar en altura con tijeras y brazos articulados con seguridad.',
    texto: ['Formación para manejar plataformas elevadoras móviles de personal con seguridad, en teoría y en práctica.'],
  },
  {
    slug: 'retro',
    nombre: 'Retroexcavadora',
    largo: 'Operador de retroexcavadora y retro mixta',
    icono: 'tractor',
    resumen: 'Manejo seguro de retroexcavadora y retro mixta para obra y campo.',
    texto: ['Formación teórica y práctica para manejar retroexcavadora y retro mixta con seguridad.'],
  },
]

export const curso = (slug) => CURSOS.find((c) => c.slug === slug)
