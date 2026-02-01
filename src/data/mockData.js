export const MOCK_DATA = {
  users: [
    { 
      id: 1, 
      email: 'profesor@espe.edu.ec', 
      password: '123456', 
      role: 'profesor', 
      name: 'Dr. Juan Pérez', 
      adminCode: '123456' 
    },
    { 
      id: 2, 
      email: 'estudiante@espe.edu.ec', 
      password: '123456', 
      role: 'estudiante', 
      name: 'Kevin Yugla' 
    }
  ],
  clases: [
    {
      id: 1,
      nombre: 'Historia General del Ecuador',
      descripcion: 'Estudio de los principales acontecimientos históricos del Ecuador desde la época precolombina hasta la actualidad.',
      profesor: 'Dr. Juan Pérez',
      horario: 'Lunes y Miércoles 14:00-16:00',
      estudiantes: 25
    }
  ],
  tareas: [
    {
      id: 1,
      titulo: 'Ensayo sobre la Independencia del Ecuador',
      descripcion: 'Realizar un ensayo de 5 páginas sobre los acontecimientos que llevaron a la independencia del Ecuador',
      tipo: 'tarea',
      fechaCreacion: '2026-01-15',
      fechaEntrega: '2026-02-10',
      estado: 'pendiente',
      pdfUrl: '/docs/tarea-independencia.pdf',
      claseId: 1
    },
    {
      id: 2,
      titulo: 'Refuerzo: Culturas Precolombinas',
      descripcion: 'Ejercicios de repaso sobre las principales culturas precolombinas del Ecuador',
      tipo: 'refuerzo',
      fechaCreacion: '2026-01-20',
      fechaEntrega: '2026-02-05',
      estado: 'pendiente',
      pdfUrl: '/docs/refuerzo-culturas.pdf',
      claseId: 1
    }
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
        respuestaCorrecta: 1
      },
      {
        id: 2,
        pregunta: '¿Cuál fue la primera cultura precolombina del Ecuador?',
        opciones: ['Inca', 'Valdivia', 'Cañari', 'Quitu-Cara'],
        respuestaCorrecta: 1
      },
      {
        id: 3,
        pregunta: '¿Quién fue el primer presidente del Ecuador?',
        opciones: ['Simón Bolívar', 'Juan José Flores', 'Vicente Rocafuerte', 'Gabriel García Moreno'],
        respuestaCorrecta: 1
      },
      {
        id: 4,
        pregunta: '¿Qué batalla selló la independencia de Ecuador?',
        opciones: ['Batalla de Pichincha', 'Batalla de Ayacucho', 'Batalla de Tarqui', 'Batalla de Junín'],
        respuestaCorrecta: 0
      },
      {
        id: 5,
        pregunta: '¿En qué siglo floreció la cultura Valdivia?',
        opciones: ['Siglo X a.C.', 'Siglo XX a.C.', 'Siglo XXX a.C.', 'Siglo V a.C.'],
        respuestaCorrecta: 2
      }
    ]
  }
};
