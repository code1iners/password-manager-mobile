import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Fab from "../../components/shared/Fab";

const Container = styled.View`
  flex: 1;
`;

const AccountMainScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Accounts",
    });
  }, []);

  const handleFabClick = () => {
    navigation.navigate("AccountCreateScreen");
  };

  return (
    <Container>
      <View>
        <Text>AccountMainScreen</Text>
      </View>

      <Fab onPress={handleFabClick} />
    </Container>
  );
};

export default AccountMainScreen;
