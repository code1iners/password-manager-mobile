import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ProfileScreen from "../screens/settings/profile/ProfileScreen";
import SelectPhoto from "../components/shared/SelectPhoto";
import ProfileUpdateScreen from "../screens/settings/profile/profileUpdate/ProfileUpdateScreen";

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "Settings",
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ProfileUpdateScreen"
        component={ProfileUpdateScreen}
        options={{
          title: "Profile Update",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={{
          title: "Select Photo",
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNav;
