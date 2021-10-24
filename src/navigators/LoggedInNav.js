import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { userSignOut } from "../hooks/useAuth";

const LoggedInNavContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const TextText = styled.Text`
  color: black;
`;

const LoggedInNav = () => {
  const onSignOut = () => {
    userSignOut();
  };

  return (
    <LoggedInNavContainer>
      <TextText>Logged in nav</TextText>
      <TouchableOpacity onPress={onSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </LoggedInNavContainer>
  );
};

export default LoggedInNav;
