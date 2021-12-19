import "./styles.css";

import React, { useCallback, useContext, useRef, useState } from "react";

import { Button } from "primereact/button";
import Context from "../../store";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

function SetupScreen() {
  const [name, setName] = useState("");
  const [tmdbKey, setTmdbKey] = useState("");
  const [password, setPassword] = useState("");
  const [videoQuality, setVideoQuality] = useState(null);
  const [audioQuality, setAudioQuality] = useState(null);
  const [serverName, setServerName] = useState("Streamflix");

  const { serverSetup } = useContext(Context);

  const navigate = useNavigate();

  const toastRef = useRef(null);

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

  const isEmpty = (val) => {
    return !val || val.length === 0;
  };

  const setupHandler = useCallback(() => {
    const formData = {
      name,
      password,
      tmdbKey,
      serverName,
      videoQuality,
      audioQuality,
    };
    console.table(formData);

    if (
      isEmpty(name) ||
      isEmpty(password) ||
      isEmpty(tmdbKey) ||
      isEmpty(serverName) ||
      isEmpty(videoQuality) ||
      isEmpty(audioQuality)
    ) {
      return toastRef.current.show({
        severity: "warn",
        summary: "Required",
        detail: "All Form Fields Are Required",
        life: 3000,
      });
    }

    serverSetup(formData)
      .then((res) => {
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Server Setup Conplete",
          life: 3000,
        });
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((e) =>
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error Setting up Server, Try Again Later",
          life: 3000,
        })
      );
  });

  return (
    <div className="setup-screen">
      <div className="setup-container">
        <Toast ref={toastRef} />
        <h1 className="heading">Streamflix Setup</h1>
        <div className="form-grid">
          <span className="p-float-label form-control">
            <InputText
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </span>
          <span className="p-float-label form-control">
            <InputText
              id="api-key"
              type="password"
              className="input"
              value={tmdbKey}
              onChange={(e) => setTmdbKey(e.target.value)}
            />
            <label htmlFor="api-key">TMDB API Key</label>
          </span>
          <span className="p-float-label form-control">
            <InputText
              id="server-name"
              className="input"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
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
          <span>
            <Button
              label="Complete Setup"
              className="form-control"
              onClick={() => setupHandler()}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;
