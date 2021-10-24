import React from "react";
import styled from "styled-components/native";
import InputWithLabel from "../../shared/InputWithLabel";
import SimpleButton from "../../shared/SimpleButton";

const Container = styled.View``;

const SignUpBody = () => {
  return (
    <Container>
      {/* Email */}
      <InputWithLabel
        label="Email"
        iconName="at-outline"
        iconSize={18}
        placeholder="Enter email.."
        textContentType="emailAddress"
        returnKeyType="next"
      />

      {/* Username */}
      <InputWithLabel
        label="Username"
        iconName="person-outline"
        iconSize={18}
        placeholder="Enter username.."
        returnKeyType="next"
        hasTopComponent={true}
      />

      {/* Password */}
      <InputWithLabel
        label="Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter password.."
        textContentType="newPassword"
        isPassword={true}
        hasTopComponent={true}
        returnKeyType="next"
      />

      {/* Confirm password */}
      <InputWithLabel
        label="Confirm Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter confirm password.."
        textContentType="newPassword"
        isPassword={true}
        hasTopComponent={true}
        returnKeyType="done"
      />

      <SimpleButton buttonText="Sign Up" />
    </Container>
  );
};

export default SignUpBody;
