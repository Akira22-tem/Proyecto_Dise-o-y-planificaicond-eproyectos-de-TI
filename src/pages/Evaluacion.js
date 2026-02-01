import React, { useState, useEffect } from 'react';
import { Clock, FileText } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Evaluacion = () => {
  const [showPrueba, setShowPrueba] = useState(false);
  const [pruebaState, setPruebaState] = useState({
    currentQuestion: 0,
    answers: {},
    timeLeft: 600,
    completed: false,
    score: null
  });

  useEffect(() => {
    if (showPrueba && !pruebaState.completed && pruebaState.timeLeft > 0) {
      const timer = setInterval(() => {
        setPruebaState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showPrueba, pruebaState.completed, pruebaState.timeLeft]);

  const handlePruebaAnswer = (questionId, answerIndex) => {
    setPruebaState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex }
    }));
  };

  const handleSubmitPrueba = () => {
    const correctAnswers = MOCK_DATA.prueba.preguntas.filter(
      (q) => pruebaState.answers[q.id] === q.respuestaCorrecta
    ).length;
    const score = (correctAnswers / MOCK_DATA.prueba.preguntas.length) * 100;
    setPruebaState(prev => ({
      ...prev,
      completed: true,
      score: score
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showPrueba) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Evaluación</h2>
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{MOCK_DATA.prueba.titulo}</h3>
          <p className="text-gray-600 mb-6">Duración: {MOCK_DATA.prueba.duracion} minutos</p>
          <p className="text-gray-600 mb-6">{MOCK_DATA.prueba.preguntas.length} preguntas de selección múltiple</p>
          <button
            onClick={() => setShowPrueba(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all shadow-lg"
          >
            Iniciar Prueba
          </button>
        </div>
      </div>
    );
  }

  if (pruebaState.completed) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Resultado de la Evaluación</h2>
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
            pruebaState.score >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className={`text-5xl font-bold ${
              pruebaState.score >= 70 ? 'text-green-600' : 'text-red-600'
            }`}>
              {pruebaState.score.toFixed(0)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {pruebaState.score >= 70 ? '¡Felicitaciones!' : 'Sigue practicando'}
          </h3>
          <p className="text-gray-600 mb-6">
            Respondiste correctamente {Object.values(pruebaState.answers).filter((a, i) => 
              a === MOCK_DATA.prueba.preguntas[i].respuestaCorrecta
            ).length} de {MOCK_DATA.prueba.preguntas.length} preguntas
          </p>
          <button
            onClick={() => {
              setShowPrueba(false);
              setPruebaState({
                currentQuestion: 0,
                answers: {},
                timeLeft: 600,
                completed: false,
                score: null
              });
            }}
            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = MOCK_DATA.prueba.preguntas[pruebaState.currentQuestion];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Pregunta {pruebaState.currentQuestion + 1} de {MOCK_DATA.prueba.preguntas.length}
          </h2>
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <Clock className="w-5 h-5" />
            {formatTime(pruebaState.timeLeft)}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-900 mb-6">{currentQuestion.pregunta}</p>
          <div className="space-y-3">
            {currentQuestion.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handlePruebaAnswer(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  pruebaState.answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    pruebaState.answers[currentQuestion.id] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {pruebaState.answers[currentQuestion.id] === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{opcion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setPruebaState(prev => ({
              ...prev,
              currentQuestion: Math.max(0, prev.currentQuestion - 1)
            }))}
            disabled={pruebaState.currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {pruebaState.currentQuestion === MOCK_DATA.prueba.preguntas.length - 1 ? (
            <button
              onClick={handleSubmitPrueba}
              disabled={Object.keys(pruebaState.answers).length !== MOCK_DATA.prueba.preguntas.length}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar Prueba
            </button>
          ) : (
            <button
              onClick={() => setPruebaState(prev => ({
                ...prev,
                currentQuestion: Math.min(MOCK_DATA.prueba.preguntas.length - 1, prev.currentQuestion + 1)
              }))}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Evaluacion;
