import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import SignUpBody from "../../components/auth/signUp/SignUpBody";

const Container = styled.View``;

const SignUp = () => {
  return (
    <Container>
      <SignUpBody />
    </Container>
  );
};

export default SignUp;
