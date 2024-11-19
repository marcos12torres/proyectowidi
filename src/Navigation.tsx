import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../src/Login/Login';
import Inicio from '../src/inicio';
import AlumnoScreen from '../src/Alumnos/AlumnoScreen'
import PadresViewScreen from './Padres/PadresViewScreen';

const Drawer = createDrawerNavigator();

// Definimos los tipos para los parámetros de navegación
export type RootDrawerParamList = {
  Home: undefined;
  Iniciar: undefined;
  Inicio: undefined;
  'Pantalla del alumno': { alumnoId: string };
  'Pantalla que ve el padre': undefined;
};

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Iniciar" 
        component={Login} 
      />
      <Drawer.Screen 
        name="Inicio" 
        component={Inicio} 
      />
      <Drawer.Screen 
        name="Pantalla del alumno" 
        component={AlumnoScreen}
        options={{
          unmountOnBlur: true // Esto asegura que el componente se desmonte al cambiar de pantalla
        }}
      />
      <Drawer.Screen 
        name="Pantalla que ve el padre" 
        component={PadresViewScreen} 
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;