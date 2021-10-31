import React from "react";
import styled from "styled-components/native";
import { View, Text, Alert } from "react-native";
import { userSignOut } from "../../hooks/useAuth";

const Container = styled.View`
  flex: 1;
`;

const Row = styled.TouchableOpacity`
  background-color: white;
  padding: 20px;
`;
const RowText = styled.Text`
  font-size: 18px;
  letter-spacing: 1.5px;
`;

const SettingsScreen = () => {
  const handleSignOutOk = async () => {
    await userSignOut();
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure Sign out?", [
      {
        text: "OK",
        onPress: handleSignOutOk,
        style: "destructive",
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return (
    <Container>
      <Row>
        <RowText>Profile</RowText>
      </Row>

      <Row onPress={handleSignOut}>
        <RowText>Sign Out</RowText>
      </Row>
    </Container>
  );
};

export default SettingsScreen;
