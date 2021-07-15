import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {TOKEN_KEY} from "../constants";

export const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});