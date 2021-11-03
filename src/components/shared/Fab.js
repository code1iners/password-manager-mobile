import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { TouchableOpacity } from "react-native";

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
  return (
    <Container isClicked={isClicked}>
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
  );
};

export default Fab;
