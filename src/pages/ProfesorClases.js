import React, { useState } from 'react';
import {
  Clock,
  Video,
  Calendar,
  ArrowLeft,
  Download,
  MessageCircle,
  BookOpen,
  Link as LinkIcon,
  Users,
  Upload,
  Plus,
  Edit,
  Trash2,
  Send,
} from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const ProfesorClases = () => {
  const [selectedClase, setSelectedClase] = useState(null);
  const [showAddRecurso, setShowAddRecurso] = useState(false);
  const [showAddMensajeForo, setShowAddMensajeForo] = useState(false);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'pdf',
    archivo: null,
  });
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Estado local para recursos y foro (data quemada que se puede modificar)
  const [recursos, setRecursos] = useState([]);
  const [mensajesForo, setMensajesForo] = useState([]);

  // Inicializar recursos y foro cuando se selecciona una clase
  React.useEffect(() => {
    if (selectedClase) {
      setRecursos(selectedClase.recursos || []);
      setMensajesForo(selectedClase.foro || []);
    }
  }, [selectedClase]);

  const handleAddRecurso = () => {
    if (!nuevoRecurso.nombre.trim()) {
      alert('Por favor ingresa el nombre del recurso');
      return;
    }

    const recursoNuevo = {
      nombre: nuevoRecurso.nombre,
      descripcion: nuevoRecurso.descripcion,
      tipo: nuevoRecurso.tipo,
      url:
        nuevoRecurso.tipo === 'pdf'
          ? `/recursos/${nuevoRecurso.archivo?.name || 'documento.pdf'}`
          : nuevoRecurso.url || '#',
    };

    setRecursos([...recursos, recursoNuevo]);
    setShowAddRecurso(false);
    setNuevoRecurso({
      nombre: '',
      descripcion: '',
      tipo: 'pdf',
      archivo: null,
      url: '',
    });
    alert('Recurso agregado exitosamente');
  };

  const handleAddMensajeForo = () => {
    if (!nuevoMensaje.trim()) {
      alert('Por favor escribe un mensaje');
      return;
    }

    const mensajeNuevo = {
      autor: selectedClase.profesor || 'Profesor',
      fecha: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      mensaje: nuevoMensaje,
      respuestas: 0,
    };

    setMensajesForo([mensajeNuevo, ...mensajesForo]);
    setShowAddMensajeForo(false);
    setNuevoMensaje('');
    alert('Mensaje publicado en el foro');
  };

  const handleDeleteRecurso = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este recurso?')) {
      const nuevosRecursos = recursos.filter((_, i) => i !== index);
      setRecursos(nuevosRecursos);
      alert('Recurso eliminado');
    }
  };

  const handleDeleteMensaje = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      const nuevosMensajes = mensajesForo.filter((_, i) => i !== index);
      setMensajesForo(nuevosMensajes);
      alert('Mensaje eliminado');
    }
  };

  // Vista de lista de clases
  if (!selectedClase) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis Clases</h2>
            <p className="text-gray-600">
              Administra tus clases de refuerzo y apoyo académico
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {MOCK_DATA.clases.map((clase) => (
            <div
              key={clase.id}
              onClick={() => setSelectedClase(clase)}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      CLASE VIRTUAL
                    </span>
                    {clase.proximaSesion && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        PRÓXIMA SESIÓN
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {clase.nombre}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {clase.descripcion}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {clase.horario}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  {clase.estudiantes} estudiantes
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <BookOpen className="w-4 h-4" />
                  {clase.recursos?.length || 0} recursos
                </div>
              </div>

              {clase.proximaSesion && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Próxima sesión: {clase.proximaSesion}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista de detalles y administración de la clase
  return (
    <div className="space-y-6">
      {/* Modal para agregar recurso */}
      {showAddRecurso && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Agregar Nuevo Recurso
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Recurso
                </label>
                <input
                  type="text"
                  value={nuevoRecurso.nombre}
                  onChange={(e) =>
                    setNuevoRecurso({ ...nuevoRecurso, nombre: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Presentación Culturas Precolombinas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={nuevoRecurso.descripcion}
                  onChange={(e) =>
                    setNuevoRecurso({
                      ...nuevoRecurso,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  placeholder="Breve descripción del recurso"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Recurso
                </label>
                <select
                  value={nuevoRecurso.tipo}
                  onChange={(e) =>
                    setNuevoRecurso({ ...nuevoRecurso, tipo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="link">Enlace Externo</option>
                </select>
              </div>

              {nuevoRecurso.tipo === 'pdf' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subir Archivo
                  </label>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {nuevoRecurso.archivo
                        ? nuevoRecurso.archivo.name
                        : 'Seleccionar PDF'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setNuevoRecurso({
                          ...nuevoRecurso,
                          archivo: e.target.files[0],
                        })
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL del Enlace
                  </label>
                  <input
                    type="url"
                    value={nuevoRecurso.url || ''}
                    onChange={(e) =>
                      setNuevoRecurso({ ...nuevoRecurso, url: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddRecurso(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddRecurso}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar Recurso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar mensaje al foro */}
      {showAddMensajeForo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Publicar en el Foro
            </h3>

            <textarea
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="5"
              placeholder="Escribe tu mensaje para los estudiantes..."
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddMensajeForo(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddMensajeForo}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => setSelectedClase(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Mis Clases
      </button>

      {/* Información principal de la clase */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              CLASE VIRTUAL
            </span>
            {selectedClase.modalidad && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {selectedClase.modalidad.toUpperCase()}
              </span>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            Editar Clase
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {selectedClase.nombre}
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700">{selectedClase.descripcion}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Información General
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Horario</p>
                  <p className="font-medium text-gray-900">
                    {selectedClase.horario}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Estudiantes inscritos</p>
                  <p className="font-medium text-gray-900">
                    {selectedClase.estudiantes} estudiantes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Próxima Sesión</h3>
            {selectedClase.proximaSesion ? (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">
                    {selectedClase.proximaSesion}
                  </span>
                </div>
                <p className="text-sm text-blue-100">
                  {selectedClase.temaProximaSesion ||
                    'Clase de refuerzo académico'}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  No hay sesiones programadas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enlace de Zoom */}
      {selectedClase.zoomLink && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Información de Zoom</h3>
              <p className="text-blue-100 text-sm">
                Comparte esta información con tus estudiantes
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-100 mb-1">ID de reunión</p>
                <p className="font-mono font-semibold">
                  {selectedClase.zoomId || '123 456 7890'}
                </p>
              </div>
              <div>
                <p className="text-blue-100 mb-1">Contraseña</p>
                <p className="font-mono font-semibold">
                  {selectedClase.zoomPassword || 'ExtraEDUC2026'}
                </p>
              </div>
              <div>
                <p className="text-blue-100 mb-1">Enlace</p>
                <a
                  href={selectedClase.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:text-blue-200"
                >
                  Abrir Zoom
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recursos de la clase - GESTIÓN PROFESOR */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Recursos de la Clase
            <span className="text-sm font-normal text-gray-500">
              ({recursos.length})
            </span>
          </h3>
          <button
            onClick={() => setShowAddRecurso(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Recurso
          </button>
        </div>

        {recursos.length > 0 ? (
          <div className="space-y-3">
            {recursos.map((recurso, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {recurso.tipo === 'pdf' ? (
                      <Download className="w-5 h-5 text-blue-600" />
                    ) : (
                      <LinkIcon className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {recurso.nombre}
                    </p>
                    {recurso.descripcion && (
                      <p className="text-sm text-gray-500">
                        {recurso.descripcion}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteRecurso(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="mb-4">No hay recursos agregados</p>
            <button
              onClick={() => setShowAddRecurso(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Agregar Primer Recurso
            </button>
          </div>
        )}
      </div>

      {/* Foro de la clase - GESTIÓN PROFESOR */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-purple-600" />
            Foro de Discusión
            <span className="text-sm font-normal text-gray-500">
              ({mensajesForo.length} mensajes)
            </span>
          </h3>
          <button
            onClick={() => setShowAddMensajeForo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Publicar Mensaje
          </button>
        </div>

        {mensajesForo.length > 0 ? (
          <div className="space-y-4">
            {mensajesForo.map((mensaje, index) => (
              <div
                key={index}
                className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {mensaje.autor.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {mensaje.autor}
                      </p>
                      <p className="text-xs text-gray-500">{mensaje.fecha}</p>
                    </div>
                  </div>
                  {mensaje.autor === selectedClase.profesor && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDeleteMensaje(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700">{mensaje.mensaje}</p>
                {mensaje.respuestas && mensaje.respuestas > 0 && (
                  <p className="text-sm text-purple-600 mt-2">
                    {mensaje.respuestas} respuesta
                    {mensaje.respuestas > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 mb-4">No hay mensajes en el foro</p>
            <button
              onClick={() => setShowAddMensajeForo(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Publicar Primer Mensaje
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfesorClases;
