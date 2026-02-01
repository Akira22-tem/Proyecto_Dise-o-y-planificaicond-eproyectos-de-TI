import React from 'react';
import { Home, Book, FileText, CheckCircle } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, menuOpen, setMenuOpen, isProfesor }) => {
  const profesorMenuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'clases', label: 'Clases', icon: Book },
    { id: 'tareas', label: 'Tareas', icon: FileText },
  ];

  const estudianteMenuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'clases', label: 'Clases', icon: Book },
    { id: 'tareas', label: 'Tareas', icon: FileText },
    { id: 'prueba', label: 'Evaluación', icon: CheckCircle },
  ];

  const menuItems = isProfesor ? profesorMenuItems : estudianteMenuItems;
  const activeColor = isProfesor ? 'emerald' : 'blue';

  return (
    <aside className={`${menuOpen ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
      <nav className="bg-white rounded-xl p-4 border border-gray-200 sticky top-24">
        <div className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? `bg-${activeColor}-50 text-${activeColor}-700`
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
