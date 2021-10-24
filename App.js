import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar } from "./apollo";
import { NavigationContainer } from "@react-navigation/native";
import LoggedInNav from "./src/navigators/LoggedInNav";
import LoggedOutNav from "./src/navigators/LoggedOutNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    return Promise.all([...fontPromises]);
  };

  const onFinish = () => setLoading(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
