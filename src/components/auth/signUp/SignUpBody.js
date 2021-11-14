import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import ErrorMessage from "../../shared/ErrorMessage";
import InputWithLabel from "../../shared/InputWithLabel";
import SimpleButton from "../../shared/SimpleButton";
import { gql, useMutation } from "@apollo/client";
import {
  ERROR_CODE_EMAIL_ALREADY_EXISTS,
  ERROR_CODE_USERNAME_ALREADY_EXISTS,
  SIGN_IN_TAB,
} from "../../../utils/constants";
import { authTabVar, createdAuth } from "../../../../apollo";

const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $username: String!
    $firstName: String!
    $lastName: String
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const SignUpBody = () => {
  // Forms.
  const { handleSubmit, watch, setValue, getValues } = useForm();

  // Refs.
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // States.
  const [emailError, setEmailError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  // Mutations.
  const onCompleted = ({ signUp: { ok, error } }) => {
    if (ok) {
      authTabVar(SIGN_IN_TAB);
      createdAuth({
        email: getValues("email"),
        password: getValues("password"),
      });
    } else {
      switch (error) {
        case ERROR_CODE_EMAIL_ALREADY_EXISTS:
          setEmailError("The email already exists.");
          break;

        case ERROR_CODE_USERNAME_ALREADY_EXISTS:
          setUsernameError("The username already exists.");
          break;
      }
    }
  };
  const [signUpMutation, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted,
  });

  // Validators.
  const emailIsValid = () => Boolean(watch("email"));
  const usernameIsValid = () => Boolean(watch("username"));
  const firstNameIsValid = () => Boolean(watch("firstName"));
  const passwordIsValid = () => Boolean(watch("password"));
  const confirmPasswordIsValid = () => Boolean(watch("confirmPassword"));
  const passwordIsSame = () => watch("password") === watch("confirmPassword");

  // Methods.
  const onNext = (nextElement) => {
    nextElement?.current?.focus();
  };

  const clearErrorMessages = () => {
    setEmailError("");
    setUsernameError("");
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const onValid = (data) => {
    // Clear error messages.
    clearErrorMessages();

    if (!emailIsValid()) {
      setEmailError("Email is required.");
      return;
    }
    if (!usernameIsValid()) {
      setUsernameError("Username is required.");
      return;
    }
    if (!firstNameIsValid()) {
      setFirstNameError("First name is required.");
      return;
    }
    if (!passwordIsValid()) {
      setPasswordError("Password is required.");
      return;
    }
    if (!confirmPasswordIsValid()) {
      setConfirmPasswordError("Confirm password is required.");
      return;
    }
    if (!passwordIsSame()) {
      setPasswordError("Password and Confirm password is not same.");
      return;
    }

    const { email, username, firstName, lastName, password } = data;

    if (!loading) {
      signUpMutation({
        variables: {
          email,
          username,
          firstName,
          lastName,
          password,
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
        onChangeText={(text) => setValue("email", text)}
        value={watch("email")}
        onSubmitEditing={() => onNext(usernameRef)}
      />
      {/* Email error message */}
      <ErrorMessage message={emailError} />
      {/* Username */}
      <InputWithLabel
        reference={usernameRef}
        label="Username"
        iconName="md-document-outline"
        iconSize={18}
        placeholder="Enter username.."
        returnKeyType="next"
        hasTopComponent={true}
        onChangeText={(text) => setValue("username", text)}
        value={watch("username")}
        onSubmitEditing={() => onNext(firstNameRef)}
      />
      {/* Username error message */}
      <ErrorMessage message={usernameError} />
      {/* First name */}
      <InputWithLabel
        reference={firstNameRef}
        label="First name"
        iconName="md-document-outline"
        iconSize={18}
        placeholder="Enter first name.."
        returnKeyType="next"
        hasTopComponent={true}
        onChangeText={(text) => setValue("firstName", text)}
        value={watch("firstName")}
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      {/* First name error message */}
      <ErrorMessage message={firstNameError} />
      {/* Last name */}
      <InputWithLabel
        reference={lastNameRef}
        label="Last name (Option)"
        iconName="person-outline"
        iconSize={18}
        placeholder="Enter last name.."
        returnKeyType="next"
        hasTopComponent={true}
        onChangeText={(text) => setValue("lastName", text)}
        value={watch("lastName")}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      {/* Last name error message */}
      <ErrorMessage message={lastNameError} />
      {/* Password */}
      <InputWithLabel
        reference={passwordRef}
        label="Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter password.."
        textContentType="newPassword"
        isPassword={true}
        hasTopComponent={true}
        returnKeyType="next"
        onChangeText={(text) => setValue("password", text)}
        value={watch("password")}
        onSubmitEditing={() => onNext(confirmPasswordRef)}
      />
      {/* Password error message */}
      <ErrorMessage message={passwordError} />
      {/* Confirm password */}
      <InputWithLabel
        reference={confirmPasswordRef}
        label="Confirm Password"
        iconName="lock-closed-outline"
        iconSize={18}
        placeholder="Enter confirm password.."
        textContentType="newPassword"
        isPassword={true}
        hasTopComponent={true}
        onChangeText={(text) => setValue("confirmPassword", text)}
        value={watch("confirmPassword")}
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
      />
      {/* Confirm password error message */}
      <ErrorMessage message={confirmPasswordError} />

      {/* Submit button */}
      <SimpleButton
        buttonText="Sign Up"
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
    </Container>
  );
};

export default SignUpBody;
