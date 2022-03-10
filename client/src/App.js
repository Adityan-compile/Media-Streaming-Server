import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import React, { useEffect, useRef } from "react";

import Routes from "./routes";
import { Toast } from "primereact/toast";
import emitter from "./store/services/emitter";

function App() {
  const toastRef = useRef(null);
  
  useEffect(()=>{
    emitter.on('show-toast', (config)=>{
      toastRef.current.show(config);
    });
  });

  return (
    <div className="app">
      <Toast ref={toastRef}/>
      <Routes />
    </div>
  );
}

export default App;
