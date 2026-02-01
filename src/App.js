import React, { useState } from 'react';
import Login from './components/Login';
import ProfesorDashboard from './components/ProfesorDashboard';
import EstudianteDashboard from './components/EstudianteDashboard';
import { MOCK_DATA } from './data/mockData';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tareas, setTareas] = useState(MOCK_DATA.tareas);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === 'profesor') {
    return (
      <ProfesorDashboard 
        user={user} 
        onLogout={handleLogout}
        tareas={tareas}
        setTareas={setTareas}
      />
    );
  }

  return (
    <EstudianteDashboard 
      user={user} 
      onLogout={handleLogout}
      tareas={tareas}
      setTareas={setTareas}
    />
  );
}

export default App;
