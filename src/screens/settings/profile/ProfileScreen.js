import React, { useEffect } from "react";
import styled from "styled-components/native";
import useMe from "../../../hooks/useMe";
import colors from "../../../utils/colors";
import ProfileHeader from "./ProfileHeader";
import { TouchableOpacity } from "react-native";
import ProfileContents from "./ProfileContents";

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const HeaderRightButtonText = styled.Text`
  color: ${colors.blue};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 10px;
`;

const ProfileScreen = ({ navigation }) => {
  const me = useMe();

  const handleHeaderRightClick = () => {};
  useEffect(() => {
    navigation.setOptions({
      title: me?.username,
      headerRight: () => (
        <TouchableOpacity onPress={handleHeaderRightClick}>
          <HeaderRightButtonText>Edit</HeaderRightButtonText>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Container>
      {/* Header */}
      <ProfileHeader
        username={me?.username}
        email={me?.email}
        avatar={me?.avatar}
      />

      {/* Body */}
      <ProfileContents />
    </Container>
  );
};

export default ProfileScreen;
