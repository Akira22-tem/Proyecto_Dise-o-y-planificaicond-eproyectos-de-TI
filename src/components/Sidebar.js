import React from 'react';

const Sidebar = ({ activeSection, setActiveSection, isProfesor }) => {
  const profesorMenuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'clases', label: 'Clases' },
    { id: 'tareas', label: 'Tareas' },
    { id: 'matricula', label: 'Matrícula' },
  ];

  const estudianteMenuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'clases', label: 'Clases' },
    { id: 'tareas', label: 'Tareas' },
    { id: 'prueba', label: 'Evaluación' },
  ];

  const menuItems = isProfesor ? profesorMenuItems : estudianteMenuItems;

  // Colores según el rol
  const colors = isProfesor 
    ? {
        bg: 'bg-[#d97706]',
        bgRaw: '#d97706',
        hover: 'bg-[#ea580c]',
        hoverRaw: '#ea580c',
        border: 'border-[#ea580c]',
        borderRaw: '#ea580c',
        underline: 'from-blue-500 via-blue-600 to-blue-700'
      }
    : {
        bg: 'bg-[#003d7a]',
        bgRaw: '#003d7a',
        hover: 'bg-[#004a94]',
        hoverRaw: '#004a94',
        border: 'border-[#004a94]',
        borderRaw: '#004a94',
        underline: 'from-orange-400 via-orange-500 to-yellow-500'
      };

  return (
    <nav className={`${colors.bg} rounded-lg shadow-lg overflow-hidden`}>
      {/* Desktop: Horizontal Menu */}
      <div className="hidden sm:flex items-stretch">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              relative flex-1 px-4 md:px-6 py-3 md:py-3.5 text-white font-medium text-sm md:text-base
              transition-all duration-200
              ${activeSection === item.id 
                ? '' 
                : colors.hover
              }
              ${index !== menuItems.length - 1 ? colors.border + ' border-r' : ''}
            `}
            style={{
              backgroundColor: activeSection === item.id ? colors.bgRaw : undefined
            }}
          >
            <span className="relative z-10">{item.label}</span>
            
            {/* Subrayado horizontal en desktop */}
            {activeSection === item.id && (
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.underline}`}></div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile: Vertical Menu */}
      <div className="sm:hidden flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              relative px-4 py-3.5 text-white font-medium text-base text-left
              transition-all duration-200
              ${activeSection === item.id 
                ? '' 
                : colors.hover
              }
              ${index !== menuItems.length - 1 ? colors.border + ' border-b' : ''}
            `}
            style={{
              backgroundColor: activeSection === item.id ? colors.bgRaw : undefined
            }}
          >
            <span className="relative z-10">{item.label}</span>
            
            {/* Subrayado vertical en móvil */}
            {activeSection === item.id && (
              <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${colors.underline}`}></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;