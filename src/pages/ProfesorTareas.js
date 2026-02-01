import React, { useState } from 'react';
import { FileText, Calendar } from 'lucide-react';

const ProfesorTareas = ({ tareas, setTareas }) => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'tarea',
    fechaEntrega: ''
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: tareas.length + 1,
      ...newTask,
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: 'pendiente',
      claseId: 1
    };
    setTareas([...tareas, task]);
    setNewTask({ titulo: '', descripcion: '', tipo: 'tarea', fechaEntrega: '' });
    setShowNewTaskForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Tareas</h2>
        <button
          onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Nueva Tarea
        </button>
      </div>

      {showNewTaskForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Crear Nueva Tarea</h3>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
              <input
                type="text"
                value={newTask.titulo}
                onChange={(e) => setNewTask({...newTask, titulo: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                value={newTask.descripcion}
                onChange={(e) => setNewTask({...newTask, descripcion: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={newTask.tipo}
                  onChange={(e) => setNewTask({...newTask, tipo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="tarea">Tarea</option>
                  <option value="refuerzo">Refuerzo</option>
                  <option value="proyecto">Proyecto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Entrega</label>
                <input
                  type="date"
                  value={newTask.fechaEntrega}
                  onChange={(e) => setNewTask({...newTask, fechaEntrega: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Crear Tarea
              </button>
              <button
                type="button"
                onClick={() => setShowNewTaskForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tarea.tipo === 'tarea' ? 'bg-blue-100 text-blue-700' :
                    tarea.tipo === 'refuerzo' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {tarea.tipo.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{tarea.titulo}</h3>
                <p className="text-gray-600 mt-1">{tarea.descripcion}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Entrega: {tarea.fechaEntrega}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfesorTareas;
