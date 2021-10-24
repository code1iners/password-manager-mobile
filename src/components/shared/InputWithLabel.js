import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  margin-top: ${(props) => (props.hasTopComponent ? "20px" : "0")};
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 6px;
`;

const InputLabel = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
`;

const UsernameInput = styled.TextInput`
  margin-left: 14px;
  height: 30px;
  width: 100%;
  font-size: 18px;
`;

const InputWithLabel = ({
  label,
  iconName,
  iconSize,
  placeholder,
  textContentType = "name",
  isPassword = false,
  hasTopComponent = false,
  returnKeyType = "done",
  onSubmitEditing,
  reference,
  value,
  onChangeText,
  autoCapitalize = "none",
}) => {
  return (
    <Container hasTopComponent={hasTopComponent}>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        <Ionicons name={iconName} size={iconSize} />
        <UsernameInput
          placeholder={placeholder}
          textContentType={textContentType}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          ref={reference}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
        />
      </InputWrapper>
    </Container>
  );
};

export default InputWithLabel;
