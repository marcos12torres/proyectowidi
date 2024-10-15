import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importa tu contexto de autenticación
import HomeScreen from './inicio';   // Pantalla de inicio
import LoginScreen from './Login'; // Pantalla de login

const AppRouter: React.FC = () => {
  const { user } = useAuth(); // Verifica si el usuario está autenticado

  return (
    <Router>
      <Switch>
        {/* Ruta protegida: si el usuario está autenticado, va a HomeScreen */}
        <Route path="/home">
          {user ? <HomeScreen /> : <Redirect to="/login" />}
        </Route>

        {/* Ruta para login: si está autenticado, lo redirige a HomeScreen */}
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <LoginScreen />}
        </Route>

        {/* Redirige cualquier otra ruta a /login */}
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
