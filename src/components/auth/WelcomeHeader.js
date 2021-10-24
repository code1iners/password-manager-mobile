import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

// header start.
const Header = styled.View``;
const HeaderButtonContainer = styled.View`
  flex-direction: row;
`;
const HeaderButton = styled.TouchableOpacity`
  margin-right: 10px;
`;
const ScreenTitle = styled.Text`
  margin-top: 25px;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 2px;
`;
// header end.

const WelcomeHeader = ({ onSignInClick, onSignUpClick }) => {
  return (
    <Header>
      <HeaderButtonContainer>
        <HeaderButton onPress={onSignInClick}>
          <Text>Sign In</Text>
        </HeaderButton>

        <HeaderButton onPress={onSignUpClick}>
          <Text>Sign In</Text>
        </HeaderButton>
      </HeaderButtonContainer>

      <ScreenTitle>Welcome</ScreenTitle>
    </Header>
  );
};

export default WelcomeHeader;
