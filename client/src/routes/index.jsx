import { AuthGuard, RouteGuard } from "./guards";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import AuthProvider from "../store/providers/authProvider";
import Context from "../store";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import React from "react";
import ViewShow from "../pages/ViewShow";

function Routes() {
  const [user, setUser] = useState({
    authenticated: false,
  });
  const contextMenu = useRef(null);

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
          contextMenu,
        }}
      >
        {user.authenticated && <Header />}
        <Switch>
          <Route
            path={"/login"}
            element={
              <AuthGuard user={user}>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path={"/"}
            element={
              <RouteGuard user={user}>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path={"/shows/view"}
            element={
              <RouteGuard user={user}>
                <ViewShow />
              </RouteGuard>
            }
          />
        </Switch>
      </Context.Provider>
    </Router>
  );
}

export default Routes;
