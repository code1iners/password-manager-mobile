import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import useMe from "../../../../hooks/useMe";
import HeaderRightTextButton from "../../../../components/shared/HeaderRightTextButton";
import ProfileUpdateHeader from "./ProfileUpdateHeader";
import ProfileUpdateBody from "./ProfileUpdateBody";
import InputWithLabel from "../../../../components/shared/InputWithLabel";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { onNext } from "../../../../hooks/useFocus";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "extract-files";
import { Alert } from "react-native";

const Body = styled.ScrollView``;

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $username: String
    $email: String
    $password: String
    $avatar: Upload
  ) {
    updateProfile(
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    ) {
      ok
      error
      data {
        username
        email
        avatar
      }
    }
  }
`;

const ProfileUpdateScreen = ({ route: { params }, navigation }) => {
  const me = useMe();

  const [updateProfileMutation, { loading: updateProfileLoading }] =
    useMutation(UPDATE_PROFILE_MUTATION);

  const { getValues, setValue, watch, register, handleSubmit } = useForm();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const updateProfile = (cache, { data: { updateProfile } }) => {
    const {
      data: { username, email, avatar },
    } = updateProfile;
    cache.modify({
      id: `User:${me?.id}`,
      fields: {
        username() {
          if (username) return username;
        },
        email() {
          if (email) return email;
        },
        avatar() {
          if (avatar) return avatar;
        },
      },
    });
  };

  const onDoneClick = async () => {
    const username = getValues("username");
    const email = getValues("email");
    const password = getValues("password");
    let avatar;
    if (params?.selectedPhoto) {
      avatar = new ReactNativeFile({
        uri: params?.selectedPhoto,
        type: "image/jpeg",
        name: "profile",
      });
    }

    if (!updateProfileLoading) {
      const {
        data: {
          updateProfile: { ok, error },
        },
      } = await updateProfileMutation({
        variables: {
          username,
          email,
          ...(password && { password }),
          ...(avatar && { avatar }),
        },
        update: updateProfile,
      });

      if (ok) {
        Alert.alert("Profile Update", "Profile edit was successful!");
      } else {
        Alert.alert("Profile Update", error);
      }
    }
  };

  // Edit end.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightTextButton text="Done" onPress={onDoneClick} />
      ),
    });
  }, [params]);
  const onAvatarEditClick = () =>
    navigation.navigate("SelectPhoto", { from: "ProfileUpdateScreen" });
  // Edit end.

  // Form start.
  useEffect(() => {
    register("username");
    register("email");

    setValue("username", me?.username);
    setValue("email", me?.email);
  }, [register]);
  // Form end.

  return (
    <KeyboardAwareScrollView
      style={{
        padding: 10,
      }}
      extraScrollHeight={-60}
      extraHeight={-60}
    >
      {/* Header */}
      <ProfileUpdateHeader
        onAvatarEditClick={onAvatarEditClick}
        selectedPhoto={params?.selectedPhoto}
        avatar={me?.avatar}
      />

      {/* Body */}

      <Body>
        <InputWithLabel
          reference={usernameRef}
          iconName="md-document-outline"
          iconSize={18}
          returnKeyType="next"
          label="Username"
          placeholder="Enter username?.."
          onChangeText={(text) => setValue("username", text)}
          value={watch("username")}
          onSubmitEditing={() => onNext(emailRef)}
        />

        <InputWithLabel
          reference={emailRef}
          iconName="at-outline"
          iconSize={18}
          returnKeyType="next"
          label="Email"
          placeholder="Enter email.."
          onChangeText={(text) => setValue("email", text)}
          value={watch("email")}
          hasTopComponent={true}
          onSubmitEditing={() => onNext(passwordRef)}
        />

        <InputWithLabel
          reference={passwordRef}
          iconName="lock-closed-outline"
          iconSize={18}
          returnKeyType="done"
          label="Password"
          placeholder="Enter password.."
          onChangeText={(text) => setValue("password", text)}
          value={watch("password")}
          hasTopComponent={true}
          onSubmitEditing={handleSubmit(onDoneClick)}
        />
      </Body>
    </KeyboardAwareScrollView>
  );
};

export default ProfileUpdateScreen;
