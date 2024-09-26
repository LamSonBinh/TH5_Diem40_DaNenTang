import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticatedUserContext } from "../providers";
import { HomeScreen } from "../screens";
import Admin from "../screens/Admin";
const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Admin} />
    </Stack.Navigator>
  );
};
