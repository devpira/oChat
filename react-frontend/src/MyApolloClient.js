import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";

import { FirebaseAuth } from './common/Authentication';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  let token = null;
  await FirebaseAuth.auth().currentUser.getIdToken(true).then((idToken) => {
    console.log("ID TOKEN: " + idToken)
    token = idToken;
  }).catch((error) => {
    console.log("ERROR FROM getid token: " + error)
  });

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, exten ${extensions.code}`
      )
      if (extensions.code === 'UNAUTHENTICATED') {
        FirebaseAuth.auth().signOut();
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
