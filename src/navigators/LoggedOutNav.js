import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { STACK_WELCOME } from "../constants";
import Welcome from "../screens/Welcome";

const Stack = createStackNavigator();

const LoggedOutNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={STACK_WELCOME}
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedOutNav;
