import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { API_SERVER_URL } from "@env";

// Reactive variables.

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar();

const client = new ApolloClient({
  uri: String(API_SERVER_URL),
  cache: new InMemoryCache(),
});

export default client;
