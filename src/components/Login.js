import React, { useState } from 'react';
import logo from '../assets/ExtraEDUC.png';


import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'estudiante',
    adminCode: '',
  });
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = MOCK_DATA.users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        onLogin(user);
      } else {
        setError('Credenciales incorrectas');
      }
    } else {
      if (formData.role === 'estudiante') {
        const newUser = {
          id: MOCK_DATA.users.length + 1,
          ...formData,
        };
        MOCK_DATA.users.push(newUser);
        onLogin(newUser);
      } else {
        setRegistrationStep(2);
      }
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');

    if (code.length !== 6) {
      setError('Por favor ingresa los 6 dígitos del código');
      return;
    }

    const newUser = {
      id: MOCK_DATA.users.length + 1,
      ...formData,
      adminCode: code,
      verified: true,
    };
    MOCK_DATA.users.push(newUser);
    onLogin(newUser);
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleBackToStep1 = () => {
    setRegistrationStep(1);
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'estudiante',
      adminCode: '',
    });
    setRegistrationStep(1);
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
  };

  // PASO 2: Pantalla de verificación
  if (!isLogin && registrationStep === 2) {
    return (
      <div className="min-h-screen bg-white flex">
        {/* Panel izquierdo - Decorativo */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
            <img
              src= {logo}
              alt="ExtraEDUC Logo"
              className="w-64 h-auto mb-8"
            />
            <h2 className="text-3xl font-bold mb-4 text-center">
              Verificación de Profesor
            </h2>
            <p className="text-blue-100 text-center max-w-md">
              Estamos verificando tu identidad para garantizar la seguridad de
              la plataforma
            </p>
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <button
              onClick={handleBackToStep1}
              className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Código de Verificación
              </h2>
              <p className="text-gray-600">
                Hemos enviado un código a{' '}
                <span className="font-semibold text-blue-600">
                  {formData.email}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Ingresa el código de 6 dígitos
                </label>
                <div className="flex gap-2 justify-between">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">
                      Nota para el prototipo:
                    </p>
                    <p>
                      Cualquier código de 6 dígitos será válido para esta
                      demostración.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                Verificar y Crear Cuenta
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('Código reenviado a ' + formData.email);
                }}
                className="w-full text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
              >
                ¿No recibiste el código? Reenviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // PASO 1: Pantalla principal
  return (
    <div className="min-h-screen bg-white flex">
      {/* Panel izquierdo - Decorativo con logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <img
            src= {logo}
            alt="ExtraEDUC Logo"
            className="w-80 h-auto mb-8"
          />
          <h2 className="text-4xl font-bold mb-4 text-center">
            Bienvenido a ExtraEDUC
          </h2>
          <p className="text-blue-100 text-center text-lg max-w-md">
            Plataforma de Aprendizaje Extracurricular
          </p>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden mb-8 text-center">
            <img
              src="/mnt/user-data/uploads/1769998053773_image.png"
              alt="ExtraEDUC Logo"
              className="w-48 h-auto mx-auto mb-4"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? 'Ingresa tus credenciales para acceder'
                  : 'Completa el formulario para registrarte'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all text-sm ${
                  isLogin
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all text-sm ${
                  !isLogin
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="usuario@espe.edu.ec"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuario
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                  </select>

                  {formData.role === 'profesor' && (
                    <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Siguiente paso:</strong> Recibirás un código de
                        verificación en tu correo institucional para confirmar
                        tu registro como profesor.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                {isLogin
                  ? 'Iniciar Sesión'
                  : formData.role === 'profesor'
                    ? 'Continuar'
                    : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
                Credenciales de prueba:
              </p>
              <div className="space-y-1 text-xs text-gray-500 text-center">
                <p>
                  <span className="font-medium">Profesor:</span>{' '}
                  profesor@espe.edu.ec / 123456
                </p>
                <p>
                  <span className="font-medium">Estudiante:</span>{' '}
                  estudiante@espe.edu.ec / 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;