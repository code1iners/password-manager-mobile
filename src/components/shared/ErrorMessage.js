import React from "react";
import styled from "styled-components/native";

const Message = styled.Text`
  color: tomato;
  margin-top: 4px;
`;

const ErrorMessage = ({ message }) => {
  return <Message>{message}</Message>;
};

export default ErrorMessage;
