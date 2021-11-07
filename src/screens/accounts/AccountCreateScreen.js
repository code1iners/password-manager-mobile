import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/shared/InputWithLabel";
import { onNext } from "../../hooks/useFocus";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SimpleButton from "../../components/shared/SimpleButton";
import ErrorMessage from "../../components/shared/ErrorMessage";
import useAccount from "../../hooks/useAccount";
import { wasAccountCreatedVar } from "../../../apollo";

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
    setValue("accountPassword", "");
    setValue("thumbnail", "");
  };

  // Create account success handler.
  const handleOkClick = () => navigation.goBack();

  // Handle form submit.
  const handleFormSubmit = () => {
    // Clear errors.
    clearErrors();

    const title = getValues("title");
    const subtitle = getValues("subtitle");
    const accountName = getValues("accountName");
    const accountPassword = getValues("accountPassword");
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
      setAccountNameError("Account name is required.");
      onNext(accountNameRef);
      return;
    }
    if (!accountPassword) {
      setPasswordError("Account Password is required.");
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
      accountPassword,
      thumbnail,
    });
  };

  /**
   * ### Create account when input valid.
   * @param {String} title > Account title.
   * @param {String} subtitle > Account subtitle.
   * @param {String} accountName > Account accountName.
   * @param {String} accountPassword > Account accountPassword.
   * @param {String} thumbnail > Account thumbnail.
   */
  const onValid = async ({
    title,
    subtitle,
    accountName,
    accountPassword,
    thumbnail,
  }) => {
    const newAccount = await createAccount({
      title,
      subtitle,
      accountName,
      accountPassword,
      thumbnail,
    });

    if (newAccount) {
      clearInputs();
      Alert.alert("Success", "You have successfully created a new account.", [
        {
          text: "OK",
          onPress: handleOkClick,
        },
      ]);
    } else {
      Alert.alert("Failure", "Failed to create new account.");
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
    register("accountPassword", {
      required: true,
    });
    register("thumbnail", {
      required: true,
    });

    titleRef?.current.focus();
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

        {/* Subtitle error message */}
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

        {/* Account name error message */}
        <ErrorMessage message={accountNameError} />

        {/* Password */}
        <InputWithLabel
          reference={passwordRef}
          label="Account Password"
          iconName="at-outline"
          iconSize={18}
          placeholder="Enter account password.."
          returnKeyType="next"
          value={watch("accountPassword")}
          onChangeText={(text) => setValue("accountPassword", text)}
          onSubmitEditing={() => onNext(thumbnailRef)}
          hasTopComponent={true}
          isPassword={true}
        />

        {/* Account password error message */}
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

        {/* Thumbnail error message */}
        <ErrorMessage message={thumbnailError} />

        <SimpleButton buttonText="Create Account" onPress={handleFormSubmit} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default AccountCreateScreen;