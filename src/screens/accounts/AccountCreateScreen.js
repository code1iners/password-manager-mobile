import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert, Keyboard, Text } from "react-native";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/shared/InputWithLabel";
import { onNext } from "../../hooks/useFocus";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SimpleButton from "../../components/shared/SimpleButton";
import ErrorMessage from "../../components/shared/ErrorMessage";
import useAccount, { CREATE_ACCOUNT_MUTATION } from "../../hooks/useAccount";
import colors from "../../utils/colors";
import { ReactNativeFile } from "extract-files";
import { useMutation } from "@apollo/client";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const SelectPhotoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SelectPhotoButton = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  flex: 1;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const SelectPhotoText = styled.Text`
  color: white;
  letter-spacing: 2px;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
`;
const SelectPhotoImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 6px;
  margin-right: 20px;
`;

const AccountCreateScreen = ({ route, navigation }) => {
  const { register, watch, handleSubmit, setValue, getValues } = useForm();
  const [titleError, setTitleError] = useState("");
  const [subtitleError, setSubtitleError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { selectedPhoto } = route.params || {};

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION
  );

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
  };

  // Clear input data.
  const clearInputs = () => {
    setValue("title", "");
    setValue("subtitle", "");
    setValue("accountName", "");
    setValue("accountPassword", "");
  };

  // Create account success handler.
  const handleOkClick = () => navigation.navigate("AccountMainScreen");

  const handleSelectPhotoClick = () => {
    navigation.navigate("SelectPhoto", { from: "AccountCreateScreen" });
  };

  // Handle form submit.
  const handleFormSubmit = () => {
    // Clear errors.
    clearErrors();

    const title = getValues("title");
    const subtitle = getValues("subtitle");
    const accountName = getValues("accountName");
    const accountPassword = getValues("accountPassword");
    let thumbnail;
    if (selectedPhoto) {
      thumbnail = new ReactNativeFile({
        uri: selectedPhoto,
        name: `${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }

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

    onValid({
      title,
      subtitle,
      accountName,
      accountPassword,
      ...(thumbnail && { thumbnail }),
    });
  };

  const updateUploadAccount = (cache, result) => {
    const {
      data: { createAccount },
    } = result;
    if (createAccount.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          accounts(previous) {
            return [createAccount, ...previous];
          },
        },
      });

      clearInputs();
      Alert.alert("Success", "You have successfully created a new account.", [
        {
          text: "OK",
          onPress: handleOkClick,
        },
      ]);
    } else {
      Alert.alert("Failure", "Failed created a new account.");
    }
  };

  /**
   * ### Create account when input valid.
   * @param {String} title > Account title.
   * @param {String} subtitle > Account subtitle.
   * @param {String} accountName > Account accountName.
   * @param {String} accountPassword > Account accountPassword.
   * @param {String} thumbnail > Account thumbnail.
   */
  const onValid = ({
    title,
    subtitle,
    accountName,
    accountPassword,
    thumbnail,
  }) => {
    createAccountMutation({
      variables: {
        title,
        subtitle,
        accountName,
        accountPassword,
        thumbnail,
      },
      update: updateUploadAccount,
    });
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

    setTimeout(() => {
      titleRef?.current.focus();
    }, 10);
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
          returnKeyType="done"
          value={watch("accountPassword")}
          onChangeText={(text) => setValue("accountPassword", text)}
          onSubmitEditing={() => passwordRef?.current?.blur()}
          hasTopComponent={true}
        />

        {/* Account password error message */}
        <ErrorMessage message={passwordError} />

        {/* Thumbnail */}
        <SelectPhotoContainer>
          {selectedPhoto ? (
            <SelectPhotoImage
              source={{
                uri: selectedPhoto,
              }}
            />
          ) : null}

          <SelectPhotoButton
            ref={thumbnailRef}
            hasImage={selectedPhoto}
            onPress={handleSelectPhotoClick}
          >
            <SelectPhotoText>Select photo</SelectPhotoText>
          </SelectPhotoButton>
        </SelectPhotoContainer>

        <SimpleButton buttonText="Create Account" onPress={handleFormSubmit} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default AccountCreateScreen;
