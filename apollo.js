import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { API_SERVER_URL } from "@env";
import { SIGN_IN_TAB } from "./src/utils/constants";
import { createUploadLink } from "apollo-upload-client";

// Reactive variables.
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar();
export const authTabVar = makeVar(SIGN_IN_TAB);
export const createdAuth = makeVar();

// Links.
const uploadHttpLink = createUploadLink({
  uri: API_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error("GraphQL Error", graphQLErrors);
  }
  if (networkError) {
    console.error("Network Error", networkError);
  }
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLinks,
});

export default client;
