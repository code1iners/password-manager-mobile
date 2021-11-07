import React from "react";
import { Text } from "react-native";
import colors from "../../utils/colors";

const GrayText = ({ text, fontWeight, fontSize, letterSpacing = 1.5 }) => {
  return (
    <Text
      style={{
        color: colors.black,
        opacity: 0.4,
        fontSize,
        fontWeight,
        letterSpacing,
      }}
    >
      {text}
    </Text>
  );
};

export default GrayText;
