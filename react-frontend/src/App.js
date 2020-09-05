import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import './assets/scss/index.scss';
import Routes from './Routes';

import { AuthProvider } from "./common/Authentication"
import { ApolloProvider } from '@apollo/react-hooks'
import client from './MyApolloClient';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Routes />
        </Router>
      </ApolloProvider>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
