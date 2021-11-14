import React, { useEffect } from "react";
import styled from "styled-components/native";
import ProfileHeader from "./ProfileHeader";
import ProfileContents from "./ProfileContents";
import HeaderRightTextButton from "../../../components/shared/HeaderRightTextButton";
import useMe from "../../../hooks/useMe";

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const ProfileScreen = ({ navigation }) => {
  const me = useMe();
  useEffect(() => {
    if (me) {
      navigation.setOptions({
        title: me?.username,
      });
    }
  }, [me]);

  const handleHeaderRightClick = () =>
    navigation.navigate("ProfileUpdateScreen");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightTextButton text="Edit" onPress={handleHeaderRightClick} />
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
