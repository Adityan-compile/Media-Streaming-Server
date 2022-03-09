import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import React from "react";
import Routes from "./routes";
import { Toast } from "primereact/toast";
import useToast from "./hooks/toast";

function App() {
  const toastRef = useToast();
  return (
    <div className="app">
      <Toast ref={toastRef}/>
      <Routes />
    </div>
  );
}

export default App;
