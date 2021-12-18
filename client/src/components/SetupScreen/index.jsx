import "./styles.css";

import React, { useCallback, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";

function SetupScreen() {
    const [name, setName] = useState();
    const [tmdbKey, setTmdbKey] = useState();
    const [password, setPassword] = useState();
    const [videoQuality, setVideoQuality] = useState(null);
    const [audioQuality, setAudioQuality] = useState(null);
    const [serverName, setServerName] = useState("Streamflix");

  const videoQualityList = [
    {
      name: "720p",
      value: "1280x?",
    },
    {
      name: "1080p",
      value: "1920x?",
    },
    {
      name: "2k",
      value: "2560x?",
    },
  ];

  const audioQualityList = [
    {
      name: "128k",
      value: "128k",
    },
    {
      name: "256k",
      value: "256k",
    },
    {
      name: "328k",
      value: "328k",
    },
  ];

  const setupHandler = useCallback(()=>{
      const form = {
        name,
        password,
        tmdbKey,
        serverName,
        videoQuality,
        audioQuality
      };
  });

  return (
    <div className="setup-screen">
      <div className="setup-container">
        <h1 className="heading">Streamflix Setup</h1>
        <div className="form-grid">
          <span className="p-float-label form-control">
            <InputText
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.value)}
            />
            <label htmlFor="name">Username</label>
          </span>
          <span className="p-float-label p-input-icon-left form-control">
            <i className="pi pi-lock"></i>
            <InputText
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.value)}
            />
            <label htmlFor="password">Password</label>
          </span>
          <span className="p-float-label form-control">
            <InputText
              id="api-key"
              type="password"
              className="input"
              value={tmdbKey}
              onChange={(e) => setTmdbKey(e.value)}
            />
            <label htmlFor="api-key">TMDB API Key</label>
          </span>
          <span className="p-float-label form-control">
            <InputText
              id="server-name"
              className="input"
              value={serverName}
              onChange={(e) => setServerName(e.value)}
            />
            <label htmlFor="server-name">Server Name</label>
          </span>
          <span>
            <label className="form-control" htmlFor="video-quality">
              Upload Quality
            </label>
            <SelectButton
              id="video-quality"
              value={videoQuality}
              options={videoQualityList}
              onChange={(e) => setVideoQuality(e.value)}
              optionLabel="name"
              className="form-control"
            />
          </span>
          <span>
            <label className="form-control" htmlFor="audio-quality">
              Audio Quality
            </label>
            <SelectButton
              id="audio-quality"
              value={audioQuality}
              options={audioQualityList}
              onChange={(e) => setAudioQuality(e.value)}
              optionLabel="name"
              className="form-control"
            />
          </span>
            <span><Button label="Complete Setup" className="form-control" onClick={()=>setupHandler()} /></span>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;
