import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../../../hooks/useMe";
import colors from "../../../utils/colors";
import ProfileHeader from "./ProfileHeader";
import { Alert, Text } from "react-native";
import { userSignOut } from "../../../hooks/useAuth";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

// Body.
const BodyContainer = styled.ScrollView``;

const HeaderRightButton = styled.TouchableOpacity`
  margin-right: 10px;
`;
const HeaderRightButtonText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
`;

const ProfileScreen = ({ navigation }) => {
  const me = useMe();
  console.log(me);

  /**
   * ### When clicked sign out row.
   * - userSignOut
   */
  const handleSignOutOkClick = async () => {
    await userSignOut();
  };
  const handleHeaderRightClick = () => {
    Alert.alert("Sign Out", "Are you sure Sign out?", [
      {
        text: "OK",
        onPress: handleSignOutOkClick,
        style: "destructive",
      },
      {
        text: "Cancel",
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: me?.username,
      headerRight: () => (
        <HeaderRightButton onPress={handleHeaderRightClick}>
          <HeaderRightButtonText>Sign Out</HeaderRightButtonText>
        </HeaderRightButton>
      ),
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
