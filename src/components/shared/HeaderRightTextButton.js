import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../utils/colors";

const HeaderRightButtonText = styled.Text`
  color: ${colors.blue};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 10px;
`;

const HeaderRightTextButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HeaderRightButtonText>{text}</HeaderRightButtonText>
    </TouchableOpacity>
  );
};

export default HeaderRightTextButton;
