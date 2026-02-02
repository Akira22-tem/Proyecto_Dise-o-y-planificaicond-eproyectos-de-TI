import React from 'react';
import { Book, FileText, User } from 'lucide-react';

const ProfesorInicio = ({ tareas }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Panel de Administración</h2>
        <p className="text-emerald-100">Gestiona tus clases y actividades</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">1</span>
          </div>
          <h3 className="font-semibold text-gray-900">Clases Activas</h3>
          <p className="text-sm text-gray-500 mt-1">Historia General del Ecuador</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{tareas.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Tareas Asignadas</h3>
          <p className="text-sm text-gray-500 mt-1">Total de actividades</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">20</span>
          </div>
          <h3 className="font-semibold text-gray-900">Estudiantes</h3>
          <p className="text-sm text-gray-500 mt-1">Inscritos en tus clases</p>
        </div>
      </div>
    </div>
  );
};

export default ProfesorInicio;
