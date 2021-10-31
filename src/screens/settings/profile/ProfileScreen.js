import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../../../hooks/useMe";
import colors from "../../../utils/colors";
import ProfileHeader from "./ProfileHeader";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

// Body.
const BodyContainer = styled.ScrollView``;

const ProfileScreen = ({ navigation }) => {
  const me = useMe();
  console.log(me);

  useEffect(() => {
    navigation.setOptions({
      title: me?.username,
    });
  }, []);

  return (
    <Container>
      {/* Header */}
      <ProfileHeader user={me} />

      {/* Body */}
      <BodyContainer></BodyContainer>
    </Container>
  );
};

export default ProfileScreen;
