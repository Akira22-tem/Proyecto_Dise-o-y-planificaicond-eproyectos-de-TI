import React, { useState } from 'react';
import {
  Clock,
  User,
  Video,
  Calendar,
  ArrowLeft,
  Download,
  MessageCircle,
  BookOpen,
  Link as LinkIcon,
  ExternalLink,
  Users,
} from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Clases = () => {
  const [selectedClase, setSelectedClase] = useState(null);
  const [nuevoMensajeForo, setNuevoMensajeForo] = useState('');

  const handleEnviarMensajeForo = () => {
    if (nuevoMensajeForo.trim()) {
      console.log('Mensaje enviado:', nuevoMensajeForo);
      alert('Tu mensaje ha sido publicado en el foro');
      setNuevoMensajeForo('');
    }
  };

  // Vista de lista de clases
  if (!selectedClase) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Mis Clases</h2>
        <p className="text-gray-600">
          Clases de refuerzo y apoyo académico fuera del horario regular
        </p>

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

              <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {clase.horario}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  {clase.profesor}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  {clase.estudiantes} estudiantes
                </div>
                {clase.modalidad && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Video className="w-4 h-4" />
                    {clase.modalidad}
                  </div>
                )}
              </div>

              {clase.proximaSesion && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Próxima sesión: {clase.proximaSesion}
                    </span>
                  </div>
                </div>
              )}

              <div className="text-sm text-blue-600 font-medium">
                Click para ver detalles, recursos y enlace de Zoom →
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista de detalles de la clase
  return (
    <div className="space-y-6">
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
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            CLASE VIRTUAL
          </span>
          {selectedClase.modalidad && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              {selectedClase.modalidad.toUpperCase()}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {selectedClase.nombre}
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-700">{selectedClase.descripcion}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Profesor</p>
                  <p className="font-medium text-gray-900">
                    {selectedClase.profesor}
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
                <p className="text-sm text-blue-100 mb-3">
                  {selectedClase.temaProximaSesion ||
                    'Clase de refuerzo académico'}
                </p>
                {selectedClase.duracion && (
                  <p className="text-sm text-blue-100">
                    Duración: {selectedClase.duracion}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  No hay sesiones programadas próximamente
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
              <h3 className="text-xl font-bold">Acceso a Clase Virtual</h3>
              <p className="text-blue-100 text-sm">
                Ingresa a la clase mediante Zoom
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
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
            </div>
          </div>

          <a
            href={selectedClase.zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Unirse a la Clase en Zoom
          </a>

          <p className="text-xs text-blue-100 mt-3 text-center">
            Recomendamos ingresar 5 minutos antes del inicio de la clase
          </p>
        </div>
      )}

      {/* Recursos de la clase */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Recursos de la Clase
        </h3>

        {selectedClase.recursos && selectedClase.recursos.length > 0 ? (
          <div className="space-y-3">
            {selectedClase.recursos.map((recurso, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {recurso.tipo === 'pdf' ? (
                      <Download className="w-5 h-5 text-blue-600" />
                    ) : recurso.tipo === 'link' ? (
                      <LinkIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
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
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  {recurso.tipo === 'pdf' ? (
                    <>
                      <Download className="w-4 h-4" />
                      Descargar
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Abrir
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No hay recursos disponibles aún</p>
          </div>
        )}
      </div>

      {/* Foro de la clase */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-purple-600" />
          Foro de Discusión
        </h3>

        {selectedClase.foro && selectedClase.foro.length > 0 ? (
          <div className="space-y-4">
            {selectedClase.foro.map((mensaje, index) => (
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

            {/* Área para responder en el foro */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escribe tu respuesta o pregunta
              </label>
              <textarea
                value={nuevoMensajeForo}
                onChange={(e) => setNuevoMensajeForo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Participa en el foro..."
              />
              <button
                onClick={handleEnviarMensajeForo}
                disabled={!nuevoMensajeForo.trim()}
                className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  nuevoMensajeForo.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Publicar Respuesta
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 mb-4">Aún no hay mensajes en el foro</p>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 max-w-md mx-auto">
              <textarea
                value={nuevoMensajeForo}
                onChange={(e) => setNuevoMensajeForo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Sé el primero en participar..."
              />
              <button
                onClick={handleEnviarMensajeForo}
                disabled={!nuevoMensajeForo.trim()}
                className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  nuevoMensajeForo.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Ser el primero en participar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Información Importante
        </h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              Las clases de refuerzo se imparten en horario vespertino para no
              interferir con las clases regulares
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Se recomienda revisar los recursos antes de cada sesión</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              La asistencia a las clases virtuales es importante para tu
              seguimiento académico
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              Puedes utilizar el foro para hacer consultas entre sesiones
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Clases;
