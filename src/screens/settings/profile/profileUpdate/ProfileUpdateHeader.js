import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../../../utils/colors";

// Header start.
const Header = styled.View`
  align-items: center;
  margin-top: 40px;
`;
const AvatarWrapper = styled.View`
  width: 130px;
  height: 130px;
  border-radius: 3000px;
  overflow: hidden;
  align-items: center;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

const AvatarImage = styled.Image`
  width: 130px;
  height: 130px;
`;
// Header end.

const ProfileUpdateHeader = ({ onAvatarEditClick, selectedPhoto, avatar }) => {
  return (
    <Header>
      <AvatarWrapper>
        {selectedPhoto ? (
          <AvatarImage
            source={{
              uri: selectedPhoto,
            }}
          />
        ) : avatar ? (
          <AvatarImage
            source={{
              uri: avatar,
            }}
          />
        ) : (
          <Ionicons name="person-outline" size={80} />
        )}
      </AvatarWrapper>
      <TouchableOpacity
        style={{
          marginTop: 10,
        }}
        onPress={onAvatarEditClick}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: colors.blue,
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
    </Header>
  );
};

export default ProfileUpdateHeader;
