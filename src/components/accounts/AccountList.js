import React, { useState } from "react";
import styled from "styled-components/native";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import AccountItem from "./AccountItem";

const Container = styled.View``;

const GET_ACCOUNT_QUERY = gql`
  query accounts($offset: Int!) {
    accounts(offset: $offset) {
      id
      title
      subtitle
      accountName
      accountPassword
    }
  }
`;

const AccountList = () => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_ACCOUNT_QUERY, {
    variables: { offset: 0 },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <FlatList
      onEndReachedThreshold={0.02}
      onEndReached={() =>
        fetchMore({
          variables: {
            offset: data?.accounts?.length,
          },
        })
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data?.accounts}
      renderItem={({ item }) => <AccountItem {...item} />}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AccountList;
