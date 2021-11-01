import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ProfileScreen from "../screens/settings/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

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
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons
              style={{ marginLeft: 10 }}
              color={tintColor}
              name="md-close-sharp"
              size={30}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNav;
