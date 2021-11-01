import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../utils/colors";

// Header.
const Container = styled.View`
  align-items: center;
  margin-top: 50px;
`;

const AvatarWrapper = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 300px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 75px;
`;

const Username = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-top: 12px;
  letter-spacing: 1.5px;
  text-transform: capitalize;
`;
const Email = styled.Text`
  font-size: 22px;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 1.5px;
`;

const EditButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  background-color: ${colors.primary};
  padding: 14px 26px;
  border-radius: 500px;
`;
const EditButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-right: 16px;
`;

const ProfileHeader = ({ user }) => {
  return (
    <Container>
      <AvatarWrapper>
        {user?.avatar ? (
          <Avatar source={user?.avatar} />
        ) : (
          <Ionicons name="person-outline" size={100} />
        )}
      </AvatarWrapper>

      <Username>{user?.username}</Username>
      <Email>{user?.email}</Email>
      <EditButtonWrapper>
        <EditButtonText>Edit Photo</EditButtonText>
        <Ionicons name="arrow-forward" color="white" size={20} />
      </EditButtonWrapper>
    </Container>
  );
};

export default ProfileHeader;
