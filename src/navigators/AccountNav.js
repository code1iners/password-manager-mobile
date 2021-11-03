import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountMainScreen from "../screens/accounts/AccountMainScreen";
import AccountCreateScreen from "../screens/accounts/AccountCreateScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const AccountNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountMainScreen" component={AccountMainScreen} />
      <Stack.Screen
        name="AccountCreateScreen"
        component={AccountCreateScreen}
        options={{
          title: "Account Create",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNav;
