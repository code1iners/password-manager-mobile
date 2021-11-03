import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/shared/TabIcon";
import SettingsNav from "./SettingsNav";
import AccountNav from "./AccountNav";

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
        name="AccountNav"
        component={AccountNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="document-text" focused={focused} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingNav"
        component={SettingsNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="settings" focused={focused} size={28} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default LoggedInNav;
