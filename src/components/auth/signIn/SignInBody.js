import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import InputWithLabel from "../../shared/InputWithLabel";
import SimpleButton from "../../shared/SimpleButton";

const Container = styled.View``;

const ForgotPasswordWrapper = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;
const ForgotPasswordText = styled.Text`
  color: gray;
`;

const SignInBody = () => {
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

      {/* Password */}
      <InputWithLabel
        label="Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter password.."
        textContentType="password"
        isPassword={true}
        hasTopComponent={true}
        returnKeyType="done"
      />

      {/* Forget password */}
      <ForgotPasswordWrapper>
        <ForgotPasswordText>Forget password?</ForgotPasswordText>
      </ForgotPasswordWrapper>

      {/* Button */}
      <SimpleButton buttonText="Sign In" />
    </Container>
  );
};

export default SignInBody;
