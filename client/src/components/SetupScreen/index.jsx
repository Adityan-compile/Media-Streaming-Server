import "./styles.css";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from "react";
import { SelectButton } from 'primereact/selectbutton';

function SetupScreen() {
    const uploadQuality = [
        {
            name: "720p",
            value: "1280x?"
        },
        {
            name: "1080p",
            value: "1920x?"
        }
    ];
  return (
    <div className="setup-screen">
        <div className="setup-container">
            <h1 className="heading">Streamflix Setup</h1>
            <div className="form-grid">
                     <span className="p-float-label form-control">
                         <InputText id="name" className="input" />
                         <label htmlFor="name">Username</label>
                     </span>
                     <span className="p-float-label form-control">
                         <InputText id="password" type="password" className="input" />
                         <label htmlFor="password">Password</label>
                     </span>
                     <span className="p-float-label form-control">
                         <InputText id="api-key" type="password" className="input" />
                         <label htmlFor="api-key">TMDB API Key</label>
                     </span>
                     <span className="p-float-label form-control">
                         <InputText id="server-name" className="input" />
                         <label htmlFor="server-name">Server Name</label>
                     </span>
                     <SelectButton options={uploadQuality} optionLabel="name" className="form-control" />
            </div>
        </div>
    </div>
  );
}

export default SetupScreen;
