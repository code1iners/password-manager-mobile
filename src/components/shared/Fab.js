import React, { useEffect, useRef, useState } from "react";
import styled, { keyframe } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { Animated, TouchableOpacity } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { isShownAccountsFabVar } from "../../../apollo";

const Container = styled.View`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;
const Fab = ({ onPress, isClicked }) => {
  const isShown = useReactiveVar(isShownAccountsFabVar);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation default options.
  const options = {
    duration: 300,
    useNativeDriver: true,
  };

  useEffect(() => {
    // Fab container display control.
    // Control by accounts list scrolling.
    // isShown is true = Display, isShown is false > Not display.
    Animated.timing(fadeAnim, {
      ...options,
      toValue: isShown ? 1 : 0,
    }).start();
  }, [isShown]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <Container isClicked={isClicked} isShown={isShown}>
        <TouchableOpacity onPress={onPress}>
          <Ionicons
            style={{
              marginLeft: 4,
            }}
            name="add"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </Container>
    </Animated.View>
  );
};

export default Fab;
