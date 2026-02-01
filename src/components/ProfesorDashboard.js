import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProfesorInicio from '../pages/ProfesorInicio';
import ProfesorTareas from '../pages/ProfesorTareas';
import Clases from '../pages/ProfesorClases';
import ProfesorClases from '../pages/ProfesorClases';

const ProfesorDashboard = ({ user, onLogout, tareas, setTareas }) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return <ProfesorInicio tareas={tareas} />;
      case 'tareas':
        return <ProfesorTareas tareas={tareas} setTareas={setTareas} />;
      case 'clases':
        return <ProfesorClases />;
      default:
        return <ProfesorInicio tareas={tareas} />;
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
            isProfesor={true}
          />

          <main className="flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default ProfesorDashboard;
