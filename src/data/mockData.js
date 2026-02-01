export const MOCK_DATA = {
  users: [
    {
      id: 1,
      email: 'profesor@espe.edu.ec',
      password: '123456',
      role: 'profesor',
      name: 'Dr. Juan Pérez',
      adminCode: '123456',
    },
    {
      id: 2,
      email: 'estudiante@espe.edu.ec',
      password: '123456',
      role: 'estudiante',
      name: 'Kevin Yugla',
    },
  ],
  clases: [
    {
      id: 1,
      nombre: 'Historia General del Ecuador',
      descripcion:
        'Estudio de los principales acontecimientos históricos del Ecuador desde la época precolombina hasta la actualidad. Clases de refuerzo y profundización académica.',
      profesor: 'Dr. Juan Pérez',
      horario: 'Lunes y Miércoles 15:00-17:00',
      estudiantes: 25,
      modalidad: 'Zoom',
      proximaSesion: 'Lunes 3 de Febrero, 15:00',
      temaProximaSesion: 'Las Culturas Precolombinas del Ecuador',
      duracion: '2 horas',
      zoomLink: 'https://zoom.us/j/1234567890',
      zoomId: '123 456 7890',
      zoomPassword: 'Historia2026',
      recursos: [
        {
          nombre: 'Presentación: Culturas Precolombinas',
          descripcion: 'Material de apoyo para la clase del 3 de febrero',
          tipo: 'pdf',
          url: '/recursos/culturas-precolombinas.pdf',
        },
        {
          nombre: 'Línea de Tiempo - Historia del Ecuador',
          descripcion: 'Cronología completa de los acontecimientos históricos',
          tipo: 'pdf',
          url: '/recursos/linea-tiempo.pdf',
        },
        {
          nombre: 'Video: Documental Ecuador Precolombino',
          descripcion: 'Material audiovisual complementario',
          tipo: 'link',
          url: 'https://youtube.com/watch?v=ejemplo',
        },
        {
          nombre: 'Guía de Estudio - Independencia',
          descripcion:
            'Resumen y ejercicios sobre la independencia del Ecuador',
          tipo: 'pdf',
          url: '/recursos/guia-independencia.pdf',
        },
      ],
      foro: [
        {
          autor: 'Dr. Juan Pérez',
          fecha: '01 Feb 2026, 10:30',
          mensaje:
            'Bienvenidos al foro de la clase. Aquí pueden hacer sus consultas sobre los temas que estamos viendo. Recuerden revisar los recursos antes de la próxima sesión.',
          respuestas: 3,
        },
        {
          autor: 'María González',
          fecha: '01 Feb 2026, 14:20',
          mensaje:
            '¿Profesor, podría recomendarnos algunos libros adicionales sobre las culturas precolombinas?',
          respuestas: 1,
        },
        {
          autor: 'Carlos Ramírez',
          fecha: '31 Ene 2026, 18:45',
          mensaje:
            'Tengo una duda sobre la Batalla de Pichincha. ¿Podríamos profundizar más en este tema en la próxima clase?',
          respuestas: 2,
        },
      ],
    },
  ],
  tareas: [
    {
      id: 1,
      titulo: 'Ensayo sobre la Independencia del Ecuador',
      descripcion:
        'Realizar un ensayo de 5 páginas sobre los acontecimientos que llevaron a la independencia del Ecuador',
      tipo: 'tarea',
      fechaCreacion: '2026-01-15',
      fechaEntrega: '2026-02-10',
      estado: 'pendiente',
      pdfUrl: '/docs/tarea-independencia.pdf',
      claseId: 1,
      archivoEntregado: null,
      fechaEnvio: null,
    },
    {
      id: 2,
      titulo: 'Refuerzo: Culturas Precolombinas',
      descripcion:
        'Ejercicios de repaso sobre las principales culturas precolombinas del Ecuador',
      tipo: 'refuerzo',
      fechaCreacion: '2026-01-20',
      fechaEntrega: '2026-02-05',
      estado: 'pendiente',
      pdfUrl: '/docs/refuerzo-culturas.pdf',
      claseId: 1,
      archivoEntregado: null,
      fechaEnvio: null,
    },
  ],
  prueba: {
    id: 1,
    titulo: 'Evaluación de Historia General',
    duracion: 10,
    preguntas: [
      {
        id: 1,
        pregunta: '¿En qué año se produjo la Independencia del Ecuador?',
        opciones: ['1809', '1822', '1830', '1895'],
        respuestaCorrecta: 1,
      },
      {
        id: 2,
        pregunta: '¿Cuál fue la primera cultura precolombina del Ecuador?',
        opciones: ['Inca', 'Valdivia', 'Cañari', 'Quitu-Cara'],
        respuestaCorrecta: 1,
      },
      {
        id: 3,
        pregunta: '¿Quién fue el primer presidente del Ecuador?',
        opciones: [
          'Simón Bolívar',
          'Juan José Flores',
          'Vicente Rocafuerte',
          'Gabriel García Moreno',
        ],
        respuestaCorrecta: 1,
      },
      {
        id: 4,
        pregunta: '¿Qué batalla selló la independencia de Ecuador?',
        opciones: [
          'Batalla de Pichincha',
          'Batalla de Ayacucho',
          'Batalla de Tarqui',
          'Batalla de Junín',
        ],
        respuestaCorrecta: 0,
      },
      {
        id: 5,
        pregunta: '¿En qué siglo floreció la cultura Valdivia?',
        opciones: [
          'Siglo X a.C.',
          'Siglo XX a.C.',
          'Siglo XXX a.C.',
          'Siglo V a.C.',
        ],
        respuestaCorrecta: 2,
      },
    ],
  },
};
