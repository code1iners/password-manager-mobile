import React from "react";
import styled from "styled-components/native";
import useAccount from "../../hooks/useAccount";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";

const AccountItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 10px 15px;
`;

const ItemColumn = styled.View`
  justify-content: center;
`;

const ItemThumbnailWrapper = styled.View`
  width: 50px;
  justify-content: center;
  align-items: flex-start;
  margin-right: 10px;
`;
const ItemThumbnail = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const AccountTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.5px;
`;
const AccountSubtitle = styled.Text`
  color: ${colors.black};
  opacity: 0.5;
  margin-left: 8px;
`;
const ItemRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
const AccountName = styled.Text``;
const AccountPassword = styled.Text``;

const AccountItem = ({
  id,
  title,
  subtitle,
  accountName,
  accountPassword,
  thumbnail,
}) => {
  const { navigate } = useNavigation();
  const { deleteAccount } = useAccount();
  /**
   * ### Delete account process.
   */
  const handleDeleteAccount = () => {
    deleteAccount({ id });
  };

  /**
   * ### Delete click event listener.
   */
  const onDeleteClick = () => {
    Alert.alert("Delete", "Delete account surely?", [
      {
        text: "OK",
        style: "destructive",
        onPress: handleDeleteAccount,
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return (
    <AccountItemContainer>
      {/* Info */}
      <ItemColumn style={{ flex: 1 }}>
        <ItemRow>
          <ItemThumbnailWrapper>
            {thumbnail ? (
              <ItemThumbnail
                source={{
                  uri: thumbnail,
                }}
              />
            ) : (
              <Ionicons name="image-outline" size={40} />
            )}
          </ItemThumbnailWrapper>

          <ItemColumn>
            {/* Account info header */}
            <ItemRow style={{ paddingBottom: 4 }}>
              <AccountTitle>{title}</AccountTitle>
              <AccountSubtitle>{subtitle}</AccountSubtitle>
            </ItemRow>
            {/* Account info contents */}
            <AccountName>Account: {accountName}</AccountName>
            <AccountPassword>Password: {accountPassword}</AccountPassword>
          </ItemColumn>
        </ItemRow>
      </ItemColumn>

      {/* Actions */}
      <ItemColumn>
        <ItemRow>
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
            onPress={() =>
              navigate("AccountCreateScreen", {
                account: {
                  id,
                  title,
                  subtitle,
                  accountName,
                  accountPassword,
                  thumbnail,
                },
              })
            }
          >
            <Ionicons name="pencil-outline" size={18} color="tomato" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteClick}>
            <Ionicons name="remove-circle-outline" size={26} color="tomato" />
          </TouchableOpacity>
        </ItemRow>
      </ItemColumn>
    </AccountItemContainer>
  );
};

export default AccountItem;
