import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { API_SERVER_URL } from "@env";

// Reactive variables.

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: API_SERVER_URL,
  cache: new InMemoryCache(),
});

export default client;
