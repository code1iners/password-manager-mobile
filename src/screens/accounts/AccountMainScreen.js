import React, { useEffect } from "react";
import styled from "styled-components/native";
import Fab from "../../components/shared/Fab";
import AccountList from "../../components/accounts/AccountList";

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const AccountMainScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Accounts",
    });
  }, []);

  const handleFabClick = () => {
    navigation.navigate("AccountCreateScreen");
  };

  return (
    <Container>
      <AccountList />

      <Fab onPress={handleFabClick} />
    </Container>
  );
};

export default AccountMainScreen;
