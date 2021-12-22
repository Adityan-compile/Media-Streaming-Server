import "./styles.css";

import { InputText } from "primereact/inputtext";
import React from "react";

function Settings() {
  return (
    <div>
      <h3 className="heading">Settings</h3>
      <div className="section">
        <span className="p-float-label">
          <label htmlFor="api-key">TMDB Key</label>
          <InputText id="api-key" />
        </span>
        <span className="p-float-label">
          <label htmlFor="api-key">TMDB Key</label>
          <InputText id="api-key" />
        </span>
        <span className="p-float-label">
          <label htmlFor="api-key">TMDB Key</label>
          <InputText id="api-key" />
        </span>
        <span className="p-float-label">
          <label htmlFor="api-key">TMDB Key</label>
          <InputText id="api-key" />
        </span> 
      </div>
    </div>
  );
}

export default Settings;
