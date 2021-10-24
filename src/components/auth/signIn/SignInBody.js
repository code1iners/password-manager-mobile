import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import InputWithLabel from "../../shared/InputWithLabel";
import SimpleButton from "../../shared/SimpleButton";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { userSignIn } from "../../../hooks/useAuth";

import {
  ERROR_CODE_SIGN_IN_INCORRECT_PASSWORD,
  ERROR_CODE_SIGN_IN_NOT_FOUND,
} from "../../../constants";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ok
      token
      error
      errorCode
    }
  }
`;

const Container = styled.View``;

const ForgotPasswordWrapper = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;
const ErrorMessage = styled.Text`
  color: tomato;
  margin-top: 4px;
`;
const ForgotPasswordText = styled.Text`
  color: gray;
`;

const SignInBody = () => {
  const { handleSubmit, setValue, watch } = useForm();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const onCompleted = (data) => {
    const {
      signIn: { ok, token, error, errorCode },
    } = data;
    if (ok) {
      userSignIn(token);
    } else {
      switch (errorCode) {
        case ERROR_CODE_SIGN_IN_NOT_FOUND:
          setEmailError(error);
          break;
        case ERROR_CODE_SIGN_IN_INCORRECT_PASSWORD:
          setPasswordError(error);
          break;
      }
    }
  };
  const [loginMutation, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextElement) => {
    nextElement?.current?.focus();
  };

  const onValid = (data) => {
    // Clear error messages.
    setEmailError("");
    setPasswordError("");

    if (!watch("email")) {
      setEmailError("Email is required.");
      return;
    }

    if (!watch("password")) {
      setPasswordError("Password is required.");
      return;
    }

    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

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
        value={watch("email")}
        onChangeText={(text) => setValue("email", text)}
        onSubmitEditing={() => onNext(passwordRef)}
      />

      {/* Email error message */}
      <ErrorMessage>{emailError}</ErrorMessage>

      {/* Password */}
      <InputWithLabel
        reference={passwordRef}
        label="Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter password.."
        textContentType="password"
        isPassword={true}
        hasTopComponent={true}
        returnKeyType="done"
        value={watch("password")}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />

      {/* Password error message */}
      <ErrorMessage>{passwordError}</ErrorMessage>

      {/* Forget password */}
      <ForgotPasswordWrapper>
        <ForgotPasswordText>Forget password?</ForgotPasswordText>
      </ForgotPasswordWrapper>

      {/* Button */}
      <SimpleButton buttonText="Sign In" onPress={handleSubmit(onValid)} />
    </Container>
  );
};

export default SignInBody;
