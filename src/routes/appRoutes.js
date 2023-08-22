import { createDrawerNavigator } from '@react-navigation/drawer';

import React from "react";

import Home from '../pages/Home';

const AppStack = createDrawerNavigator();

export default function AppRoutes() {
    return(
        <AppStack.Navigator>
          <AppStack.Screen
           name="Home"
           component={Home}
          >
          </AppStack.Screen>
        </AppStack.Navigator>
    );

}