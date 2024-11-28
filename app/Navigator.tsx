import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Roles from './Roles';
import AlumnoViewScreen from './AlumnosViewScreen';
import PadresViewScreen from './PadresViewScreen';
import alumnoScreen from './alumnoScreen';

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Iniciar sesión"
        screenOptions={{
          headerShown: true,
        }}
      >     
        <Drawer.Screen name="Iniciar sesión" component={Login} />
        <Drawer.Screen 
          name="Seleccionar Rol" // Este es el nombre que aparecerá en el drawer
          component={Roles}      // Este es el componente que se renderizará
          options={{
            headerTitle: 'Selección de Rol'
          }}
        />
        <Drawer.Screen name="Planilla de seguimiento1" component={AlumnoViewScreen} />
        <Drawer.Screen name="Planilla de seguimiento2" component={PadresViewScreen} />
        <Drawer.Screen name="Profesor" component={alumnoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}