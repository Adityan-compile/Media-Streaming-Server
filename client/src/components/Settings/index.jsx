import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { SelectButton } from 'primereact/selectbutton';
import styles from "./styles.module.css";

function Settings() {

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


  return (
    <div>
      <h3 className="heading">Settings</h3>
      <form className="form-grid m-20">
        <span className="p-float-label form-control">
          <InputText
            id="api-key"
            type="password"
            className="input"

          />
          <label htmlFor="api-key">TMDB API Key</label>
        </span>
        <span className="p-float-label form-control">
          <InputText
            id="server-name"
            className="input"

          />
          <label htmlFor="server-name">Server Name</label>
        </span>
        <span>
          <label className="form-control" htmlFor="transcoder">
            Transcoder
          </label>
          <SelectButton
            id="transcoder"

            options={[{
              name: "off",
              value: false
            }, {
              name: "on",
              value: true
            }]}
            optionLabel="name"
            className="form-control"
          />
        </span>
        <span>
          <label className="form-control" htmlFor="video-quality">
            Upload Quality
          </label>
          <SelectButton
            id="video-quality"
            options={videoQualityList}
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
            options={audioQualityList}
            optionLabel="name"
            className="form-control"
          />
        </span>
        <span className="form-control">
          <Button
            label="Complete Setup"
            className="form-control"
          />
        </span>
      </form>
    </div>
  );
}

export default Settings;
