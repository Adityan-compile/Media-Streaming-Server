import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import React from "react";
import Routes from "./routes";

function App() {
  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
