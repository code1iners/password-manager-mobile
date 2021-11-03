import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/shared/InputWithLabel";
import { onNext } from "../../hooks/useFocus";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Form = styled.ScrollView``;

const AccountCreateScreen = () => {
  const { handleSubmit, register, watch, setValue } = useForm();
  const onValid = () => {
    console.log("onValid");
  };

  const subtitleRef = useRef();
  const accountNameRef = useRef();
  const passwordRef = useRef();
  const thumbnailRef = useRef();

  useEffect(() => {}, []);

  const onPress = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Form>
          {/* Title */}
          <InputWithLabel
            label="Title"
            iconName="at-outline"
            iconSize={18}
            placeholder="Enter title.."
            returnKeyType="next"
            value={watch("title")}
            onChangeText={(text) => setValue("title", text)}
            onSubmitEditing={() => onNext(subtitleRef)}
          />

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
          />

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
            onSubmitEditing={handleSubmit(onValid)}
            hasTopComponent={true}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AccountCreateScreen;
