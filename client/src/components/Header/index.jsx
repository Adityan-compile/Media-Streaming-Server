import "./styles.css";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React from "react";

function Header() {
  return (
    // <div className="nav">
    //   <h3 className="brand">Streamflix</h3>
    // </div>
    <AppBar position="static"></AppBar>
  );
}

export default Header;
