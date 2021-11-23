import React from "react";
import styled from "styled-components/native";
import useAccount from "../../hooks/useAccount";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";

// const AccountItemContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   background-color: white;
//   border-radius: 6px;
//   margin-bottom: 10px;
//   padding: 10px 15px;
// `;

// const ItemColumn = styled.View`
//   justify-content: center;
// `;

// const ItemThumbnailWrapper = styled.View`
//   width: 50px;
//   justify-content: center;
//   align-items: flex-start;
//   margin-right: 10px;
// `;
// const ItemThumbnail = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 4px;
// `;

// const ItemRow = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;

// New
const AccountItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 5px 10px;
`;

const ThumbnailWrapper = styled.View`
  margin-right: 10px;
`;
const AccountThumbnail = styled.Image`
  width: 50px;
  height: 50px;
`;

const InfoContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InfoColumn = styled.View`
  flex: 0.75;
`;
const ActionColumn = styled.View`
  flex: 0.25;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;
const SubtitleText = styled.Text`
  color: ${colors.black};
  opacity: 0.5;
  margin-left: 8px;
  font-size: 14px;
  text-transform: capitalize;
`;

const AccountInfoWrapper = styled.View`
  margin-top: 5px;
`;
const AccountId = styled.Text``;
const AccountPassword = styled.Text`
  color: ${colors.black};
  opacity: 0.3;
`;

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

  const handleEditClick = () => {
    navigate("AccountCreateScreen", {
      account: {
        id,
        title,
        subtitle,
        accountName,
        accountPassword,
        thumbnail,
      },
    });
  };

  return (
    <AccountItemContainer>
      {/* Thumbnail */}
      <ThumbnailWrapper>
        {thumbnail ? (
          <AccountThumbnail source={{ uri: thumbnail }} />
        ) : (
          <Ionicons name="image-outline" size={40} />
        )}
      </ThumbnailWrapper>

      <InfoContainer>
        <InfoColumn>
          <TitleWrapper>
            <TitleText>{title}</TitleText>
            <SubtitleText>{subtitle}</SubtitleText>
          </TitleWrapper>

          <AccountInfoWrapper>
            <AccountId>{accountName}</AccountId>
            <AccountPassword>{accountPassword}</AccountPassword>
          </AccountInfoWrapper>
        </InfoColumn>

        <ActionColumn>
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
            onPress={handleEditClick}
          >
            <Ionicons name="pencil-outline" size={18} color="tomato" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteClick}>
            <Ionicons name="remove-circle-outline" size={26} color="tomato" />
          </TouchableOpacity>
        </ActionColumn>
      </InfoContainer>
    </AccountItemContainer>
    // <AccountItemContainer>
    //   {/* Info */}
    //   <ItemColumn style={{ flex: 1 }}>
    //     <ItemRow>
    //       <ItemThumbnailWrapper>
    //         {thumbnail ? (
    //           <ItemThumbnail
    //             source={{
    //               uri: thumbnail,
    //             }}
    //           />
    //         ) : (
    //           <Ionicons name="image-outline" size={40} />
    //         )}
    //       </ItemThumbnailWrapper>

    //       <ItemColumn>
    //         {/* Account info header */}
    //         <ItemRow style={{ paddingBottom: 4 }}>
    //           <AccountTitle>{title}</AccountTitle>
    //           <AccountSubtitle>{subtitle}</AccountSubtitle>
    //         </ItemRow>
    //         {/* Account info contents */}
    //         <AccountName>Account: {accountName}</AccountName>
    //         <AccountPassword>Password: {accountPassword}</AccountPassword>
    //       </ItemColumn>
    //     </ItemRow>
    //   </ItemColumn>

    //   {/* Actions */}
    //   <ItemColumn>
    //     <ItemRow>
    //       <TouchableOpacity
    //         style={{
    //           marginRight: 10,
    //         }}
    //         onPress={() =>
    //           navigate("AccountCreateScreen", {
    //             account: {
    //               id,
    //               title,
    //               subtitle,
    //               accountName,
    //               accountPassword,
    //               thumbnail,
    //             },
    //           })
    //         }
    //       >
    //         <Ionicons name="pencil-outline" size={18} color="tomato" />
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={onDeleteClick}>
    //         <Ionicons name="remove-circle-outline" size={26} color="tomato" />
    //       </TouchableOpacity>
    //     </ItemRow>
    //   </ItemColumn>
    // </AccountItemContainer>
  );
};

export default AccountItem;
