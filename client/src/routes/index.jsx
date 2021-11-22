import { AuthGuard, RouteGuard } from "./guards";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";

import AuthProvider from "../store/providers/authProvider";
import Context from "../store";
import Header from "../components/Header";
import Home from "../screens/Home";
import Login from "../screens/Login";
import React from "react";

function Routes() {
  const [user, setUser] = useState({
    authenticated: false,
  });

  useEffect(() => {
    AuthProvider.getAuthStatus().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <Router>
      <Context.Provider
        value={{
          ...AuthProvider,
        }}
      >
        {user.authenticated && <Header />}
        <Switch>
          {"Login Route"}
          <Route
            path={"/login"}
            element={
              <AuthGuard user={user}>
                <Login />
              </AuthGuard>
            }
          />
          {"Private Routes"}
          <Route
            path={"/"}
            element={
              <RouteGuard user={user}>
                <Home />
              </RouteGuard>
            }
          />
        </Switch>
      </Context.Provider>
    </Router>
  );
}

export default Routes;
