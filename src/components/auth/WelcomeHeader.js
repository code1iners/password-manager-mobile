import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import colors from "../../colors";
import { SIGN_IN_TAB, SIGN_UP_TAB } from "../../constants";

// header start.
const Header = styled.View`
  margin-bottom: 40px;
`;
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

const ButtonText = styled.Text`
  color: ${(props) => (props.selectedTab ? colors.secondary : "black")};
  font-weight: ${(props) => (props.selectedTab ? "600" : "500")};
`;
// header end.

const WelcomeHeader = ({ selectedTab, onSignInClick, onSignUpClick }) => {
  return (
    <Header>
      <HeaderButtonContainer>
        <HeaderButton onPress={onSignInClick}>
          <ButtonText selectedTab={selectedTab === SIGN_IN_TAB}>
            Sign In
          </ButtonText>
        </HeaderButton>

        <HeaderButton onPress={onSignUpClick}>
          <ButtonText selectedTab={selectedTab === SIGN_UP_TAB}>
            Sign Up
          </ButtonText>
        </HeaderButton>
      </HeaderButtonContainer>

      <ScreenTitle>Welcome</ScreenTitle>
    </Header>
  );
};

export default WelcomeHeader;
