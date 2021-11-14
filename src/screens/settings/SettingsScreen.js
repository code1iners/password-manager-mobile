import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { ItemSeparatorComponent } from "../../components/shared/ItemSeparatorComponent";

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const Row = styled.TouchableOpacity`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
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

  // Menus.
  const menus = [
    {
      id: "1",
      menuName: "Profile",
      onPress: handleProfileClick,
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
