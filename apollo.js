import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { API_SERVER_URL } from "@env";
import { SIGN_IN_TAB } from "./src/utils/constants";
import { createUploadLink } from "apollo-upload-client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { relayStylePagination } from "@apollo/client/utilities";

// Reactive variables.
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar();
export const authTabVar = makeVar(SIGN_IN_TAB);
export const createdAuth = makeVar();
export const wasAccountCreatedVar = makeVar(false);
export const isShownAccountsFabVar = makeVar(true);

// Links.
const uploadHttpLink = createUploadLink({
  uri: API_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: tokenVar(),
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

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accounts: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: httpLinks,
  cache,
});

export default client;
