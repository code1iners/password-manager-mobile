import React, { useState } from "react";
import styled from "styled-components/native";
import { SIGN_IN_TAB, SIGN_UP_TAB } from "../constants";
import WelcomeHeader from "../components/auth/WelcomeHeader";

import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  margin-top: 40px;
  padding: 30px;
`;

const Welcome = () => {
  const [tab, setTab] = useState(SIGN_IN_TAB);
  const onHeaderSignInClick = () => {
    setTab(SIGN_IN_TAB);
  };
  const onHeaderSignUpClick = () => {
    setTab(SIGN_UP_TAB);
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        {/* header */}
        <WelcomeHeader
          selectedTab={tab}
          onSignInClick={onHeaderSignInClick}
          onSignUpClick={onHeaderSignUpClick}
        />

        {tab === SIGN_IN_TAB ? <SignIn /> : <SignUp />}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Welcome;
