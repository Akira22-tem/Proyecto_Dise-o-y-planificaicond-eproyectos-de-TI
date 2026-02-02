import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProfesorInicio from '../pages/ProfesorInicio';
import ProfesorTareas from '../pages/ProfesorTareas';
import ProfesorMatricula from '../pages/ProfesorMatricula';
import ProfesorClases from '../pages/ProfesorClases';
import { MOCK_DATA } from '../data/mockData';

const ProfesorDashboard = ({ user, onLogout, tareas, setTareas }) => {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return <ProfesorInicio tareas={tareas} />;
      case 'tareas':
        return <ProfesorTareas tareas={tareas} setTareas={setTareas} />;
      case 'clases':
        return <ProfesorClases />;
      case 'matricula':
        return <ProfesorMatricula estudiantes={MOCK_DATA.estudiantes} />;
      default:
        return <ProfesorInicio tareas={tareas} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isProfesor={true}
        />

        <main className="mt-4 sm:mt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ProfesorDashboard;