import React, { useState } from 'react';
import { Calendar, Download, Upload, CheckCircle } from 'lucide-react';

const EstudianteTareas = ({ tareas, setTareas }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e, tareaId) => {
    setSelectedFile({ tareaId, file: e.target.files[0] });
  };

  const handleSubmitTarea = (tareaId) => {
    setTareas(tareas.map(t => 
      t.id === tareaId ? { ...t, estado: 'entregada' } : t
    ));
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mis Tareas</h2>
      
      <div className="grid gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tarea.tipo === 'tarea' ? 'bg-blue-100 text-blue-700' :
                    tarea.tipo === 'refuerzo' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {tarea.tipo.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tarea.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {tarea.estado === 'pendiente' ? 'PENDIENTE' : 'ENTREGADA'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{tarea.titulo}</h3>
                <p className="text-gray-600 mt-1">{tarea.descripcion}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Entrega: {tarea.fechaEntrega}
              </div>
            </div>

            <div className="flex gap-3">
              {tarea.pdfUrl && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </button>
              )}
              
              {tarea.estado === 'pendiente' && (
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    {selectedFile?.tareaId === tarea.id ? selectedFile.file.name : 'Subir Tarea'}
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileSelect(e, tarea.id)}
                      className="hidden"
                    />
                  </label>
                  
                  {selectedFile?.tareaId === tarea.id && (
                    <button
                      onClick={() => handleSubmitTarea(tarea.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Entregar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudianteTareas;
