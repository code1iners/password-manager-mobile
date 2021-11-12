import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountMainScreen from "../screens/accounts/AccountMainScreen";
import AccountCreateScreen from "../screens/accounts/AccountCreateScreen";
import SelectPhoto from "../components/shared/SelectPhoto";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const AccountNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        pres
        name="AccountMainScreen"
        component={AccountMainScreen}
      />
      <Stack.Screen
        name="AccountCreateScreen"
        component={AccountCreateScreen}
        options={{
          title: "Account Create",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNav;
