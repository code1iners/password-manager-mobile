import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { API_SERVER_URL } from "@env";
import { SIGN_IN_TAB } from "./src/constants";

// Reactive variables.
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar();
export const authTabVar = makeVar(SIGN_IN_TAB);
export const createdAuth = makeVar();

const client = new ApolloClient({
  uri: String(API_SERVER_URL),
  cache: new InMemoryCache(),
});

export default client;
