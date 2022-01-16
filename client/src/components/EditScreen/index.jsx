import "./styles.css";

import React, {useRef} from "react";
import { useLocation, useState } from "react-router-dom";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {Toast} from "primereact/toast";
import useUploadMovieFile from "../../hooks/uploadMovieFile";

function EditScreen() {
  const { state } = useLocation();
  const { data } = state;

  const toastRef = useRef(null);

  const { uploadMovieFile } = useUploadMovieFile();

  const uploader = ({files})=>{
    
    const [file] = files;

    uploadMovieFile(file, data.id, (err,data)=>{
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
        <h1 className="title">File Upload</h1>
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
