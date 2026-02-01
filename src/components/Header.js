import React from 'react';
import { Book, LogOut, User, Menu, X } from 'lucide-react';

const Header = ({ user, onLogout, menuOpen, setMenuOpen }) => {
  const isProfesor = user.role === 'profesor';
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${
              isProfesor 
                ? 'from-emerald-500 to-teal-600' 
                : 'from-blue-500 to-purple-600'
            } rounded-xl flex items-center justify-center`}>
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ExtraEDUC</h1>
              <p className="text-xs text-gray-500">
                Panel {isProfesor ? 'Profesor' : 'Estudiante'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Salir</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
