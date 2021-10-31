import React from "react";
import styled from "styled-components/native";
import { View, Text, Alert, FlatList } from "react-native";
import { userSignOut } from "../../hooks/useAuth";
import { ItemSeparatorComponent } from "../../components/shared/ItemSeparatorComponent";

const Container = styled.View`
  flex: 1;
`;

const Row = styled.TouchableOpacity`
  background-color: white;
  padding: 20px;
`;

const RowText = styled.Text`
  font-size: 18px;
  letter-spacing: 1.5px;
`;

const RenderItem = ({ item: { menuName, onPress } }) => (
  <Row onPress={onPress}>
    <RowText>{menuName}</RowText>
  </Row>
);

const SettingsScreen = ({ navigation }) => {
  // Event handlers.
  /**
   * ### When Clicked profile row.
   */
  const handleProfileClick = () => {
    navigation.navigate("ProfileScreen");
  };

  /**
   * ### When clicked sign out row.
   * - userSignOut
   */
  const handleSignOutOkClick = async () => {
    await userSignOut();
  };
  // Sign out 2.
  const handleSignOutClick = () => {
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

  // Menus.
  const menus = [
    {
      id: "1",
      menuName: "Profile",
      onPress: handleProfileClick,
    },
    {
      id: "2",
      menuName: "Sign Out",
      onPress: handleSignOutClick,
    },
  ];
  const renderItem = ({ item }) => <RenderItem item={item} />;

  return (
    <Container>
      <FlatList
        data={menus}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </Container>
  );
};

export default SettingsScreen;
