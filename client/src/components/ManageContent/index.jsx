import "./styles.css";

import React, { useRef, useState } from "react";

import { Button } from "primereact/button";
import Card from "../Card";
import NewMovie from "../NewMovie";
import { Toast } from "primereact/toast";

function ManageContent() {
  const [movieModal, setMovieModal] = useState(false);
  const toastRef = useRef(null);
  const success = () => {
    setMovieModal(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Movie Created Successfully",
      life: 3000,
    });
  };
  const error = (e) => {
    setMovieModal(false);
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Movie Creation Error",
      life: 3000,
    });
  };
  return (
    <div className="manage">
      <Toast ref={toastRef} />
      <Button
        label="New Movie"
        icon="pi pi-plus-circle"
        className="btn"
        onClick={() => setMovieModal(true)}
      />
      <Button label="New Show" icon="pi pi-plus-circle" className="btn" />
      <NewMovie
        visible={movieModal}
        setVisible={setMovieModal}
        onSuccess={success}
        onError={error}
      />
      <div className="content">
        {Array.from(Array(10).keys()).map((el) => (
          <Card key={el} admin={true} />
        ))}
      </div>
    </div>
  );
}

export default ManageContent;
