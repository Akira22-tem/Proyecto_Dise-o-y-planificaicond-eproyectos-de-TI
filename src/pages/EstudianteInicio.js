import React from 'react';

const EstudianteInicio = ({ tareas }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Tu Espacio de Aprendizaje</h2>
        <p className="text-blue-100">Accede a tus tareas y evaluaciones</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Tareas Pendientes</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {tareas.filter(t => t.estado === 'pendiente').length}
          </div>
          <p className="text-sm text-gray-500">Actividades por completar</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Tareas Completadas</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {tareas.filter(t => t.estado === 'entregada').length}
          </div>
          <p className="text-sm text-gray-500">Actividades finalizadas</p>
        </div>
      </div>
    </div>
  );
};

export default EstudianteInicio;
