import React from 'react';
import { Clock, User } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Clases = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mis Clases</h2>
      {MOCK_DATA.clases.map(clase => (
        <div key={clase.id} className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{clase.nombre}</h3>
          <p className="text-gray-600 mb-4">{clase.descripcion}</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              {clase.horario}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              {clase.estudiantes} estudiantes
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clases;
