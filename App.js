import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedOutNav from "./src/navigators/LoggedOutNav";
import LoggedInNav from "./src/navigators/LoggedInNav";
import { TOKEN } from "./src/utils/constants";
import useMe from "./src/hooks/useMe";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    return Promise.all([...fontPromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);

    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }

    return preloadAssets();
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
