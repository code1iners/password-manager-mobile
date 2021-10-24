import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";

const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${colors.primary};
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 2px;
`;

const SimpleButton = ({ buttonText }) => {
  return (
    <ButtonWrapper>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonWrapper>
  );
};

export default SimpleButton;
