import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import InputWithLabel from "../../shared/InputWithLabel";
import SimpleButton from "../../shared/SimpleButton";
import ErrorMessage from "../../shared/ErrorMessage";
import { userSignIn } from "../../../hooks/useAuth";
import {
  ERROR_CODE_INCORRECT_PASSWORD,
  ERROR_CODE_NOT_FOUND,
} from "../../../constants";
import { createdAuth } from "../../../../apollo";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

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
  // Forms.
  const { register, handleSubmit, setValue, watch } = useForm();

  // Refs.
  const passwordRef = useRef();

  // States.
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const createdAuthInfo = useReactiveVar(createdAuth);

  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
    if (createdAuthInfo) {
      setValue("email", createdAuthInfo.email);
      setValue("password", createdAuthInfo.password);
    }
  }, [register, createdAuthInfo]);

  // Mutations.
  const onCompleted = (data) => {
    const {
      signIn: { ok, token, error, errorCode },
    } = data;
    if (ok) {
      // Sign in user.
      userSignIn(token);

      // Created auth clear.
      createdAuth(null);
    } else {
      switch (error) {
        case ERROR_CODE_NOT_FOUND:
          setEmailError("The email does not found.");
          break;
        case ERROR_CODE_INCORRECT_PASSWORD:
          setPasswordError("The password incorrect.");
          break;
      }
    }
  };
  const [signInMutation, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted,
  });

  // Methods.
  const onNext = (nextElement) => {
    nextElement?.current?.focus();
  };

  const clearErrorMessages = () => {
    setEmailError("");
    setPasswordError("");
  };

  const onValid = (data) => {
    // Clear error messages.
    clearErrorMessages();

    if (!watch("email")) {
      setEmailError("Email is required.");
      return;
    }

    if (!watch("password")) {
      setPasswordError("Password is required.");
      return;
    }

    if (!loading) {
      signInMutation({
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
      <ErrorMessage message={emailError} />

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
      <ErrorMessage message={passwordError} />

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
