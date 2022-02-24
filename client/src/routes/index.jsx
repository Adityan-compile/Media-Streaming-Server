import { AuthGuard, RouteGuard, SetupGuard } from "./guards";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";

import AuthProvider from "../store/providers/authProvider";
import Context from "../store";
import Dashboard from "../pages/Dashboard";
import EditShow from "../pages/EditShow";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MediaProvider from "../store/providers/mediaProvider";
import NotFoundError from "../pages/404";
import Player from "../pages/Player";
import React from "react";
import Search from "../pages/Search";
import Setup from "../pages/Setup";
import ViewMovie from "../pages/ViewMovie";
import emitter from "../store/services/emitter";
import Movies from "../pages/Movies";

function Routes() {
  const [user, setUser] = useState({
    authenticated: false,
  });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    AuthProvider.getAuthStatus().then((res) => {
      setUser(res);
      if (!res.authenticated) {
        AuthProvider.getUserCount()
          .then((res) => setUserCount(res))
          .catch((e) => setUserCount(0));
      }
    });
  }, []);

  emitter.on('login', () => {
    AuthProvider.getAuthStatus().then((res) => {
      setUser(res);
    });
  });

  emitter.on('logout', () => {
    setUser({
      authenticated: false
    })
  });

  emitter.on('setup', () => {
    AuthProvider.getUserCount()
      .then((res) => setUserCount(res))
      .catch((e) => setUserCount(0));
  });

  return (
    <Router>
      <Context.Provider
        value={{
          ...MediaProvider,
          ...AuthProvider,
          userCount,
          user,
        }}
      >
        {user.authenticated && <Header />}
        <Switch>
          <Route
            path={"/login"}
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path={"/setup"}
            element={
              <SetupGuard>
                <Setup />
              </SetupGuard>
            }
          />
          <Route
            path={"/"}
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path={"/movies/view"}
            element={
              <RouteGuard>
                <ViewMovie />
              </RouteGuard>
            }
          />
          <Route
            path={"/shows/edit"}
            element={
              <RouteGuard>
                <EditShow />
              </RouteGuard>
            }
          />
          <Route
            path={"/dashboard"}
            element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            }
          />
          <Route
            path={"/player"}
            element={
              <RouteGuard>
                <Player />
              </RouteGuard>
            }
          />
          <Route
            path={"/search"}
            element={
              <RouteGuard>
                <Search />
              </RouteGuard>
            }
          />
          <Route
            path={"/movies"}
            element={
              <RouteGuard>
                <Movies />
              </RouteGuard>
            }
          />
          <Route path={"*"} element={<NotFoundError />} />
        </Switch>
      </Context.Provider>
    </Router>
  );
}

export default Routes;
