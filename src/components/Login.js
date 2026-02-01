import React, { useState } from 'react';
import {
  Book,
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
  const [registrationStep, setRegistrationStep] = useState(1); // 1: Datos básicos, 2: Verificación
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
      // Proceso de login
      const user = MOCK_DATA.users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        onLogin(user);
      } else {
        setError('Credenciales incorrectas');
      }
    } else {
      // Proceso de registro
      if (formData.role === 'estudiante') {
        // Registro directo para estudiantes
        const newUser = {
          id: MOCK_DATA.users.length + 1,
          ...formData,
        };
        MOCK_DATA.users.push(newUser);
        onLogin(newUser);
      } else {
        // Para profesores, ir al paso 2 (verificación)
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

    // En el prototipo, cualquier código de 6 dígitos es válido
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

    // Auto-focus siguiente input
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

  // PASO 2: Pantalla de verificación (solo para profesores)
  if (!isLogin && registrationStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="w-full max-w-md relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-emerald-100">
            <button
              onClick={handleBackToStep1}
              className="mb-4 flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verificación de Profesor
              </h2>
              <p className="text-gray-600">
                Hemos enviado un código de verificación a
              </p>
              <p className="text-emerald-600 font-semibold mt-1">
                {formData.email}
              </p>
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Ingresa el código de 6 dígitos
                </label>
                <div className="flex gap-2 justify-center">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
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
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Verificar y Crear Cuenta
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('Código reenviado a ' + formData.email);
                }}
                className="w-full text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                ¿No recibiste el código? Reenviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // PASO 1: Pantalla de login/registro principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-emerald-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg transform rotate-3">
              <Book className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ExtraEDUC
            </h1>
            <p className="text-gray-600 mt-2">
              Plataforma de Aprendizaje Extracurricular
            </p>
          </div>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-white text-emerald-600 shadow-sm'
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
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registro
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                </select>

                {formData.role === 'profesor' && (
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <p className="text-sm text-emerald-800">
                      <strong>Siguiente paso:</strong> Recibirás un código de
                      verificación en tu correo institucional para confirmar tu
                      registro como profesor.
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLogin
                ? 'Iniciar Sesión'
                : formData.role === 'profesor'
                  ? 'Continuar'
                  : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="font-semibold mb-2">Credenciales de prueba:</p>
            <p className="mt-1">Profesor: profesor@espe.edu.ec / 123456</p>
            <p>Estudiante: estudiante@espe.edu.ec / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
