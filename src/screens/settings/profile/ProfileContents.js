import React from "react";
import styled from "styled-components/native";
import { View, Text, FlatList, Alert } from "react-native";
import { userSignOut } from "../../../hooks/useAuth";
import colors from "../../../utils/colors";
import { gql, useMutation } from "@apollo/client";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser {
    deleteUser {
      ok
      error
    }
  }
`;

const Container = styled.ScrollView``;

const ContentRow = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 16px;
  background-color: ${colors.white};
  border-radius: 10px;
`;

const ContentText = styled.Text`
  font-size: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const ProfileContents = () => {
  // Mutations start.

  const [deleteUserMutation, { loading: deleteUserLoading }] =
    useMutation(DELETE_USER_MUTATION);

  // Mutations end.

  // Methods start.

  /**
   * ### When clicked sign out row.
   * - userSignOut
   */
  const onClickSignOut = () => {
    Alert.alert("Sign Out", "Are you sure Sign out?", [
      {
        text: "OK",
        onPress: userSignOut,
        style: "destructive",
      },
      {
        text: "Cancel",
      },
    ]);
  };

  /**
   * ### Cache clear.
   */
  const updateDeleteUser = (cache, result) => {
    cache.modify({
      id: "ROOT_QUERY",
      fields: {
        accounts() {
          return [];
        },
      },
    });
  };

  /**
   * ### Delete my account.
   */
  const deleteAccount = async () => {
    if (!deleteUserLoading) {
      const { data: deleteUser } = await deleteUserMutation({
        update: updateDeleteUser,
      });
      const {
        deleteUser: { ok, error },
      } = deleteUser;

      if (ok) {
        userSignOut();
      } else {
        switch (error) {
          case "Please sign in to perform this action.":
            userSignOut();
            break;
        }
      }
    }
  };

  /**
   * ### Delete my account handler.
   */
  const onClickDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure Delete account? deleted accounts are irreversible.",
      [
        {
          text: "OK",
          onPress: deleteAccount,
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  // Methods end.
  return (
    <Container>
      {/* Sign out */}
      <ContentRow onPress={onClickSignOut}>
        <ContentText>Sign out</ContentText>
      </ContentRow>

      {/* Delete Account */}
      <ContentRow onPress={onClickDeleteAccount}>
        <ContentText
          style={{
            color: "tomato",
          }}
        >
          Delete account
        </ContentText>
      </ContentRow>
    </Container>
  );
};

export default ProfileContents;
