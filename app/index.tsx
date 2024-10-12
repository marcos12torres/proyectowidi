import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/*import App from './Navigation';
import MyTabs from './Navigation';
import Nav from './Navigation';*/
import Inicio from './inicio';
import App from './Navigation';

  /*Login from './Login';*/

  const Stack = createNativeStackNavigator();
/*
import Login from './Login';
const Stack = createNativeStackNavigator();
*/

const IndexScreen: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IndexScreen;





