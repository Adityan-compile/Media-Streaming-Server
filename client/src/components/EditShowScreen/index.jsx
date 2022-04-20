import { useEffect, useRef, useState } from "react";
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
import SeasonTab from "../SeasonTab";
import axios from "axios";
import styles from "./styles.module.css";
import useEditShow from "../../hooks/editShow";
import useToast from "../../hooks/toast";
import useUploadShowFile from "../../hooks/uploadShowFile";

function EditShowScreen() {
    const { state } = useLocation();
    const { data } = state;
    const navigate = useNavigate();
    const toastRef = useToast();

    const onDelete = () => {
        toastRef.current.show({
            severity: "success",
            summary: "Show Deleted",
            life: 3000,
        });
        setTimeout(() => navigate('/dashboard'), 3000);
    };

    const onError = (err) => {
        toastRef.current.show({
            severity: "error",
            summary: "Error",
            detail: "Cannot Delete Show",
            life: 3000,
        });
    };

    const ShowService = useEditShow(data, onDelete, onError);

    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [processing, setProcessing] = useState(0);
    const [uploading, setUploading] = useState(0);

    const request = axios.CancelToken.source();
    // useEffect(() => {
    // let filesTemp = [
    //     {
    //         name: data.trailer,
    //         type: "Trailer",
    //         platform: "Youtube",
    //     },
    // ];
    // if (data.file.length > 0) {
    //     filesTemp.push({
    //         name: data.file,
    //         type: "File",
    //         platform: "Local",
    //     });
    // }
    // setFiles(filesTemp);
    // }, []);

    const { uploadShowFile } = useUploadShowFile();

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
        uploadShowFile(file, data.id, onProgress, request.token, (err, res) => {
            filesTemp.push({
                name: res.Show.file,
                type: "File",
                platform: "Local",
            });
            setFiles(filesTemp);
            ShowService.methods.setFile(res.Show.file);
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
            <h1 className={styles.title}>Edit Show</h1>
            <div className={styles.infoGrid}>
                <div className="poster">
                    <img
                        src={`https://www.themoviedb.org/t/p/original${ShowService.state.poster}`}
                        alt="Poster"
                        className="poster"
                    ></img>
                </div>
                <div>
                    <Button label="Delete Show" icon="pi pi-trash" style={{
                        marginLeft: "10px"
                    }}
                        onClick={e => {
                            e.preventDefault();
                            ShowService.methods.deleteShow();
                        }} />
                    <form className={styles.editFormGrid}>
                        <InputText
                            className={styles.editInput}
                            placeholder="Title"
                            defaultValue={ShowService.state.title}
                        />
                        <InputText
                            className={styles.editInput}
                            placeholder="Tagline"
                            defaultValue={ShowService.state.tagline}
                        />
                        <InputTextarea
                            placeholder="Description"
                            className={styles.textArea}
                            defaultValue={ShowService.state.description}
                            autoResize
                        />
                        <InputText
                            className={styles.editInput}
                            defaultValue={ShowService.state.language}
                            placeholder="Language"
                        />
                        <InputText
                            className={styles.editInput}
                            defaultValue={ShowService.state.studio}
                            placeholder="Studio"
                        />
                        <InputText
                            className={styles.editInput}
                            placeholder="Trailer ID (dQw4w9WgXcQ)"
                            defaultValue={ShowService.state.trailer}
                        />
                        <InputText
                            className={styles.editInput}
                            placeholder="TMDB Poster Path (/example.jpg)"
                            defaultValue={ShowService.state.poster}
                            onChange={e=>ShowService.methods.setPoster(e.target.value)}
                        />
                        <InputText
                            className={styles.editInput}
                            placeholder="Rating"
                            defaultValue={ShowService.state.rating}
                        />
                        <Dropdown
                            className={styles.editInput}
                            placeholder="Age Rating"
                            defaultValue={ShowService.state.adult}
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
                        <InputText
                            className={styles.editInput}
                            defaultValue={ShowService.state.releaseDate}
                            placeholder="Release Date"
                        />
                        <InputText
                            className={styles.editInput}
                            defaultValue={ShowService.state.runtime}
                            placeholder="Runtime"
                        />
                        <Button label="Save" className={styles.saveBtn} />
                    </form>
                </div>
            </div>
            {/* {ShowService.state.file.length === 0 && (
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
            )} */}
            {/* <div>
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
            </div> */}
            <div className="seasons">
                <h2 className="title m-20">Seasons</h2>
                <SeasonTab data={{ seasons: ShowService.state.seasons }} />
            </div>
        </div>
    );
}

export default EditShowScreen