import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './AuthContext'; // Importa el contexto de autenticación
import AppRouter from './Navigation'; // Asumiendo que este es el enrutador principal con tus pantallas definidas

const IndexScreen: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <AppRouter />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default IndexScreen;





