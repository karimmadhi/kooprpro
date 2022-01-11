import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useContext, useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";
import { AuthContext } from "./AuthProvider";

let apolloClient: ApolloClient<any>;

const httpLink = createUploadLink({
  uri: process.env.API_URL,
});

const authLink = setContext((_, { headers }) => {
  if (typeof window === "undefined") {
    return {
      headers,
    };
  } else {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    //@ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    name: "koopr-pro",
    defaultOptions: {
      query: {
        fetchPolicy: "cache-first",
      },
      // watchQuery: {
      //   fetchPolicy: "cache-and-network",
      // },
    },
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
