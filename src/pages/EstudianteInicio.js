import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const EstudianteInicio = ({ tareas }) => {
  const tareasPendientes = tareas.filter((t) => t.estado === 'pendiente');
  const tareasCompletadas = tareas.filter((t) => t.estado === 'entregada');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Tu Espacio de Aprendizaje</h2>
        <p className="text-blue-100">Accede a tus tareas y evaluaciones</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Tareas Pendientes</h3>
          </div>
          <div className="text-4xl font-bold text-yellow-600 mb-2">
            {tareasPendientes.length}
          </div>
          <p className="text-sm text-gray-500">
            {tareasPendientes.length === 0
              ? '¡Excelente! No tienes tareas pendientes'
              : 'Actividades por completar'}
          </p>

          {tareasPendientes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-2">
                Próximas entregas:
              </p>
              {tareasPendientes.slice(0, 2).map((tarea) => (
                <div key={tarea.id} className="text-xs text-gray-600 mb-1">
                  • {tarea.titulo} - {tarea.fechaEntrega}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Tareas Completadas</h3>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {tareasCompletadas.length}
          </div>
          <p className="text-sm text-gray-500">Actividades finalizadas</p>

          {tareasCompletadas.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-2">
                Últimas entregas:
              </p>
              {tareasCompletadas.slice(0, 2).map((tarea) => (
                <div key={tarea.id} className="text-xs text-gray-600 mb-1">
                  • {tarea.titulo} {tarea.fechaEnvio && `- ${tarea.fechaEnvio}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progreso general */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Progreso General
        </h3>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 rounded-full"
              style={{
                width: `${tareas.length > 0 ? (tareasCompletadas.length / tareas.length) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {tareasCompletadas.length} de {tareas.length} tareas completadas
            {tareas.length > 0 &&
              ` (${Math.round((tareasCompletadas.length / tareas.length) * 100)}%)`}
          </p>
        </div>
      </div>

      {/* Mensaje motivacional */}
      {tareasPendientes.length === 0 && tareas.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">¡Felicitaciones!</h3>
          <p className="text-green-100">
            Has completado todas tus tareas. ¡Excelente trabajo!
          </p>
        </div>
      )}
    </div>
  );
};

export default EstudianteInicio;
