import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Edit,
  Trash2,
  X,
  Upload,
  Users,
  CheckCircle,
  Clock,
  Download,
  Save,
  Star,
  MessageSquare,
} from 'lucide-react';

const ProfesorTareas = ({ tareas, setTareas }) => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [editingTarea, setEditingTarea] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(null);
  const [gradeValue, setGradeValue] = useState('');
  const [gradeComment, setGradeComment] = useState('');
  const [newTask, setNewTask] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'tarea',
    fechaEntrega: '',
    pdfUrl: null,
  });

  // Crear nueva tarea
  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: tareas.length + 1,
      ...newTask,
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: 'pendiente',
      claseId: 1,
      archivoEntregado: null,
      fechaEnvio: null,
      calificacion: null,
      comentario: null,
    };
    setTareas([...tareas, task]);
    setNewTask({
      titulo: '',
      descripcion: '',
      tipo: 'tarea',
      fechaEntrega: '',
      pdfUrl: null,
    });
    setShowNewTaskForm(false);
    alert('Tarea creada exitosamente');
  };

  // Calificar tarea
  const handleOpenGradeModal = (tarea) => {
    setShowGradeModal(tarea);
    setGradeValue(tarea.calificacion || '');
    setGradeComment(tarea.comentario || '');
  };

  const handleSubmitGrade = () => {
    if (!gradeValue || gradeValue < 0 || gradeValue > 10) {
      alert('Por favor ingresa una calificación válida entre 0 y 10');
      return;
    }

    const nuevasTareas = tareas.map((t) =>
      t.id === showGradeModal.id
        ? { 
            ...t, 
            calificacion: parseFloat(gradeValue),
            comentario: gradeComment.trim() || null
          }
        : t
    );
    setTareas(nuevasTareas);

    // Actualizar la tarea seleccionada si está abierta
    if (selectedTarea && selectedTarea.id === showGradeModal.id) {
      setSelectedTarea({ 
        ...showGradeModal, 
        calificacion: parseFloat(gradeValue),
        comentario: gradeComment.trim() || null
      });
    }

    setShowGradeModal(null);
    setGradeValue('');
    setGradeComment('');
    alert('✅ Tarea calificada exitosamente');
  };

  // Editar tarea existente
  const handleEditTarea = (tarea) => {
    setEditingTarea({
      ...tarea,
      nuevoPdf: null,
    });
    setSelectedTarea(null);
  };

  const handleSaveEdit = () => {
    const tareaActualizada = {
      ...editingTarea,
      pdfUrl: editingTarea.nuevoPdf
        ? `/docs/${editingTarea.nuevoPdf.name}`
        : editingTarea.pdfUrl,
    };

    const nuevasTareas = tareas.map((t) =>
      t.id === editingTarea.id ? tareaActualizada : t
    );
    setTareas(nuevasTareas);

    setEditingTarea(null);
    alert(
      '✅ Tarea actualizada exitosamente. Los estudiantes verán los cambios.'
    );
  };

  // Eliminar tarea
  const handleDeleteTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
    setShowDeleteConfirmation(null);
    setSelectedTarea(null);
    alert('Tarea eliminada exitosamente');
  };

  // Ver detalles de tarea
  const handleViewDetails = (tarea) => {
    setSelectedTarea(tarea);
  };

  // Estadísticas de entregas
  const getEstadisticas = (tarea) => {
    const totalEstudiantes = 25;
    const entregadas = tarea.estado === 'entregada' ? 1 : 0;
    const pendientes = totalEstudiantes - entregadas;
    return { total: totalEstudiantes, entregadas, pendientes };
  };

  // Si está editando una tarea
  if (editingTarea) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setEditingTarea(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Editar Tarea</h2>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={editingTarea.titulo}
                onChange={(e) =>
                  setEditingTarea({
                    ...editingTarea,
                    titulo: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={editingTarea.descripcion}
                onChange={(e) =>
                  setEditingTarea({
                    ...editingTarea,
                    descripcion: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={editingTarea.tipo}
                  onChange={(e) =>
                    setEditingTarea({
                      ...editingTarea,
                      tipo: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="tarea">Tarea</option>
                  <option value="refuerzo">Refuerzo</option>
                  <option value="proyecto">Proyecto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Entrega
                </label>
                <input
                  type="date"
                  value={editingTarea.fechaEntrega}
                  onChange={(e) =>
                    setEditingTarea({
                      ...editingTarea,
                      fechaEntrega: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modificar PDF
              </label>
              <div className="space-y-3">
                {editingTarea.pdfUrl && !editingTarea.nuevoPdf && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <FileText className="w-4 h-4" />
                    <span>PDF actual: {editingTarea.pdfUrl}</span>
                  </div>
                )}
                {editingTarea.nuevoPdf && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <FileText className="w-4 h-4" />
                    <span>Nuevo PDF: {editingTarea.nuevoPdf.name}</span>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border-2 border-dashed border-blue-300">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">
                    {editingTarea.nuevoPdf ? 'Cambiar PDF' : 'Subir nuevo PDF'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setEditingTarea({
                        ...editingTarea,
                        nuevoPdf: e.target.files[0],
                      })
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setEditingTarea(null)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">
                Los cambios se reflejarán automáticamente
              </p>
              <p className="text-blue-700">
                Cuando guardes, los estudiantes verán inmediatamente la tarea
                actualizada con los nuevos datos.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si está viendo detalles de una tarea
  if (selectedTarea) {
    const stats = getEstadisticas(selectedTarea);

    return (
      <div className="space-y-6">
        {/* Modal de calificación */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Calificar Tarea
                  </h3>
                  <button
                    onClick={() => {
                      setShowGradeModal(null);
                      setGradeValue('');
                      setGradeComment('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Estudiante:</p>
                  <p className="font-semibold text-gray-900">Kevin Yugla</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={gradeValue}
                    onChange={(e) => setGradeValue(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold text-center"
                    placeholder="0.0"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Ingresa un valor entre 0 y 10
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Comentario (Opcional)
                  </label>
                  <textarea
                    value={gradeComment}
                    onChange={(e) => setGradeComment(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="4"
                    placeholder="Escribe un comentario sobre el desempeño del estudiante..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    El estudiante podrá ver este comentario
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitGrade}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                  >
                    <Star className="w-5 h-5" />
                    Guardar Calificación
                  </button>
                  <button
                    onClick={() => {
                      setShowGradeModal(null);
                      setGradeValue('');
                      setGradeComment('');
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¿Eliminar Tarea?
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta acción no se puede deshacer. La tarea será eliminada para
                  todos los estudiantes.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => handleDeleteTarea(showDeleteConfirmation)}
                    className="flex-1 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(null)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedTarea(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Detalles de Tarea
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedTarea.tipo === 'tarea'
                    ? 'bg-blue-100 text-blue-700'
                    : selectedTarea.tipo === 'refuerzo'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-orange-100 text-orange-700'
                }`}
              >
                {selectedTarea.tipo.toUpperCase()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedTarea.estado === 'pendiente'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {selectedTarea.estado === 'pendiente'
                  ? 'PENDIENTE'
                  : 'ENTREGADA'}
              </span>
              {selectedTarea.calificacion !== null && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {selectedTarea.calificacion}/10
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditTarea(selectedTarea)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(selectedTarea.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedTarea.titulo}
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
            <p className="text-gray-700">{selectedTarea.descripcion}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="text-xs text-gray-500">Fecha de entrega</p>
                <p className="font-semibold">{selectedTarea.fechaEntrega}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-xs text-gray-500">Fecha de creación</p>
                <p className="font-semibold">{selectedTarea.fechaCreacion}</p>
              </div>
            </div>
            {selectedTarea.pdfUrl && (
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-500">Material adjunto</p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Ver PDF
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Estadísticas de entregas */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6" />
              <h4 className="text-lg font-semibold">Estado de Entregas</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm opacity-90">Total Estudiantes</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-300">
                  {stats.entregadas}
                </p>
                <p className="text-sm opacity-90">Entregadas</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-300">
                  {stats.pendientes}
                </p>
                <p className="text-sm opacity-90">Pendientes</p>
              </div>
            </div>
          </div>

          {/* Lista de entregas */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Entregas de Estudiantes
            </h4>

            {selectedTarea.estado === 'entregada' &&
            selectedTarea.archivoEntregado ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">Kevin Yugla</p>
                        {selectedTarea.calificacion !== null && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {selectedTarea.calificacion}/10
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Entregado: {selectedTarea.fechaEnvio}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                    <button
                      onClick={() => handleOpenGradeModal(selectedTarea)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                    >
                      <Star className="w-4 h-4" />
                      {selectedTarea.calificacion !== null
                        ? 'Editar Nota'
                        : 'Calificar'}
                    </button>
                  </div>
                </div>
                
                {/* Comentario del profesor */}
                {selectedTarea.comentario && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Comentario del profesor:
                        </p>
                        <p className="text-sm text-gray-700">
                          {selectedTarea.comentario}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Aún no hay entregas para esta tarea
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vista principal (lista de tareas)
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={newTask.titulo}
                onChange={(e) =>
                  setNewTask({ ...newTask, titulo: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={newTask.descripcion}
                onChange={(e) =>
                  setNewTask({ ...newTask, descripcion: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={newTask.tipo}
                  onChange={(e) =>
                    setNewTask({ ...newTask, tipo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="tarea">Tarea</option>
                  <option value="refuerzo">Refuerzo</option>
                  <option value="proyecto">Proyecto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Entrega
                </label>
                <input
                  type="date"
                  value={newTask.fechaEntrega}
                  onChange={(e) =>
                    setNewTask({ ...newTask, fechaEntrega: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir PDF (Opcional)
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer w-fit">
                <Upload className="w-4 h-4" />
                {newTask.pdfUrl ? newTask.pdfUrl.name : 'Seleccionar PDF'}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setNewTask({ ...newTask, pdfUrl: e.target.files[0] })
                  }
                  className="hidden"
                />
              </label>
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
        {tareas.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay tareas creadas
            </h3>
            <p className="text-gray-600">
              Crea tu primera tarea para tus estudiantes
            </p>
          </div>
        ) : (
          tareas.map((tarea) => {
            const stats = getEstadisticas(tarea);
            return (
              <div
                key={tarea.id}
                onClick={() => handleViewDetails(tarea)}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tarea.tipo === 'tarea'
                            ? 'bg-blue-100 text-blue-700'
                            : tarea.tipo === 'refuerzo'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {tarea.tipo.toUpperCase()}
                      </span>
                      {tarea.calificacion !== null && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {tarea.calificacion}/10
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tarea.titulo}
                    </h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {tarea.descripcion}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTarea(tarea);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirmation(tarea.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Entrega: {tarea.fechaEntrega}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-medium">
                      {stats.entregadas}/{stats.total} entregadas
                    </span>
                    <span className="text-xs text-blue-600">
                      Click para ver detalles →
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProfesorTareas;