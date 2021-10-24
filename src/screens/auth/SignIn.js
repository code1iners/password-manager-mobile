import React from "react";
import styled from "styled-components/native";
import SignInBody from "../../components/auth/signIn/SignInBody";
import SignInFooter from "../../components/auth/signIn/SignInFooter";

const Container = styled.View``;

const SignIn = () => {
  return (
    <Container>
      {/* Body */}
      <SignInBody />

      {/* Footer */}
      <SignInFooter />
    </Container>
  );
};

export default SignIn;
