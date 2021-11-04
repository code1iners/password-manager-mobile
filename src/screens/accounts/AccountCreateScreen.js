import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/shared/InputWithLabel";
import { onNext } from "../../hooks/useFocus";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SimpleButton from "../../components/shared/SimpleButton";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { gql, useMutation } from "@apollo/client";
import useAccount from "../../hooks/useAccount";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const AccountCreateScreen = ({ navigation }) => {
  const { register, watch, handleSubmit, setValue, getValues } = useForm();
  const [titleError, setTitleError] = useState("");
  const [subtitleError, setSubtitleError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");

  const { createAccount } = useAccount();

  const titleRef = useRef();
  const subtitleRef = useRef();
  const accountNameRef = useRef();
  const passwordRef = useRef();
  const thumbnailRef = useRef();

  // Clear error messages.
  const clearErrors = () => {
    setTitleError("");
    setSubtitleError("");
    setAccountNameError("");
    setPasswordError("");
    setThumbnailError("");
  };

  // Clear input data.
  const clearInputs = () => {
    setValue("title", "");
    setValue("subtitle", "");
    setValue("accountName", "");
    setValue("password", "");
    setValue("thumbnail", "");
  };

  // Create account success handler.
  const handleOkClick = async () => navigation.goBack();

  // Handle form submit.
  const handleFormSubmit = () => {
    // Clear errors.
    clearErrors();

    const title = getValues("title");
    const subtitle = getValues("subtitle");
    const accountName = getValues("accountName");
    const password = getValues("password");
    const thumbnail = getValues("thumbnail");

    // Empty text validate.
    if (!title) {
      setTitleError("Title is required.");
      onNext(titleRef);
      return;
    }
    if (!subtitle) {
      setSubtitleError("Subtitle is required.");
      onNext(subtitleRef);
      return;
    }
    if (!accountName) {
      setAccountNameError("AccountName is required.");
      onNext(accountNameRef);
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      onNext(passwordRef);
      return;
    }
    if (!thumbnail) {
      setThumbnailError("Thumbnail is required.");
      onNext(thumbnailRef);
      return;
    }

    onValid({
      title,
      subtitle,
      accountName,
      password,
      thumbnail,
    });
  };

  /**
   * ### Create account when input valid.
   * @param {String} title > Account title.
   * @param {String} subtitle > Account subtitle.
   * @param {String} accountName > Account accountName.
   * @param {String} password > Account password.
   * @param {String} thumbnail > Account thumbnail.
   */
  const onValid = async ({
    title,
    subtitle,
    accountName,
    password,
    thumbnail,
  }) => {
    const { ok, error } = await createAccount({
      title,
      subtitle,
      accountName,
      password,
      thumbnail,
    });

    if (ok) {
      clearInputs();
      Alert.alert("Success", "Created a new account.", [
        {
          text: "OK",
          onPress: handleOkClick,
        },
      ]);
    } else {
      Alert.alert("Failure", error);
    }
  };

  useEffect(() => {
    register("title", {
      required: true,
    });
    register("subtitle", {
      required: true,
    });
    register("accountName", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("thumbnail", {
      required: true,
    });
  }, []);

  return (
    <KeyboardAwareScrollView extraScrollHeight={-80} extraHeight={-80}>
      <Container>
        {/* Title */}
        <InputWithLabel
          reference={titleRef}
          label="Title"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter title.."
          returnKeyType="next"
          value={watch("title")}
          onChangeText={(text) => setValue("title", text)}
          onSubmitEditing={() => onNext(subtitleRef)}
        />

        {/* Title error message */}
        <ErrorMessage message={titleError} />

        {/* Subtitle */}
        <InputWithLabel
          reference={subtitleRef}
          label="Subtitle"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter subtitle.."
          returnKeyType="next"
          value={watch("subtitle")}
          onChangeText={(text) => setValue("subtitle", text)}
          onSubmitEditing={() => onNext(accountNameRef)}
          hasTopComponent={true}
        />

        {/* SubtitleError error message */}
        <ErrorMessage message={subtitleError} />

        {/* Account Name */}
        <InputWithLabel
          reference={accountNameRef}
          label="Account Name"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter account name.."
          returnKeyType="next"
          value={watch("accountName")}
          onChangeText={(text) => setValue("accountName", text)}
          onSubmitEditing={() => onNext(passwordRef)}
          hasTopComponent={true}
        />

        {/* AccountNameError error message */}
        <ErrorMessage message={accountNameError} />

        {/* Password */}
        <InputWithLabel
          reference={passwordRef}
          label="Password"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter password.."
          returnKeyType="next"
          value={watch("password")}
          onChangeText={(text) => setValue("password", text)}
          onSubmitEditing={() => onNext(thumbnailRef)}
          hasTopComponent={true}
          isPassword={true}
        />

        {/* PasswordError error message */}
        <ErrorMessage message={passwordError} />

        {/* Thumbnail */}
        <InputWithLabel
          reference={thumbnailRef}
          label="Thumbnail"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter thumbnail.."
          returnKeyType="done"
          value={watch("thumbnail")}
          onChangeText={(text) => setValue("thumbnail", text)}
          onSubmitEditing={handleFormSubmit}
          hasTopComponent={true}
        />

        {/* ThumbnailError error message */}
        <ErrorMessage message={thumbnailError} />

        <SimpleButton buttonText="Create Account" onPress={handleFormSubmit} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default AccountCreateScreen;
