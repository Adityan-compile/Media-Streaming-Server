import "./styles.css";

import React, { useContext, useRef, useState } from "react";

import { Button } from "primereact/button";
import Context from "../../store";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";
import emitter from "../../store/services/emitter";
import { isEmpty } from '../../utils';
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
      value: "2056x?",
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


  const setupHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      password,
      tmdbKey,
      serverName,
      videoQuality,
      audioQuality,
    };

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
        if(res.status==="partial"){
          toastRef.current.show({
            severity: "warn",
            summary: "Partially Completed",
            detail: "The User has been created but you might need to edit the API Keys and Upload Quality Settings after Login",
            life: 3000,
          });
          setTimeout(() => {
            emitter.emit('setup');
            navigate("/login")
          }, 3000);
        }else{
          toastRef.current.show({
            severity: "success",
            summary: "Success",
            detail: "Server Setup Complete, You Can Now Login",
            life: 3000,
          });
          setTimeout(() =>{
            emitter.emit('setup');
            navigate("/login")
          } , 3000);
        }
      })
      .catch((e) =>{
        console.error(e);
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error Setting up Server, Try Again Later",
          life: 3000,
        })
      }
      );
  };

  return (
    <div className="setup-screen">
      <div className="setup-container">
        <Toast ref={toastRef} />
        <h1 className="heading">Streamflix Setup</h1>
        <form className="form-grid">
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
          <span className="form-control">
            <Button
              label="Complete Setup"
              className="form-control"
              onClick={(e) => setupHandler(e)}
            />
          </span>
        </form>
        <div className="footer">
        Photo by{" "}
          <a
            className="link"
            href="https://unsplash.com/@jeremyyappy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Jeremy Yap
          </a>{" "}
          on{" "}
          <a
            className="link"
            href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </div> 
  
      </div>
    </div>
  );
}

export default SetupScreen;
