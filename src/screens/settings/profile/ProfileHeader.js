import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../utils/colors";
import { Text, TouchableOpacity } from "react-native";

// Header.
const Container = styled.View`
  flex-direction: row;
  align-items: center;

  background-color: ${colors.white};
  border-radius: 10px;
  padding: 10px;
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const AvatarWrapper = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 3000px;
  margin-bottom: 6px;
  overflow: hidden;
  border: 1px solid ${colors.black};
  padding: 6px;
`;

// Info start.

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 14px;
  justify-content: space-around;
`;

const AvatarImage = styled.Image`
  width: 80px;
  height: 80px;
`;

const Username = styled.Text`
  font-size: 22px;
  letter-spacing: 1.5px;
  font-weight: 600;
`;

const Email = styled.Text`
  font-size: 20px;
  letter-spacing: 1.5px;
  font-weight: 300;
  opacity: 0.8;
`;

// Info end.

const ProfileHeader = ({ username, email, avatar }) => {
  return (
    <Container>
      <AvatarContainer>
        <AvatarWrapper>
          {avatar ? (
            <AvatarImage source={{ uri: avatar }} />
          ) : (
            <Ionicons name="person-outline" size={50} />
          )}
        </AvatarWrapper>
      </AvatarContainer>
      <InfoContainer>
        {/* Username */}
        <Username>{username}</Username>

        {/* Email */}
        <Email style={{ marginTop: 6 }}>{email}</Email>
      </InfoContainer>
    </Container>
  );
};

export default ProfileHeader;
