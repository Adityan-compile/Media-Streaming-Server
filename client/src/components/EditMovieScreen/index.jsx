import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import styles from "./styles.module.css";
import useEditMovie from "../../hooks/editMovie";
import useToast from "../../hooks/toast";
import useUploadMovieFile from "../../hooks/uploadMovieFile";

function EditScreen() {
  const { state } = useLocation();
  const { data } = state;
  const navigate = useNavigate();
  const toastRef = useToast();

  const onDelete = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Movie Deleted",
      life: 3000,
    });
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  const onError = (err) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Cannot Delete Movie",
      life: 3000,
    });
  };

  const movieService = useEditMovie(data, onDelete, onError);

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [uploading, setUploading] = useState(0);

  const request = axios.CancelToken.source();
  useEffect(() => {
    let filesTemp = [
      {
        name: data.trailer,
        type: "Trailer",
        platform: "Youtube",
      },
    ];
    if (data.file.length > 0) {
      filesTemp.push({
        name: data.file,
        type: "File",
        platform: "Local",
      });
    }
    setFiles(filesTemp);
  }, []);

  const { uploadMovieFile } = useUploadMovieFile();

  const onProgress = (loaded) => {
    if (loaded === 100) {
      setProcessing(true);
      setUploading(false);
      return;
    }
    setProgress(loaded);
  };

  const uploader = ({ files }) => {
    setUploading(true);

    const [file] = files;
    let filesTemp = [
      {
        name: data.trailer,
        type: "Trailer",
        platform: "Youtube",
      },
    ];
    uploadMovieFile(file, data.id, onProgress, request.token, (err, res) => {
      filesTemp.push({
        name: res.movie.file,
        type: "File",
        platform: "Local",
      });
      setFiles(filesTemp);
      movieService.methods.setFile(res.movie.file);
      setProgress(0);
      setUploading(false);
      setProcessing(false);
      if (err) {
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
    <div className={styles.edit}>
      <h1 className={styles.title}>Edit Movie</h1>
      <div className={styles.infoGrid}>
        <div className="poster">
          <img
            src={`https://www.themoviedb.org/t/p/original${movieService.state.poster}`}
            alt="Poster"
            className="poster"
          ></img>
        </div>
        <div>
          <Button label="Delete Movie" icon="pi pi-trash" style={{
            marginLeft: "10px"
          }}
            onClick={e => {
              e.preventDefault();
              movieService.methods.deleteMovie();
            }} />
          <form className={styles.editFormGrid}>
            <InputText
              className={styles.editInput}
              placeholder="Title"
              value={movieService.state.title}
              onChange={e=>movieService.methods.setTitle(e.target.value)}
            />
            <InputText
              className={styles.editInput}
              placeholder="Tagline"
              value={movieService.state.tagline}
              onChange={e=>movieService.methods.setTagline(e.target.value)}
            />
            <InputTextarea
              placeholder="Description"
              className={styles.textArea}
              value={movieService.state.description}
              onChange={e=>movieService.methods.setDescription(e.target.value)}
              autoResize
            />
            <InputText
              className={styles.editInput}
              value={movieService.state.language}
              placeholder="Language"
              onChange={e=>movieService.methods.setLanguage(e.target.value)}
            />
            {/* <InputText
              className={styles.editInput}
              value={movieService.state.studio}
              onChange={e=>movieService.methods.setStudio(e.target.value)}
              placeholder="Studio"
            /> */}
            <InputText
              className={styles.editInput}
              placeholder="Trailer ID (dQw4w9WgXcQ)"
              value={movieService.state.trailer}
              onChange={e=>movieService.methods.setTrailer(e.target.value)}
            />
            <InputText
              className={styles.editInput}
              placeholder="TMDB Poster Path (/example.jpg)"
              value={movieService.state.poster}
              onChange={e=>movieService.methods.setPoster(e.target.value)}
            />
            <InputText
              className={styles.editInput}
              placeholder="Rating"
              value={movieService.state.rating}
              onChange={e=>movieService.methods.setRating(e.target.value)}
            />
            {/* <Dropdown
              className={styles.editInput}
              placeholder="Age Rating"
              value={movieService.state.adult}
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
              onChange={e=>console.log(e)}
            /> */}
            <InputText
              className={styles.editInput}
              value={movieService.state.releaseDate}
              placeholder="Release Date"
              onChange={e=>movieService.methods.setReleaseDate(e.target.value)}
            />
            <InputText
              className={styles.editInput}
              value={movieService.state.runtime}
              placeholder="Runtime"
              onChange={e=>movieService.methods.setRuntime(e.target.value)}
            />
            <Button label="Save" className={styles.saveBtn} />
          </form>
        </div>
      </div>
      {movieService.state.file.length === 0 && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className={styles.title}>
              {uploading || processing ? "Processing..." : "File upload"}
            </h1>
            {uploading ? (
              <ProgressBar
                value={progress}
                style={{
                  margin: "20px",
                }}
              />
            ) : null}
            {processing ? (
              <ProgressSpinner
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "10px",
                }}
                strokeWidth="8"
              />
            ) : null}
          </div>
          <div className={styles.fileUpload}>
            <FileUpload
              accept="video/*"
              customUpload={true}
              uploadHandler={uploader}
              onClear={() => console.log("Clear Cancel")}
              onRemove={() => console.log("Cancel")}
            />
          </div>
        </div>
      )}
      <div>
        <h1 className={styles.title}>File Browser</h1>
        <DataTable value={files}>
          <Column header="Name" field="name" />
          <Column header="Type" field="type" />
          <Column header="Platform" field="platform" />
          <Column
            header="Delete"
            field="delete"
            body={(row) => (
              <Button label="Delete" className="p-button-danger" />
            )}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default EditScreen;
