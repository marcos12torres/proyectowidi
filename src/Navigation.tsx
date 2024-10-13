
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


//screens
import Login from "../src/Login/Login";
import Inicio from "../src/inicio";
import AlumnoViewScreen from "../src/Alumnos/AlumnoViewScreen";
import PadresViewScreen from "../src/Padres/PadresViewScreen";
//import alumnoScreen from "./alumnoScreen";

// Crear navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

// Stack para Home
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Inicio"
        component={Inicio}
      />
    </HomeStack.Navigator>
  );
}

// Stack para Settings (configuraciones)
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Login"
        component={Login}
      />
    </SettingsStack.Navigator>
  );
}

// Tabs con dos pantallas: Home y Settings
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
          headerShown: false,  // Ocultar el encabezado del Tab Navigator
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStackScreen} 
        options={{
          headerShown: false,  // Ocultar el encabezado del Tab Navigator
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer que envuelve los Tabs
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">     
        <Drawer.Screen name="Iniciar sesión" component={Login} />
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Planilla de seguimiento1" component={AlumnoViewScreen} />
        <Drawer.Screen name="Planilla de seguimiento2" component={PadresViewScreen} />

    </Drawer.Navigator>

  );
}

// Aplicación principal con Drawer y Tabs
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}



/*

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); 



function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}
//solo puede haber una sola pagina principal.
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MyTabs} />
    </Drawer.Navigator>
  );
} 


function Nav() {
  return ( 
    <NavigationContainer>
      <MyDrawer></MyDrawer>
    </NavigationContainer>
  );
}


export default Nav;
/*
/**/ 

/*
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Inicio"
        component={Inicio}
      />
      
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Login"
        component={Login}
      />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Inicio}       options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#d6eaf8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Tab.Screen name="Settings" component={Login} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
*/