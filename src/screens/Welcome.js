import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import WelcomeHeader from "../components/auth/WelcomeHeader";
import WelcomeBody from "../components/auth/WelcomeBody";

const Container = styled.View`
  margin-top: 40px;
  padding: 30px;
`;

const Welcome = () => {
  const onHeaderSignInClick = (e) => {
    console.log("onHeaderSignInClick");
  };
  const onHeaderSignUpClick = () => {
    console.log("onSignUpClick");
  };

  return (
    <Container>
      {/* header */}
      <WelcomeHeader
        onSignInClick={onHeaderSignInClick}
        onSignUpClick={onHeaderSignUpClick}
      />

      {/* body */}
      <WelcomeBody />

      {/* footer */}
    </Container>
  );
};

export default Welcome;
