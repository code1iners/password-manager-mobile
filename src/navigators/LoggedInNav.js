import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountsScreen from "../screens/accounts/AccountsScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import TabIcon from "../components/shared/TabIcon";

const Tab = createBottomTabNavigator();

const LoggedInNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.3)",
        },
      }}
    >
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="document-text" focused={focused} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="settings" focused={focused} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LoggedInNav;
