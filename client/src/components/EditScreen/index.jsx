import "./styles.css";

import React, {useEffect, useRef, useState} from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import  {ProgressBar}from "primereact/progressbar";
import { ProgressSpinner } from 'primereact/progressspinner';
import {Toast} from "primereact/toast";
import { useLocation } from "react-router-dom";
import useUploadMovieFile from "../../hooks/uploadMovieFile";

function EditScreen() {
  const { state } = useLocation();
  const { data } = state;

  const [progress,setProgress] = useState(0);
  const [processing,setProcessing] = useState(0);
  const [uploading,setUploading] = useState(0);

  const toastRef = useRef(null);

  const { uploadMovieFile } = useUploadMovieFile();

  const onProgress = (loaded)=>{
    if(loaded === 100){
      setProcessing(true);
      setUploading(false);
      return;
    }
    setProgress(loaded);
  };

  const uploader = ({files})=>{
    setUploading(true);

    const [file] = files;

    uploadMovieFile(file, data.id, onProgress,(err,data)=>{
      setProgress(0);
      setUploading(false);
      setProcessing(false);
      if(err){
        return toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Cannot Upload File",
          life: 3000,
        });
      }
    });
  };
  
  return (
    <div className="edit">
      <Toast ref={toastRef}/>
      <h1 className="title">Edit Movie</h1>
      <div className="info-grid">
        <div className="poster">
          <img
            src={`https://www.themoviedb.org/t/p/original${data.poster}`}
            alt="Poster"
            className="poster"
          ></img>
        </div>
        <div>
          <form className="edit-form-grid">
            <InputText className="edit-input" placeholder="Title" />
            <InputText className="edit-input" placeholder="Tagline" />
            <InputTextarea
              placeholder="Description"
              className="text-area"
              autoResize
            />
            <InputText className="edit-input" placeholder="Language" />
            <InputText className="edit-input" placeholder="Studio" />
            <InputText
              className="edit-input"
              placeholder="Trailer ID (dQw4w9WgXcQ)"
            />
            <InputText
              className="edit-input"
              placeholder="TMDB Poster Path (/example.jpg)"
            />
            <InputText className="edit-input" placeholder="Rating" />
            <Dropdown
              className="edit-input"
              placeholder="Age Rating"
              options={[
                {
                  label: "Adult",
                  value: true,
                },
                {
                  label: "Family Friendly",
                  value: false,
                },
              ]}
            />
            <InputText className="edit-input" placeholder="Release Date" />
            <InputText className="edit-input" placeholder="Runtime" />
            <Button label="Save" className="save-btn" />
          </form>
        </div>
      </div>
      {/* File Upload Needs to be Shown Conditionally based on Data */}
      <div>
        <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
          <h1 className="title">{
            uploading || processing ? "Processing..." : "File upload"
          }</h1>
          {
            uploading ? (
              <ProgressBar value={progress} style={{
                margin: "20px"
              }}/>
            ) : null
          }
          {
            processing ? (
                <ProgressSpinner style={{
                  width: "50px",
                  height: "50px",
                  margin: "10px"
                }} strokeWidth="8"/>
            ) : null
          }
        </div>
        <div className="file-upload">
          <FileUpload
            accept="video/*"
            customUpload={true}
            uploadHandler={uploader}
          />
        </div>
      </div>
      <div>
        <h1 className="title">File Browser</h1>
        <DataTable>
          <Column header="Name" field="Name" />
          <Column header="Type" field="Type" />
          <Column header="Size" field="Size" />
          <Column header="Platform" field="Platform" />
          <Column header="Length" field="Length" />
          <Column header="Delete" field="Delete" />
        </DataTable>
      </div>
    </div>
  );
}

export default EditScreen;
