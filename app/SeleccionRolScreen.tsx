import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Inicio from './inicio';
import PantallaProfesor from './PantallaProfesor';
import alumnoScreen from './alumnoScreen';

const Stack = createStackNavigator();

const SeleccionRolScreen = ({ navigation }) => {
  const handleSeleccionarRol = (rol) => {
    if (rol === 'profesor') {
      navigation.navigate('PantallaProfesor');
    } else if (rol === 'alumno') {
      navigation.navigate('alumnoScreen');
    }
  };

  return (
    <View>
      <Button title="Profesor" onPress={() => handleSeleccionarRol('profesor')} />
      <Button title="Alumno" onPress={() => handleSeleccionarRol('alumno')} />
    </View>
  );
};

export default SeleccionRolScreen;

/*  return (
    <View>
      <Button title="Profesor" onPress={() => handleSeleccionarRol('profesor')} />
      <Button title="Alumno" onPress={() => handleSeleccionarRol('alumno')} />
    </View>
  );
};

const IndexScreen: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="SeleccionRol" component={SeleccionRolScreen} />
        <Stack.Screen name="PantallaProfesor" component={PantallaProfesor} />
        <Stack.Screen name="alumnoScreen" component={alumnoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IndexScreen;