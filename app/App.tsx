import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importa tu contexto de autenticación
import HomeScreen from './inicio';   // Pantalla de inicio
import LoginScreen from './Login'; // Pantalla de login

const AppRouter: React.FC = () => {
  const { user } = useAuth(); // Verifica si el usuario está autenticado

  return (
    <Router>
      <Routes>
        {/* Ruta protegida: si el usuario está autenticado, va a HomeScreen */}
        <Route path="/home" element={user ? <HomeScreen /> : <Navigate to="/login" replace />} />

        {/* Ruta para login: si está autenticado, lo redirige a HomeScreen */}
        <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginScreen />} />

        {/* Redirige cualquier otra ruta a /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;