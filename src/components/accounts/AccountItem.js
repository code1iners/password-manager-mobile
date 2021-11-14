import React from "react";
import styled from "styled-components/native";
import useAccount from "../../hooks/useAccount";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { cache } from "../../../apollo";

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
  flex: 0.25;
  justify-content: center;
  align-items: flex-start;
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
          <TouchableOpacity onPress={onDeleteClick}>
            <Ionicons name="remove-circle-outline" size={26} color="tomato" />
          </TouchableOpacity>
        </ItemRow>
      </ItemColumn>
    </AccountItemContainer>
  );
};

export default AccountItem;
