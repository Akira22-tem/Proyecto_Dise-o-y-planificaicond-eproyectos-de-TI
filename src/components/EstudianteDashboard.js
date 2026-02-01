import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import EstudianteInicio from '../pages/EstudianteInicio';
import EstudianteTareas from '../pages/EstudianteTareas';
import Clases from '../pages/Clases';
import Evaluacion from '../pages/Evaluacion';

const EstudianteDashboard = ({ user, onLogout, tareas, setTareas }) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return <EstudianteInicio tareas={tareas} />;
      case 'tareas':
        return <EstudianteTareas tareas={tareas} setTareas={setTareas} />;
      case 'clases':
        return <Clases />;
      case 'prueba':
        return <Evaluacion />;
      default:
        return <EstudianteInicio tareas={tareas} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={onLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            isProfesor={false}
          />

          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EstudianteDashboard;
