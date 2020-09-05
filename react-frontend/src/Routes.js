import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLoginPage from './components/login/MainLoginPage';
import MainChat from './components/chat/MainChat';

import { AuthContext } from "./common/Authentication";

import { SocketProvider, MemberProvider } from "./common/socketio";

const AuthRequiredRoute = ({ component: Component, connecToSocket, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={
        routeProps =>
          !!currentUser ?
            connecToSocket ? (
              <SocketProvider>
                <MemberProvider>
                  <Component {...routeProps} />
                </MemberProvider>
              </SocketProvider>
            ) :
              <Component {...routeProps} />
            : <Redirect to={"/login"} />
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <AuthRequiredRoute
        component={MainChat}
        exact
        connecToSocket={true}
        path="/"
      />
      <Route
        path="/login"
        exact
        component={MainLoginPage}
      />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
