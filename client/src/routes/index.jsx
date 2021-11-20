import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";

import Header from "../components/Header";
import React from "react";

function Routes() {
  return (
    <Router>
      <Header />
      <Switch></Switch>
    </Router>
  );
}

export default Routes;
