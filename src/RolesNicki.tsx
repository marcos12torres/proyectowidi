/*import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Inicio from './inicio';
import PantallaProfesor from './PantallaProfesor';
import alumnoScreen from './alumnoScreen';

const Stack = createNativeStackNavigator();

const SeleccionRolScreen = FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
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

export default SeleccionRolScreen;*/