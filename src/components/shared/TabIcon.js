import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ iconName, focused, size }) => {
  return (
    <Ionicons name={focused ? iconName : `${iconName}-outline`} size={size} />
  );
};

export default TabIcon;
