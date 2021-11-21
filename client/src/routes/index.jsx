import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";

import Header from "../components/Header";
import Home from "../screens/Home";
import React from "react";
import SideBar from "../components/SideBar";

function Routes() {
  return (
    <Router>
      <Header />
      <SideBar />
      <Switch>
        <Route path={"/"} element={<Home />}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
