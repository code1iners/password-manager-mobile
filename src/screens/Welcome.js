import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import WelcomeHeader from "../components/auth/WelcomeHeader";

import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authTabVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { SIGN_IN_TAB, SIGN_UP_TAB } from "../utils/constants";

const Container = styled.View`
  margin-top: 40px;
  padding: 30px;
`;

const Welcome = () => {
  const authTab = useReactiveVar(authTabVar);
  const onHeaderSignInClick = () => {
    authTabVar(SIGN_IN_TAB);
  };
  const onHeaderSignUpClick = () => {
    authTabVar(SIGN_UP_TAB);
  };

  return (
    <KeyboardAwareScrollView>
      <StatusBar hidden={true} />
      <Container>
        {/* header */}
        <WelcomeHeader
          selectedTab={authTab}
          onSignInClick={onHeaderSignInClick}
          onSignUpClick={onHeaderSignUpClick}
        />

        {authTab === SIGN_IN_TAB ? <SignIn /> : <SignUp />}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Welcome;
