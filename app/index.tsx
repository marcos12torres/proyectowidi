import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/*import App from './Navigation';
import MyTabs from './Navigation';
import Nav from './Navigation';*/
import Inicio from '../src/inicio';
import App from '../src/Navigation';

/*
import Login from './Login';
const Stack = createNativeStackNavigator();
*/

const IndexScreen: React.FC = () => {
  return (
 <App/>
  );
};

export default IndexScreen;




