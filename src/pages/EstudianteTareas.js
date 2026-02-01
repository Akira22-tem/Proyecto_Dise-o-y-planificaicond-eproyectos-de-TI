import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Upload,
  CheckCircle,
  X,
  Edit,
  Trash2,
  ArrowLeft,
  FileText,
  AlertCircle,
} from 'lucide-react';

const EstudianteTareas = ({ tareas, setTareas }) => {
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(''); // 'submit', 'modify', 'delete'

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitTarea = () => {
    if (!selectedFile) return;

    setTareas(
      tareas.map((t) =>
        t.id === selectedTarea.id
          ? {
              ...t,
              estado: 'entregada',
              archivoEntregado: selectedFile.name,
              fechaEnvio: new Date().toLocaleDateString(),
            }
          : t
      )
    );

    setConfirmationType('submit');
    setShowConfirmation(true);
    setSelectedFile(null);

    // Actualizar la tarea seleccionada con los nuevos datos
    setTimeout(() => {
      setSelectedTarea(tareas.find((t) => t.id === selectedTarea.id));
    }, 100);
  };

  const handleModifyEntrega = () => {
    setSelectedFile(null);
    setConfirmationType('modify');
    setShowConfirmation(true);

    setTareas(
      tareas.map((t) =>
        t.id === selectedTarea.id
          ? {
              ...t,
              estado: 'pendiente',
              archivoEntregado: null,
              fechaEnvio: null,
            }
          : t
      )
    );

    setTimeout(() => {
      setSelectedTarea(tareas.find((t) => t.id === selectedTarea.id));
    }, 100);
  };

  const handleDeleteEntrega = () => {
    setConfirmationType('delete');
    setShowConfirmation(true);

    setTareas(
      tareas.map((t) =>
        t.id === selectedTarea.id
          ? {
              ...t,
              estado: 'pendiente',
              archivoEntregado: null,
              fechaEnvio: null,
            }
          : t
      )
    );

    setSelectedFile(null);

    setTimeout(() => {
      setSelectedTarea(tareas.find((t) => t.id === selectedTarea.id));
    }, 100);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationType('');
  };

  const handleBackToList = () => {
    setSelectedTarea(null);
    setSelectedFile(null);
  };

  // Vista de lista de tareas
  if (!selectedTarea) {
    const tareasPendientes = tareas.filter((t) => t.estado === 'pendiente');
    const tareasEntregadas = tareas.filter((t) => t.estado === 'entregada');

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Mis Tareas</h2>

        {/* Mensaje de felicitación si no hay tareas pendientes */}
        {tareasPendientes.length === 0 && tareasEntregadas.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">¡Excelente trabajo!</h3>
                <p className="text-green-100">
                  Has completado todas tus tareas pendientes. Puedes revisar y
                  modificar tus entregas cuando lo necesites.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje si no hay tareas en absoluto */}
        {tareas.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay tareas asignadas
            </h3>
            <p className="text-gray-600">Aún no tienes tareas en tu lista</p>
          </div>
        )}

        {/* Tareas Pendientes */}
        {tareasPendientes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Tareas Pendientes ({tareasPendientes.length})
            </h3>
            <div className="grid gap-4">
              {tareasPendientes.map((tarea) => (
                <div
                  key={tarea.id}
                  onClick={() => setSelectedTarea(tarea)}
                  className="bg-white rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-md transition-all cursor-pointer"
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
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          PENDIENTE
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tarea.titulo}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {tarea.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Entrega: {tarea.fechaEntrega}
                    </div>
                  </div>

                  <div className="text-sm text-blue-600 font-medium">
                    Click para ver detalles y entregar →
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tareas Entregadas */}
        {tareasEntregadas.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Tareas Entregadas ({tareasEntregadas.length})
            </h3>
            <div className="grid gap-4">
              {tareasEntregadas.map((tarea) => (
                <div
                  key={tarea.id}
                  onClick={() => setSelectedTarea(tarea)}
                  className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
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
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          ENTREGADA
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tarea.titulo}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {tarea.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Entrega: {tarea.fechaEntrega}
                    </div>
                    {tarea.fechaEnvio && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Enviada: {tarea.fechaEnvio}
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-blue-600 font-medium">
                    Click para ver detalles y modificar →
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista de detalles de tarea
  return (
    <div className="space-y-6">
      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {confirmationType === 'submit' && (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¡Tarea Enviada!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tu tarea ha sido entregada exitosamente
                  </p>
                </>
              )}
              {confirmationType === 'modify' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Edit className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Entrega Modificada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ahora puedes subir un nuevo archivo
                  </p>
                </>
              )}
              {confirmationType === 'delete' && (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Entrega Eliminada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tu entrega ha sido eliminada correctamente
                  </p>
                </>
              )}
              <button
                onClick={closeConfirmation}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={handleBackToList}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Mis Tareas
      </button>

      {/* Detalles de la tarea */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
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
            {selectedTarea.estado === 'pendiente' ? 'PENDIENTE' : 'ENTREGADA'}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {selectedTarea.titulo}
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-700">{selectedTarea.descripcion}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <div>
              <p className="text-xs text-gray-500">Fecha de entrega</p>
              <p className="font-semibold">{selectedTarea.fechaEntrega}</p>
            </div>
          </div>
          {selectedTarea.estado === 'entregada' && selectedTarea.fechaEnvio && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <div>
                <p className="text-xs text-green-500">Fecha de envío</p>
                <p className="font-semibold">{selectedTarea.fechaEnvio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Archivo entregado */}
        {selectedTarea.estado === 'entregada' &&
          selectedTarea.archivoEntregado && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    Archivo entregado
                  </p>
                  <p className="text-sm text-green-700">
                    {selectedTarea.archivoEntregado}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleModifyEntrega}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Modificar Entrega
                </button>
                <button
                  onClick={handleDeleteEntrega}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar Entrega
                </button>
              </div>
            </div>
          )}

        {/* Descarga del PDF de la tarea */}
        {selectedTarea.pdfUrl && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Material de la tarea
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4" />
              Descargar PDF de la Tarea
            </button>
          </div>
        )}

        {/* Subir tarea (solo si está pendiente) */}
        {selectedTarea.estado === 'pendiente' && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Subir tu trabajo
            </h3>

            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 mb-4">
              <div className="text-center">
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-medium hover:text-blue-700">
                    {selectedFile
                      ? selectedFile.name
                      : 'Seleccionar archivo PDF'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">Solo archivos PDF</p>
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              onClick={handleSubmitTarea}
              disabled={!selectedFile}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedFile
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              Entregar Tarea
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstudianteTareas;
