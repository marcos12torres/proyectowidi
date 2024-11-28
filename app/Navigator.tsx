import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InicioScreen from './inicio';
import Login from './Login';
import AlumnoViewScreen from './AlumnosViewScreen';
import PadresViewScreen from './PadresViewScreen';
import alumnoScreen from './alumnoScreen';
import Singup from './singup';
import Roles from './Roles'; // Importar la nueva pantalla de Roles

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: true,
        }}
      >   
        <Drawer.Screen name="Iniciar sesión" component={Login} />
        <Drawer.Screen name="Inicio" component={InicioScreen} />
        <Drawer.Screen name="Planilla de seguimiento1" component={AlumnoViewScreen} />
        <Drawer.Screen name="Planilla de seguimiento2" component={PadresViewScreen} />
        <Drawer.Screen name="Profesor" component={alumnoScreen} />
        <Drawer.Screen name="Registro" component={Singup} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}