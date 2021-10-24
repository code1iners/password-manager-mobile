import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  margin-top: 40px;
`;

const OtherWayWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const OtherWayText = styled.Text`
  font-weight: 600;
  letter-spacing: 2px;
  opacity: 0.5;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 20px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
`;

const SignInFooter = () => {
  return (
    <Container>
      {/* Title text */}
      <OtherWayWrapper>
        <OtherWayText>Or Continue with</OtherWayText>
      </OtherWayWrapper>

      {/* Buttons */}
      <ButtonsContainer>
        <ButtonWrapper>
          <Ionicons name="logo-google" size={20} />
          <ButtonText>Google</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <Ionicons name="logo-facebook" size={20} />
          <ButtonText>Facebook</ButtonText>
        </ButtonWrapper>
      </ButtonsContainer>
    </Container>
  );
};

export default SignInFooter;
