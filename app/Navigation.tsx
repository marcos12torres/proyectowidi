import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

//screens
import Login from "./Login";



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); 



function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

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