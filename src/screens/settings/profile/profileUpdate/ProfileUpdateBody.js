import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";

const Container = styled.View`
  margin-top: 10px;
`;

const ProfileUpdateBody = () => {
  return (
    <Container>
      <View>
        <Text>ProfileUpdateBody</Text>
      </View>
    </Container>
  );
};

export default ProfileUpdateBody;
